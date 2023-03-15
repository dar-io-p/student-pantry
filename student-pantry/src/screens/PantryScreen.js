import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CardView } from "../components/CardView";
import { AddToPantryModal } from "../components/AddToPantryModal";

export default function PantryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CardView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
