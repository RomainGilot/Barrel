import React from "react";

import HomePage from "./screens/HomePage";
import MyCarPage from "./screens/MyCarPage";
import HistoryPage from "./screens/HistoryPage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: "HomePage", headerShown: false }} />
        <Stack.Screen name="MyCarPage" component={MyCarPage} options={{ title: "MyCarPage", headerShown: false }} />
        <Stack.Screen name="HistoryPage" component={HistoryPage} options={{ title: "HistoryPage", headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
