import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colours from "../constants/colours";

const width = Dimensions.get("screen").width;

export const Card = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirenction: "row",
    justifyContent: "space-evenly",
    backgroundColor: colours.green,
    borderRadius: 10,
    width: width * 0.45,
    height: width * 0.4,
    //margin: "3%",
    padding: 10,
  },
});
