import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Firebase from '../config/firebase'
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import FavProduct from "../components/FavProduct";
import {Dimensions} from 'react-native';
import WavyHeader from "../components/WavyHeader";

const ProfilePage = props => { 

  const [name,setName]=useState("");
  const [surname,setSurname]=useState("");
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
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    var docRef = Firebase.firestore().collection(user).doc("GenelBilgi");
    docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        setName(doc.data().KullaniciAdi)
        setSurname(doc.data().Soyisim)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
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
    <View>
    <MaterialIcons style={{alignSelf:"flex-end", marginRight:'2%', marginTop:'4%'}}name="exit-to-app" size={39} color="black"  onPress={()=>handlelogout()} />
    </View>
    <Text style={styles.hosgeldin}> HOŞGELDİN  </Text>
    <Text style={{fontSize:27, textAlign:"center",}}> {name} {surname} </Text>
    <Text style={styles.fav}>FAVORİ ÜRÜNLERİN: </Text>
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
    justifyContent: 'center',
   
  },
  hosgeldin:{
    marginTop:"8%",
    fontStyle:"italic",
    fontWeight:"bold",
    alignSelf:"center",
    borderBottomWidth:2,
    borderColor:"black",
    marginBottom:"1%",

  },
  fav:{ 
  width:"94%",
  textAlign:"center",
  marginTop:"13%",
  alignSelf:"center",
  borderWidth:2,
  borderColor:"black",
  backgroundColor:"#e3c3c5",
  padding:"3%",
  borderRadius:5,
  marginBottom:"4%",
  

}
});

export default ProfilePage;

