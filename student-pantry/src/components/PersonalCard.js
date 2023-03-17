import React, { useState } from "react";

import { Card } from "./Card";
import { View, Text, StyleSheet } from "react-native";
import colours from "../constants/colours";
import OptionMenu from "react-native-option-menu";
import { AntDesign } from "@expo/vector-icons";
import {
  updateShared,
  updateIsLow,
  updateWasted,
  removeProduct,
} from "../store/config";

const id = "test123";

/**Pass as props: 
id, isLow, isWasted, owner, purchaseDate, shared, useBy*/
export const PersonalCard = (props) => {
  //const [isLow, setIsLow] = useState(props.isLow);
  //const [shared, setShared] = useState(props.shared);

  const col = props.isLow && props.isLow ? colours.alertRed : colours.green;
  const fontCol = props.isLow && props.isLow ? colours.white : colours.black;

  //formatting of date strings
  const ub_date = new Date(props.useBy.seconds * 1000);
  const useby = ub_date.toLocaleDateString("en-uk");

  const pd_date = new Date(props.purchaseDate.seconds * 1000);
  const purchaseDate = pd_date.toLocaleDateString("en-uk");

  const options = [
    props.isLow ? "Mark High" : "Mark Low",
    props.shared ? "Remove from shared pantry?" : "Add to shared pantry",
    "Waste",
    "Delete",
    "Get info",
  ];

  const optionFuncs = [
    () => {
      //UPDATE IS LOW
      updateIsLow(id, props.id, !props.isLow).then(() =>
        props.setDBUpdate(true)
      );
    },
    () => {
      //UPDATE SHARED
      updateShared(id, props.id, !props.shared).then(() =>
        props.setDBUpdate(true)
      );
    },
    () => {
      //ADD IT TO WASTED
      updateWasted(id, props.id).then(() => props.setDBUpdate(true));
    },
    () => {
      removeProduct(id, props.id).then(() => props.setDBUpdate(true));
    },
    () => alert("info"),
  ];

  const buttonIcon = (
    <AntDesign name="exclamationcircle" size={28} color="black" />
  );
  return (
    <Card
      style={{ backgroundColor: col, flexDirection: "col", ...props.style }}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View
          style={{
            flex: 4,
            justifyContent: "space-around",
          }}
        >
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
              destructiveIndex={3}
              options={options}
              actions={optionFuncs}
            />
          </View>
          <View style={{ flex: 4 }} />
        </View>
      </View>
      {props.shared && (
        <View
          style={{
            borderWidth: 2,
            marginRight: "20%",
            marginLeft: "20%",
            borderColor: "orange",
          }}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  minorText: {
    fontSize: 15,
  },
});
