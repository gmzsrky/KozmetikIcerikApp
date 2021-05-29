import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Firebase from '../config/firebase'
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import FavProduct from "../components/FavProduct";
const ProfilePage = props => { 

  const [icerik,seticerik]=useState([]);
  const {navigation} = props;
  var user = Firebase.auth().currentUser.email;

  useEffect(() => {
    Firebase.firestore().collection(user).where("fav","==",true)
    .get()
    .then((querySnapshot) => {
      const icerikk = [];
        querySnapshot.forEach((doc) => {
          icerikk.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        seticerik(icerikk);
        console.log("icerik:",icerik)
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }, []);


  handlelogout = async()=>{
    try{
          await Firebase.auth().signOut()
         .then(() => navigation.navigate('Login'));
         
      AsyncStorage.clear();
         
  
    }catch( error ){
          console.error(error);
    }
  }


  favPro = (liste) => {
    return  <FavProduct list={liste}/>
  };


  return (
    <View style={styles.container}>
  
  <ScrollView>
      <FlatList
                data={icerik}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => favPro(item)}
                contentContainerStyle={{ flex: 1 }}
            />
      </ScrollView>  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfilePage;

