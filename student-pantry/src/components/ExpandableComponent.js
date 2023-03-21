import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import colours from "../constants/colours";

export const ExpandableComponent = ({ item, onClickFunction }) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View
      style={{
        borderWidth: 1,
        margin: 5,
        borderRadius: 5,
        borderColor: colours.grey,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}
      >
        <Text style={styles.headerText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: "hidden",
        }}
      >
        {/*Content under the header of the Expandable List Item*/}
        {item.subcategory.map((item, key) => (
          <View key={key} style={styles.content}>
            <Text style={styles.text}>
              {item.id}: {item.val}
            </Text>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F5FCFF",
    borderRadius: 5,
    padding: 20,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#808080",
    width: "95%",
    marginLeft: 16,
    marginRight: 16,
    marginVertical: 3,
  },
});
