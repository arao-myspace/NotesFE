import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Component1 from "./components/Component1";
import CreateNote from "./components/CreateNote";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Component1}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Create" component={CreateNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
