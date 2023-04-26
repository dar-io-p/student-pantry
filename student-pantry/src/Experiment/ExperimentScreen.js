import React from "react";

import { StyleSheet, View } from "react-native";

import ExperimentEnvironment_Cards from "./ExperimentEnvironment_Cards";
import ExperimentEnvironment_List from "./ExperimentEnvironment_List";

export default function (props) {
  return (
    <View style={styles.container}>
      <ExperimentEnvironment_List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  history: {
    marginVertical: 10,
    paddingVertical: 10,
    flex: 1,
    borderWidth: 1,
  },
  shopping: {
    marginVertical: 10,
    paddingVertical: 10,
    flex: 1,
    borderWidth: 1,
  },
});
