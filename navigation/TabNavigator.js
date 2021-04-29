import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';


import HomePage from "../screen/HomePage";
import BarkodPage from "../screen/BarkodPage";
import ProfilePage from "../screen/ProfilePage";
import IngredientPage from "../screen/IngredientPage";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator tabBarOptions={{style:{backgroundColor:"purple", },inactiveTintColor:"white", activeTintColor:"red"}} >
        <Tab.Screen name="HomePage" component={HomePage}  options={{
          tabBarLabel: 'Home',
          color:"white",
          tabBarIcon: ({ color, size }) => (
            <Icon
            name='home'
            type='feather'
            color='white'
          />
          ),
        }} />
        <Tab.Screen name="BarkodPage" component={BarkodPage} options={{
          tabBarLabel: 'Barkod',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="drop" size={24} color="white" />
          ),
        }}/>
        <Tab.Screen name="ProfilePage" component={ProfilePage} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="drop" size={24} color="white" />
          ),
        }}/>
        <Tab.Screen name="IngredientPage" component={IngredientPage} options={{
          tabBarLabel: 'Ingredient',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="drop" size={24} color="white" />
          ),
        }}/>
     
      </Tab.Navigator>
  );
}