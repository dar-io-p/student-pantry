import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GroupCardView } from "../components/GroupCardView";
import { GroupModal } from "../components/GroupModal";

import { useIsFocused } from "@react-navigation/native";
import { getSharedPantry, isInGroup, getGroupID } from "../store/config";

import { auth } from "../store/config";

export default function GroupScreen({ navigation }) {
  const uid = auth.currentUser ? auth.currentUser.displayName : "";

  const isFocused = useIsFocused();
  const [inGroup, setInGroup] = useState(false);
  const [groupid, setgroupid] = useState("");
  const [data, setData] = useState([]);
  const [dbUpdate, setDBUpdate] = useState(false);

  //FIRST EFFECT CHECK IF USER IS IN A GROUP
  useEffect(() => {
    isInGroup(uid)
      .then((val) => {
        setInGroup(val);
      })
      .catch((err) => console.log("1"));
  }, []);

  //SECOND EFFECT GET THE GROUP ID
  useEffect(() => {
    inGroup &&
      getGroupID(uid)
        .then((val) => {
          setgroupid(val);
        })
        .catch((err) => console.log("4"));
  }, [inGroup]);

  //THIRD EFFECT GET THE PANTRY ONCE THE GROUPID HAS BEEN FETCHED OR THE SCREEN IS FOCUSSED
  useEffect(() => {
    inGroup &&
      getSharedPantry(groupid)
        .then((d) => setData(d))
        .catch((err) => console.log(groupid));
  }, [groupid, isFocused]);

  useEffect(() => {
    isInGroup(uid)
      .then((val) => {
        setInGroup(val);
      })
      .catch((err) => console.log("5"));

    inGroup &&
      getSharedPantry(groupid).then((d) => {
        setData(d);
        setDBUpdate(false);
      });

    inGroup &&
      getGroupID(uid)
        .then((val) => {
          setgroupid(val);
        })
        .catch((err) => console.log("6"));

    setDBUpdate(false);
  }, [dbUpdate]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <GroupModal
          setData={setData}
          inGroup={inGroup}
          setDBUpdate={setDBUpdate}
        />
      ),
    });
  }, [navigation, setData, inGroup]);

  return (
    <View style={styles.container}>
      <GroupCardView data={data} inGroup={inGroup} setDBUpdate={setDBUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
