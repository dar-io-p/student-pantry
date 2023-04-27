import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { experiment, foodData } from "./ExperimentData";
import { ExperimentListItem } from "./ExperimentListItem";
import colours from "../constants/colours";

export default function (props) {
  const [currentState, setCurrentState] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [completionTimes, setCompletionTimes] = useState([]);
  const [currentObjCompleted, setCurrentObjCompleted] = useState(true);
  useEffect(() => {
    console.log("CT: \n[" + completionTimes + "]");
  }, [completionTimes]);

  const updateState = (val) => {
    //update time
    if (!currentObjCompleted && val == experiment[currentState].expected) {
      console.log(val);
      const currentTime = new Date().getTime();
      const completionTime = currentTime - startTime;

      setCompletionTimes((prev) => [...prev, completionTime]);
      setCurrentObjCompleted(true);
    }
  };

  const handleStart = () => {
    if (currentState == 0) {
      setStartTime(new Date().getTime());
      updateState("start");
      setCurrentState(currentState + 1);
      setCurrentObjCompleted(false);
    }
  };
  const handleNext = () => {
    if (!currentObjCompleted) return;

    setStartTime(new Date().getTime());
    const currentTime = new Date().getTime();

    if (currentState < experiment.length - 1) {
      setCurrentState(currentState + 1);
      setStartTime(currentTime);
      setCurrentObjCompleted(false);
    } else {
      console.log("end: " + completionTimes);
    }
  };
  const updateTimes = () => {
    console.log("end");
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>{experiment[currentState].title}</Text>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          borderBottomWidth: 2,
          borderTopWidth: 2,
        }}
      >
        {foodData.map((elem, index) => {
          return (
            <ExperimentListItem
              key={index}
              {...elem}
              updateState={updateState}
            />
          );
        })}
      </View>
      <View style={{ height: "10%", flexDirection: "row" }}>
        <TouchableOpacity onPress={handleStart} style={styles.button}>
          <Text>START</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text>NEXT</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: colours.green,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%",
    marginVertical: "2%",
  },
  text: {
    fontSize: 30,
    fontWeight: "600",
  },
});
