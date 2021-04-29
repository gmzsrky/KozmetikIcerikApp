import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import SignUp from "../screen/SignUp";
import ForgotPassword from "../screen/ForgotPassword";
import Gecis from "../screen/Gecis";

import Login from "../screen/Login";


const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gecis">
        
        <Stack.Screen
          name="SingUp"
          component={SignUp}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Gecis"
          component={Gecis}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;