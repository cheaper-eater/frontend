import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Index from "../screens/index";
import ListView from "../screens/listView";
import Base from "../screens/base";
import VerifyAccountEmail from "../screens/verifyAccountEmail";
import SignUp from "../screens/signUp";
import CreateNewPassword from "../screens/createNewPassword";
import MenuView from "../screens/menuView";

const Stack = createNativeStackNavigator();

const Pages = () => {
  return (
    <NavigationContainer
      linking={{
        config: {
          screens: {
            Home: "",
            Search: "search",
            SignUp: "signUp",
            VerifyAccountEmail: "verifyAccountEmail",
            CreateNewPassword: "passwordReset",
            Menu: "menu",
          },
        },
      }}
    >
      <Base>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Index} />
          <Stack.Screen name="Search" component={ListView} />
          <Stack.Screen
            name="VerifyAccountEmail"
            component={VerifyAccountEmail}
          />
          <Stack.Screen
            name="CreateNewPassword"
            component={CreateNewPassword}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Menu" component={MenuView} />
        </Stack.Navigator>
      </Base>
    </NavigationContainer>
  );
};
export default Pages;
