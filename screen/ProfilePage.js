/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfilePage = () => { 
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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

export default ProfilePage;*/


import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform ,TouchableOpacity,StyleSheet,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card, Icon,SearchBar} from 'react-native-elements'
import Firebase from '../config/firebase';



const ProfilePage=()=> {
  const [image, setImage] = useState('../assets/sac.jpg');
  
  const [image2, setImage2] = useState('');

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`images/${imageName}`);
setImage2(ref.put(blob));
    return ref.put(blob);
}

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

    var docRef = Firebase.firestore().collection("cities").doc("LA");

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data().name);
        setImage2(doc.data().name)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    uploadImage(result.uri, 'test-image')

  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Kaydet" onPress={put} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}



      <TouchableOpacity onPress={()=>urunPage("Parfüm Deodorant")}>
<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>PARFÜM DEODORANT</Card.Title>
  <Card.Divider/>
  <Card.Image source={{ uri: image2 }}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      buttonStyle={{backgroundColor:'#4e84aa',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
</Card>

</TouchableOpacity>




    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    
  },
  searchBar:{
    width:"96%",
    marginTop:"21%",
    marginBottom:"7%",
    marginLeft:"2%",
    marginRight:"2%",
  },
  card:{
    alignItems:"center",
    justifyContent:"center",
    
  },
  button: {
   flexDirection:"row-reverse",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
});

export default ProfilePage;