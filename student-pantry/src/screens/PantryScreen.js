import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { CardView } from "../components/CardView";
import { AddToPantryModal } from "../components/AddToPantryModal";
import { useIsFocused } from "@react-navigation/native";

import { getNotWasted } from "../store/config";
import ShoppingList from "../components/ShoppingList";
import WasteHistory from "../components/WasteHistory";

import { auth } from "../store/config";

export default function PantryScreen({ navigation }) {
  const uid = auth.currentUser ? auth.currentUser.displayName : "";

  const [data, setData] = useState([]);
  const [dbUpdate, setDBUpdate] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getNotWasted(uid).then((d) => {
      setData(d);
    });
  }, [isFocused]);

  useEffect(() => {
    getNotWasted(uid).then((d) => {
      setData(d);
      setDBUpdate(false);
    });
  }, [dbUpdate]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddToPantryModal setData={setData} />,
    });
  }, [navigation, setData]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <CardView data={data} setDBUpdate={setDBUpdate} />
        <ShoppingList style={styles.shopping} />
        <WasteHistory dbUpdate={dbUpdate} style={styles.history} />
      </ScrollView>
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
