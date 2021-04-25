import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useCallback} from "react";
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Card, ListItem, Button, Icon,SearchBar} from 'react-native-elements'

import Firebase from '../config/firebase'


const HomePage = () => { 
  const [search, setsearch] = useState("");
  updateSearch = (search) => {
    setsearch( search );

  };

  //firebase
  var db=Firebase.firestore();
  var docRef = db.collection("Deneme").doc("madde");

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });



  return (
  <View style={styles.container}>
      
      <TouchableOpacity style={styles.searchBar}>
      <SearchBar 
        placeholder="Ürün ismi giriniz.."
        onChangeText={updateSearch}
        value={search}
      />
      </TouchableOpacity>


     <Card style={styles.card}>
  <Card.Title>HELLO WORLD</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/on.jpg')}>
    <Text style={{marginBottom: 10}}>
      The idea with React Native Elements is more about component structure than actual design.
    </Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' />
  </Card.Image>
</Card>

      <StatusBar style="auto" />
    </View>
    
  );

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    
  },
  searchBar:{
    marginTop:"13%",
    width:"100%"

  },
  card:{
    alignItems:"center",
    justifyContent:"center"
  }
});

export default HomePage; 