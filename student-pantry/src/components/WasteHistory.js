import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { getWastedIndiv } from "../store/config";

const uid = "Dario";

export default function ({ style, dbUpdate }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getWastedIndiv(uid).then((val) => {
      setData(val);
    });
  }, [dbUpdate]);

  return (
    <View style={style}>
      <Text style={styles.title}>Waste History</Text>
      {data.map((item, index) => {
        return <Text style={styles.rowItem}> - {item.id}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 2,
    fontSize: 25,
    left: 8,
    fontWeight: "bold",
  },
  rowItem: {
    fontSize: 20,
    left: 10,
  },
});
