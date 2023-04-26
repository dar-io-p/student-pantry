import React from "react";
import { Card } from "../components/Card";
import { View, Text, StyleSheet } from "react-native";
import colours from "../constants/colours";
import OptionMenu from "react-native-option-menu";
import { AntDesign } from "@expo/vector-icons";

import { foodData } from "./ExperimentData";

//{id: "Cheese",isLow: true, shared: true, useBy: "2023 04 15", purchaseDate: "2023 07 03",}
export const ExperimentCard = (props) => {
  const col = props.isLow && props.isLow ? colours.alertRed : colours.green;
  const fontCol = props.isLow && props.isLow ? colours.white : colours.black;

  //formatting of date strings
  const ub_date = new Date(props.useBy);
  const useby = ub_date.toLocaleDateString("en-uk");

  const pd_date = new Date(props.purchaseDate);
  const purchaseDate = pd_date.toLocaleDateString("en-uk");

  const options = [
    props.isLow ? "Mark High" : "Mark Low",
    props.shared ? "Remove from shared pantry" : "Add to shared pantry",
    "Waste",
    "Delete",
    "Get info",
    "Cancel",
  ];
  const optionFuncs = [
    () => props.updateState("low-" + props.id),
    () => props.updateState("shared-" + props.id),
    () => props.updateState("waste-" + props.id),
    () => props.updateState("delete-" + props.id),
    () => props.updateState("info-" + props.id),
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
