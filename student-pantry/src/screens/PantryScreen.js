import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CardView } from "../components/CardView";
import { AddToPantryModal } from "../components/AddToPantryModal";
import { useIsFocused } from "@react-navigation/native";

import { getNotWasted } from "../store/config";
import ShoppingList from "../components/ShoppingList";
import { SafeAreaView } from "react-native-safe-area-context";

const id = "test123";

export default function PantryScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [dbUpdate, setDBUpdate] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getNotWasted(id).then((d) => {
      setData(d);
    });
  }, [isFocused]);

  useEffect(() => {
    getNotWasted(id).then((d) => {
      setData(d);
      setDBUpdate(false);
    });
  }, [dbUpdate]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddToPantryModal setData={setData} />,
    });
  }, [navigation, setData]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 5 }}>
        <CardView data={data} setDBUpdate={setDBUpdate} />
      </View>
      <ShoppingList style={{ flex: 2, borderWidth: 2 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
