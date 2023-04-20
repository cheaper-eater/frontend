import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Index from "../screens/index";
import ListView from "../screens/listView";
import Base from "../screens/base";
import MenuView from "../screens/menuView";
import Checkout from "../screens/checkout";

const Stack = createNativeStackNavigator();

const Pages = () => {
  return (
    <NavigationContainer
      linking={{
        config: {
          screens: {
            Home: "",
            Search: "search",
            Menu: "menu",
            Checkout: "checkout",
          },
        },
      }}
    >
      <Base>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Index} />
          <Stack.Screen name="Search" component={ListView} />
          <Stack.Screen name="Menu" component={MenuView} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </Base>
    </NavigationContainer>
  );
};
export default Pages;
