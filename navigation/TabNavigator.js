import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import {NavigationContainer} from '@react-navigation/native';


import HomePage from "../screen/HomePage";
import BarkodPage from "../screen/BarkodPage";
import ProfilePage from "../screen/ProfilePage";
import IngredientPage from "../screen/IngredientPage";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator tabBarOptions={{style:{backgroundColor:"white", },inactiveTintColor:"black", activeTintColor:"black"}} >
        <Tab.Screen name="HomePage" component={HomePage}  options={{
          tabBarLabel: 'Home',color:"white",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={26}  color="black" />
          ),
        }} />
        <Tab.Screen name="BarkodPage" component={BarkodPage} options={{
          tabBarLabel: 'Barkod',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
          ),
        }}/>
        <Tab.Screen name="ProfilePage" component={ProfilePage} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={21} color="black" />
          ),
        }}/>
        <Tab.Screen name="IngredientPage" component={IngredientPage} options={{
            tabBarLabel: 'Ingredient',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="warning" size={24} color="black" />
          ),
        }}/>
     
      </Tab.Navigator>
  );
}