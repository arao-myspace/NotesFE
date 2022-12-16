import React, { useState, useEffect } from "react";
import config from "../config/config";
import styles from "../styles/styles";
import { SafeAreaView, View, FlatList, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";
import EditModal from "./EditNote";

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
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const Item = ({ title, body }) => (
    <Pressable
      onPress={() => {
        setModalIsVisible(true);
        const selectedItem = { title: title, body: body };
        setSelectedItem(selectedItem);
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.viewStyle}>
      <EditModal
        visible={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        title={selectedItem.title}
        body={selectedItem.body}
      />
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

export default Component1;
