import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, SafeAreaView, StatusBar } from "react-native";

import { PersonalCard } from "./PersonalCard";
import { getNotWasted } from "../store/config";

export const CardView = (props) => {
  const id = "test123";
  const [data, setData] = useState([]);

  useEffect(() => {
    getNotWasted(id).then((d) => setData(d));
  }, [id]);

  const sortedData = data.sort((a, b) => {
    const d1 = new Date(a.useBy.seconds * 1000);
    const d2 = new Date(b.useBy.seconds * 1000);
    return d1 < d2 ? -1 : d1 > d2 ? 1 : 0;
  });

  console.log(data);
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
      }}
    >
      {sortedData.map((item, key) => {
        return <PersonalCard {...item} key={key} style={{ marginTop: "3%" }} />;
      })}
    </ScrollView>
  );
};
