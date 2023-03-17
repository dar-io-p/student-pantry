import React, { useState } from "react";

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

export default function (props) {
  const [numTextInputs, setNumTextInputs] = React.useState(0);
  return (
    <View style={props.style}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ padding: 2, fontSize: 20 }}>Shopping List</Text>
          <TouchableOpacity
            onPress={() => setNumTextInputs((val) => val + 1)}
            style={styles.centeredContainer}
          >
            <Text style={{ fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        </View>
        {[...Array(numTextInputs).keys()].map((key) => {
          return (
            <TextInput style={styles.item} key={key} placeholder="Add Item" />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 1,
    alignItems: 1,
    padding: 2,
  },
  item: {
    left: 20,
    paddingVertical: 2,
  },
});
