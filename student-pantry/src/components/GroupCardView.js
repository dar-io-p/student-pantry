import React from "react";

import { Text, View } from "react-native";
import { GroupCard } from "./GroupCard";

export function GroupCardView({ data, setDBUpdate }) {
  const sortedData = data.sort((a, b) => {
    const d1 = new Date(a.useBy.seconds * 1000);
    const d2 = new Date(b.useBy.seconds * 1000);
    return d1 < d2 ? -1 : d1 > d2 ? 1 : 0;
  });

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
      }}
    >
      {sortedData.map((item, key) => {
        return (
          <GroupCard
            {...item}
            key={key}
            style={{ marginTop: "3%" }}
            setDBUpdate={setDBUpdate}
          />
        );
      })}
    </View>
  );
}
