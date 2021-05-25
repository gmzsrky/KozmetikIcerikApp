import React, { useState }  from 'react';
import {View, Text, StyleSheet,Button,TextInput, ImageBackground,TouchableOpacity,Picker } from 'react-native';
import Firebase from '../config/firebase';


import { useRoute } from '@react-navigation/native';


//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const SignUp = props => {

  
  const {navigation} = props;
  const route = useRoute();

  const dbh = Firebase.firestore();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [kullaniciadi, setkullaniciadi] = useState('');
  const [soyisim, setsoyisim] = useState('');
  const [isim, setisim] = useState('');

  handleSignUp = () => {
    dbh.collection("Users").doc(email).set({
      KullaniciAdi: kullaniciadi,
      Isim:isim,
      Soyisim:soyisim,
      email:email
     })
    Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() =>navigation.navigate("Gecis"))
        .catch(error => alert(error))
}



  return (

    <ImageBackground style={{flex: 1, opacity: 0.85,}}  source={require('../assets/sign.jpg')}>
<View style={styles.container}>

    <Text style={styles.logo}>Lütfen Aşağıdaki Alanları Doldurunuz</Text>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Kullanıcı adı:" 
        placeholderTextColor="#003f5c"
        onChangeText={kullaniciadi => setkullaniciadi(kullaniciadi)}
        defaultValue={kullaniciadi}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
      
        style={styles.inputText}
        placeholder="Adınız:" 
        placeholderTextColor="#003f5c"
        onChangeText={isim => setisim(isim)}
        defaultValue={isim}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Soyadınız:" 
        placeholderTextColor="#003f5c"
        onChangeText={soyisim => setsoyisim(soyisim)}
        defaultValue={soyisim}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="E-mail:" 
        placeholderTextColor="#003f5c"
        onChangeText={email => setemail(email)}
        defaultValue={email}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Password:" 
        placeholderTextColor="#003f5c"
        onChangeText={password => setpassword(password)}
        defaultValue={password}/>
    </View>
     <TouchableOpacity style={styles.devamBtn} onPress={handleSignUp}>
      <Text style={styles.devamText}>KAYIT OL</Text>
    </TouchableOpacity>
   
    </View>
    </ImageBackground>
 
  );
}
    
const styles = StyleSheet.create({
    container:{
      flex: 1, 
      paddingLeft:40,
      paddingRight:40,
      marginTop:'20%',
     
      
    },
    text:{
      fontSize:15,
       color:"#26659c",
       borderBottomColor:"#26659c",
      borderBottomWidth:3,
      marginBottom:"5%",
      fontWeight:"bold",
    },
    
    radio:{
      paddingLeft:"20%",
      paddingRight:"20%",
    },
    logo:{
      marginTop: "10%",
      fontWeight:"bold",
      fontSize:17,
      color:"#375267",
      marginBottom:"5%",
      textAlign: "center",
      alignSelf:'stretch',
      borderBottomColor:"#375267",
      borderBottomWidth:3,
      paddingBottom:"5%",
    
    },

  inputView:{
    width:"100%",
    backgroundColor:"#FFFF",
    borderRadius:15,
    height: "8%",
    marginBottom:"5%",
    justifyContent:"center",
    padding:"7%",
    alignSelf: 'center',
  },
  inputText:{
    height:50,
    color:"#FFFF"
  },
    devamBtn:{
      width:"100%",
      backgroundColor:"#375267",
      borderColor:"#103637",
      borderRadius:14,
      alignSelf:"center",
      marginTop:"7%",
      marginBottom:"5%",
      marginRight:'4%',
      paddingLeft:"4%",
      paddingRight:'5%',
     
    },
    devamText:{
      marginTop: 15,
      color:"#FFFF",
      alignItems:"center",
      textAlign:'center',
      fontSize:20,
      padding:'5%',
      paddingTop:'2%',
      fontWeight:"bold",
      opacity:1,
    },

    pickerStyle:
    {
     color:"black",
      height:100,
      width:150,
      alignSelf:'center',
      marginBottom:0,
      
    }
  
  });
  
  
  export default SignUp;