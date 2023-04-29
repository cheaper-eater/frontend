import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Index from "../screens/index";
import ListView from "../screens/listView";
import Base from "../screens/base";
import VerifyAccountEmail from "../screens/verifyAccountEmail";
import Login from "../screens/login";
import SignUp from "../screens/signUp";
import CreateNewPassword from "../screens/createNewPassword";
import MenuView from "../screens/menuView";
import Checkout from "../screens/checkout";
import AccountRecovery from "../screens/accountRecovery";

const Stack = createNativeStackNavigator();

const Pages = () => {
  return (
    <NavigationContainer
      linking={{
        config: {
          screens: {
            Home: "",
            Search: "search",
            Login: "login",
            SignUp: "signUp",
            VerifyAccountEmail: "verifyAccountEmail",
            CreateNewPassword: "passwordReset",
            ForgotPassword: "forgotPassword",
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
          <Stack.Screen
            name="VerifyAccountEmail"
            component={VerifyAccountEmail}
          />
          <Stack.Screen
            name="CreateNewPassword"
            component={CreateNewPassword}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={AccountRecovery} />
          <Stack.Screen name="Menu" component={MenuView} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </Base>
    </NavigationContainer>
  );
};
export default Pages;
