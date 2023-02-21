import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function GroupScreen({ navigation }) {
  return (
    <View styles={styles.container}>
      <Text>GroupScreen</Text>
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
