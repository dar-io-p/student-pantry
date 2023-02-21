import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function PantryScreen({ navigation }) {
  return (
    <View styles={styles.container}>
      <Text>PantryScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
