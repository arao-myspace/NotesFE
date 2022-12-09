import React, { useState, useEffect } from "react";
import config from "../config/config";
import { StyleSheet, View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CreateScreen = ({ navigation, route }) => {
  const backendPath = config.backendUrl + ":" + config.backendPort;
  const [isLoading, setLoading] = useState(true);
  //const [data, setData] = useState([]);
  const endpoint = "/api/notes";
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Id, setId] = useState("");

  useEffect(() => {
    sendRequest("POST"); //set id of new note without any content
  }, []);
  useEffect(() => {
    if (Title || Content) {
      sendRequest("PUT");
    }
  }, [Title, Content]);
  // useEffect(() => {
  //   const exit = navigation.addListener(
  //     "beforeRemove",
  //     () => {
  //       if (!Title && !Content) {
  //         sendRequest("DELETE");
  //       }
  //       return exit;
  //     },
  //     Id
  //   );
  // }, [navigation]);

  const sendRequest = (method) => {
    const payload = { _id: Id, title: Title, body: Content };
    let myHeaders = new Headers();
    const suffix = method === "POST" ? "" : "/" + Id;
    myHeaders.append("Content-Type", "application/json");
    fetch(backendPath + endpoint + suffix, {
      method: method,
      headers: myHeaders,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setId(data._id);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };
  const inputTitle = (sText) => {
    setTitle(sText);
  };
  const inputContent = (sText) => {
    setContent(sText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title..."
        multiline={false}
        style={styles.input}
        onChangeText={inputTitle}
      />
      <TextInput
        placeholder="Content..."
        textAlignVertical="top"
        multiline={true}
        style={styles.inputMulti}
        onChangeText={inputContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  input: {
    height: 40,
    margin: 5,
    padding: 10,
    outlineStyle: "none",
    fontSize: 20,
  },
  inputMulti: {
    margin: 5,
    padding: 10,
    outlineStyle: "none",
    flex: 1,
  },
});
export default CreateScreen;
