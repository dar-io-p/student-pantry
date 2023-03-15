import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { GroupCardView } from "../components/GroupCardView";

export default function GroupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <GroupCardView isInGroup={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
