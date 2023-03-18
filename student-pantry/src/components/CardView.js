import React from "react";
import { View } from "react-native";

import { PersonalCard } from "./PersonalCard";

export const CardView = ({ data, setDBUpdate, style }) => {
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
        alignContent: "space-between",
        marginBottom: "3%",
      }}
    >
      {sortedData.map((item, key) => {
        return (
          <PersonalCard
            {...item}
            key={key}
            setDBUpdate={setDBUpdate}
            style={{ marginTop: "3%" }}
          />
        );
      })}
    </View>
  );
};
