import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { getWasted, auth } from "../store/config";

export default function ({ style, dbUpdate }) {
  const uid = auth.currentUser ? auth.currentUser.displayName : "";
  const [data, setData] = useState([]);

  useEffect(() => {
    getWasted(uid)
      .then((val) => {
        setData(val);
        console.log("Waste updated");
      })
      .catch((err) => console.log("error getting food :" + err));
  }, [dbUpdate]);

  return (
    <View style={style}>
      <Text style={styles.title}>Waste History</Text>
      {data.map((item, index) => {
        return (
          <Text key={index} style={styles.rowItem}>
            {" "}
            - {item.id}
          </Text>
        );
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
