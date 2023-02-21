import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function AdviceScreen({ navigation }) {
  return (
    <View styles={styles.container}>
      <Text>AdviceScreen</Text>
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
