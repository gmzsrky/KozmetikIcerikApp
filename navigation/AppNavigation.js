import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import SignUp from "../screen/SignUp";
import ForgotPassword from "../screen/ForgotPassword";
import Gecis from "../screen/Gecis";

import Login from "../screen/Login";
import Splash from "../screen/Splash";

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        
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
            headerShown:true,
            headerLeft:false
          }}
        />
        <Stack.Screen name="Splash"  component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;