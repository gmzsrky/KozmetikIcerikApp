import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import KayitOl from "../screen/SignUp";
import SifremiUnuttum from "../screen/ForgotPassword";
import Anasayfa from "../screen/Anasayfa";

import GirisYap from "../screen/Login";


const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Anasayfa">
        
        <Stack.Screen
          name="KayitOl"
          component={KayitOl}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="GirisYap"
          component={GirisYap}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="SifremiUnuttum"
          component={SifremiUnuttum}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Anasayfa"
          component={Anasayfa}
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