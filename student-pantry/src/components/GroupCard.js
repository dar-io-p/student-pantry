import React, { useState } from "react";

import { Card } from "./Card";
import { View, Text, StyleSheet } from "react-native";
import colours from "../constants/colours";
import OptionMenu from "react-native-option-menu";
import { AntDesign } from "@expo/vector-icons";

/**Pass as props: low: bool, item: string, bought: string, useby: string
/Like this: \<GroupCard owner="Bob" low={true} item="Onion" useby="xxxz">*/
//id, isLow, isWasted, owner, purchaseDate, shared, useBy
export const GroupCard = (props) => {
  //const [isLow, setIslow] = useState(false);
  const col = props.isLow && props.isLow ? colours.alertRed : colours.green;
  const fontCol = props.isLow && props.isLow ? colours.white : colours.black;

  const [options, optionFuncs] = getOptions(props.isLow);

  //formatting of date strings
  const ub_date = new Date(props.useBy.seconds * 1000);
  const useby = ub_date.toLocaleDateString("en-uk");

  const pd_date = new Date(props.purchaseDate.seconds * 1000);
  const purchaseDate = pd_date.toLocaleDateString("en-uk");

  const buttonIcon = (
    <AntDesign name="exclamationcircle" size={28} color="black" />
  );
  return (
    <Card
      style={{ backgroundColor: col, flexDirection: "row", ...props.style }}
    >
      <View style={{ flex: 4, justifyContent: "space-around" }}>
        <Text style={[styles.minorText, { color: fontCol }]}>
          {props.owner}
        </Text>
        <Text style={[styles.title, { color: fontCol }]}>{props.id}</Text>
        <Text style={[styles.minorText, { color: fontCol }]}>
          Bought: {purchaseDate}
        </Text>
        <Text style={[styles.minorText, { color: fontCol }]}>
          Use By: {useby}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          flex: 2,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            top: 15,
          }}
        >
          <OptionMenu
            customButton={buttonIcon}
            destructiveIndex={2}
            options={options}
            actions={optionFuncs}
          />
        </View>
        <View style={{ flex: 4 }} />
      </View>
    </Card>
  );
};

function getOptions(isLow) {
  const opt = isLow ? "Mark High" : "Mark Low";
  const options = [opt, "Add to shared pantry", "Waste", "Delete", "Get info"];
  const funcs = [
    () => alert("Marked"),
    () => alert("Shared"),
    () => alert("Wasted"),
    () => alert("Deleted"),
    () => alert("info"),
  ];
  return [options, funcs];
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  minorText: {
    fontSize: 15,
  },
});
