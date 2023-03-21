import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { ExpandableComponent } from "../components/ExpandableComponent";
import { getFoodAdvice } from "../store/config";

import colours from "../constants/colours";

export default function AdviceScreen({ route, navigation }) {
  const [dbdata, setdbdata] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const [searchString, setSearchString] = useState(route.params.search);

  useEffect(() => {
    if (route.params?.search != "") {
      console.log("There is a search string " + searchString);
      setSearchString(route.params.search);
      setDisplayData(
        dbdata.filter((val, index) => {
          if (searchString == "") return true;
          if (
            val.category_name.toLowerCase().includes(searchString.toLowerCase())
          )
            return true;
          else return false;
        })
      );
    }
  }, [route.params]);

  useEffect(() => {
    getFoodAdvice()
      .then((newdata) => {
        setdbdata(
          newdata.map((val, index) => {
            return {
              isExpanded: false,
              category_name: val.id,
              subcategory: [
                { id: "Storage Life", val: val.storageLife },
                { id: "Temperature", val: val.temp },
                { id: "Tips", val: val.tips },
                { id: "Waste Tips", val: val.waste },
              ],
            };
          })
        );
        setDisplayData(dbdata);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setDisplayData(
      dbdata.filter((val, index) => {
        if (searchString == "") return true;
        if (
          val.category_name.toLowerCase().includes(searchString.toLowerCase())
        )
          return true;
        else return false;
      })
    );
  }, [searchString]);

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...displayData];
    array.map((value, placeindex) => {
      placeindex == index
        ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
        : (array[placeindex]["isExpanded"] = false);
    });
    setDisplayData(array);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        defaultValue={searchString}
        style={styles.input}
        onChangeText={(text) => setSearchString(text)}
        placeholder="Search"
      />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>ADVICE</Text>
        </View>
        <ScrollView>
          {displayData.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => updateLayout(key)}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    height: "5%",
    borderWidth: 1,
    borderColor: colours.grey,
    fontSize: 20,
    color: colours.grey,
    margin: 20,
    paddingLeft: 20,
  },
});
