import React, { useState, useEffect } from "react";
import config from "../config/config";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
  FlatList,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";

const Item = ({ title, body }) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {title} {body}
    </Text>
  </View>
);

const Component1 = () => {
  const backendUrl = "http://192.168.0.29:" + config.backendPort;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const endpoint = "/api/notes";

  useEffect(() => {
    fetch(backendUrl + endpoint)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => {
        Alert.alert("Error", err.toString(), [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]);
      })
      .finally(setLoading(false));
  }, []);

  const renderItem = ({ item }) => <Item title={item.title} body={item.body} />;

  const [visible, setVisible] = React.useState(true);
  return (
    <SafeAreaView style={styles.viewStyle}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
      <FAB
        placement="right"
        visible={visible}
        icon={(props) => <AntDesign name="plus" size={24} color="white" />}
        color="green"
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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Component1;
