import React, { useEffect, useState } from "react";

import { Text, ScrollView } from "react-native";
import { GroupCard } from "./GroupCard";

import { getSharedPantry } from "../store/config";

export function GroupCardView(props) {
  const id = "456789";
  const [data, setData] = useState([]);

  useEffect(() => {
    getSharedPantry(id).then((d) => setData(d));
  }, [id]);

  console.log(data);

  if (!props.isInGroup) {
    return <Text>NOT IN GROUP</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
      }}
    >
      {data.map((item, key) => {
        return <GroupCard {...item} key={key} style={{ marginTop: "3%" }} />;
      })}
    </ScrollView>
  );
}
