import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from "react-navigation";
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 


import Anasayfa from "../screen/Anasayfa";
import BarkodPage from "../screen/BarkodPage";
import ProfilePage from "../screen/ProfilePage";
import IngredientPage from "../screen/IngredientPage";


class Home extends React.Component {
  render() {
    return <Anasayfa navigator={navigator} />;
  }
}

class Barkod extends React.Component {
  render() {
    return <BarkodPage navigator={navigator} />;
  }
}

class Profile extends React.Component {
  render() {
    return <ProfilePage navigator={navigator} />;
  }
}
class Ingredient extends React.Component {
  render() {
    return <IngredientPage navigator={navigator} />;
  }
}

//stil kısmı 

const TabNavigator = createBottomTabNavigator({
  Anasayfa: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',color:"white",
      tabBarIcon: ({ color, size }) => (
        <Entypo name="home" size={26}  color="black" />
      ),
    },
  },
  ProfilePage: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={21} color="black" />
      ),
    },
  },

  BarkodPage: {
    screen: Barkod,
    navigationOptions: {
      tabBarLabel: 'Barkod',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
      ),
    },
  },

  IngredientPage: {
    screen: Ingredient,
    navigationOptions: {
      tabBarLabel: 'Ingredient',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="warning" size={24} color="black" />
      ),
    },
  },



});
export default createAppContainer(TabNavigator);