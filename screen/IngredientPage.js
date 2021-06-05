import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,FlatList,ScrollView } from 'react-native';
import IngredientPageModal from "../components/IngredientPageModal";
import Firebase from '../config/firebase'

const IngredientPage = () => { 

  const [icerik,seticerik]=useState([]);

  useEffect(() => {
    Firebase.firestore().collection("Deneme")
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
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }, []);

  renderIngredient = (list) => {
    return  <IngredientPageModal list={list}/>
  };
 
  return (
    <View style={styles.listContainer}>
      <ScrollView>
      <FlatList
                data={icerik}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => renderIngredient(item)}
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
  listContainer: {
    marginTop: 15,
    borderRadius: 2,
    width: "100%",
    paddingHorizontal:"5%",
    justifyContent:"space-between",
    justifyContent:"center",
    alignContent:"center",
    flexDirection:"row"
  },
});

export default IngredientPage;