import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { GroupCardView } from "../components/GroupCardView";
import { GroupModal } from "../components/GroupModal";

import { useIsFocused } from "@react-navigation/native";
import { getSharedPantry, isInGroup, getGroupID } from "../store/config";

import { auth } from "../store/config";
import SharedShoppingList from "../components/SharedShoppingList";

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
      .catch((err) => console.log(err));
  }, []);

  //SECOND EFFECT GET THE GROUP ID
  useEffect(() => {
    inGroup &&
      getGroupID(uid)
        .then((val) => {
          setgroupid(val);
        })
        .catch((err) => console.log(err));
  }, [inGroup]);

  //THIRD EFFECT GET THE PANTRY ONCE THE GROUPID HAS BEEN FETCHED OR THE SCREEN IS FOCUSSED
  useEffect(() => {
    inGroup &&
      getSharedPantry(groupid)
        .then((d) => setData(d))
        .catch((err) => console.log(err));
  }, [groupid, isFocused]);

  useEffect(() => {
    isInGroup(uid)
      .then((val) => {
        setInGroup(val);
      })
      .catch((err) => console.log(err));

    inGroup &&
      getSharedPantry(groupid)
        .then((d) => {
          setData(d);
          setDBUpdate(false);
        })
        .catch((err) => console.log(err));

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

  if (inGroup)
    return (
      <View style={styles.container}>
        <ScrollView>
          <GroupCardView
            data={data}
            inGroup={inGroup}
            setDBUpdate={setDBUpdate}
          />
          <SharedShoppingList
            inGroup={inGroup}
            style={styles.shopping}
            groupid={groupid}
          />
        </ScrollView>
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <View style={styles.notInGroup}>
          <Text style={{ fontSize: 20 }}>You are not in a group.</Text>
          <Text style={{ fontSize: 20, padding: 20 }}>
            Press the Button in the top right corner to create a new group or
            join an existing group
          </Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notInGroup: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  shopping: {
    marginVertical: 10,
    paddingVertical: 10,
    flex: 1,
    borderWidth: 1,
  },
});
