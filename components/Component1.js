import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Button,
    Alert,
    Icon,
    FlatList,
    ActivityIndicator
} from "react-native";

const Component1 = () => {
    const bckndUrl = 'https://reactnative.dev/movies.json'
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(bckndUrl)
            .then((response) => {
                response.json()
            })
            .then((json) => {
                setData(json.movies);
            })
            .catch((err) => {
                Alert.alert(err);
            })
            .finally(setLoading(false));
    });

    return (<SafeAreaView style={styles.viewStyle}>
        <Button title="Hello World!"
            onPress={() => Alert.alert("Simple action :)")} />
        {isLoading ? (<ActivityIndicator />) : (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={
                    ({ item }) => {
                        return (<Text>{item.title}</Text>);
                    }
                }
            />)}
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
    }
});

export default Component1;