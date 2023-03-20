import React from "react";

import { Text, ScrollView } from "react-native";
import { GroupCard } from "./GroupCard";

export function GroupCardView({ inGroup, data, setDBUpdate }) {
  if (!inGroup) {
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
        return (
          <GroupCard
            {...item}
            key={key}
            style={{ marginTop: "3%" }}
            setDBUpdate={setDBUpdate}
          />
        );
      })}
    </ScrollView>
  );
}
