import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GirisEkrani from "./app/screens/GirisEkrani";
import MesajEkrani from "./app/screens/MesajEkrani";
import { navigatorTheme } from "./app/styles/NavigatorStil";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GirisEkrani"
        screenOptions={navigatorTheme}
      >
        <Stack.Screen
          name="GirisEkrani"
          component={GirisEkrani}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MesajEkrani"
          component={MesajEkrani}
          options={{ title: "Duygu Analizi" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
