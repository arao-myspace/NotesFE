import React, { useState, useEffect } from "react";
import config from '../config/config';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Alert,
    Icon,
    FlatList,
    ActivityIndicator,
    Text
} from "react-native";

const Item = ({ title, body }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title} {body}</Text>
    </View>
  );

const Component1 = () => {
    const backendUrl = 'http://localhost:' + config.backendPort;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const endpoint = '/api/notes';

    useEffect(() => {
        fetch(backendUrl + endpoint)
            .then(response =>
                response.json()
            )
            .then(data => 
                setData(data)
            )
            .catch((err) => {
                Alert.alert(err)
            })
            .finally(setLoading(false));
    }, []);

    const renderItem = ({ item }) => (
        <Item title={item.title} body={item.body} />
      );

    return (<SafeAreaView style={styles.viewStyle}>
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={renderItem}/>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    viewStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        height: "100%",
        width: "100%",
        backgroundColor: "#eaeaea"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }
});

export default Component1;