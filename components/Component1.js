import React, { useState, useEffect } from "react";
import config from '../config/config';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Alert,
    FlatList,
    Text
} from "react-native";

const Item = ({ title, body }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title} {body}</Text>
    </View>
);

const Component1 = () => {
    const backendUrl = 'http://192.168.0.29:' + config.backendPort;
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
                Alert.alert(
                    "Error",
                    err.toString(),
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
            })
            .finally(setLoading(false));
    }, []);

    const renderItem = ({ item }) => (
        <Item title={item.title} body={item.body} />
    );

    return (<SafeAreaView style={styles.viewStyle}>
        <Text>Some static text</Text>
        <FlatList
            data={data}
            keyExtractor={item => item._id}
            renderItem={renderItem} />
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