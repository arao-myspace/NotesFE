import React, { useState, useEffect } from "react";
import config from "../config/config";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";

const Item = ({ title, body }) => (
  <Pressable onPress={() => alert("Pressed!")}>
    <View style={styles.item}>
      <Text style={styles.title}>
        {title} {body}
      </Text>
    </View>
  </Pressable>
);

const Component1 = ({ route, navigation }) => {
  const backendPath = config.backendUrl + ":" + config.backendPort;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const endpoint = "/api/notes";

  useEffect(() => {
    fetch(backendPath + endpoint)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => <Item title={item.title} body={item.body} />;

  const [visible, setVisible] = React.useState(true);
  return (
    <SafeAreaView style={styles.viewStyle}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        numColumns={2}
      />
      <FAB
        placement="right"
        visible={visible}
        icon={(props) => <AntDesign name="plus" size={24} color="white" />}
        color="green"
        onPress={() => navigation.navigate("Create", { name: "Jane" })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 25,
    height: "100%",
    width: "100%",
    backgroundColor: "#eaeaea",
  },
  item: {
    borderColor: "rgba(128, 128, 128, 0.4)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Component1;
