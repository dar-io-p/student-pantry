import React from "react";
import { ScrollView } from "react-native";

import { PersonalCard } from "./PersonalCard";

export const CardView = ({ data, setDBUpdate, style }) => {
  const sortedData = data.sort((a, b) => {
    const d1 = new Date(a.useBy.seconds * 1000);
    const d2 = new Date(b.useBy.seconds * 1000);
    return d1 < d2 ? -1 : d1 > d2 ? 1 : 0;
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
      }}
      style={style}
    >
      {sortedData.map((item, key) => {
        return (
          <PersonalCard
            {...item}
            key={key}
            style={{ marginTop: "3%" }}
            setDBUpdate={setDBUpdate}
          />
        );
      })}
    </ScrollView>
  );
};
