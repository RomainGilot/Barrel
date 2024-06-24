import React from "react";

import HomePage from "./screens/HomePage";
import MyCar from "./screens/MyCar";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: "HomePage", headerShown: false }} />
        <Stack.Screen name="MyCar" component={MyCar} options={{ title: "MyCar", headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
