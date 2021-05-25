import React, { useState } from 'react'
import { Button } from 'react-native';
import { Text, View,TouchableOpacity,TextInput,StyleSheet,ImageBackground,Alert} from 'react-native'
import { colors } from 'react-native-elements';
import Firebase from '../config/firebase';


//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const ForgotPassword =props=> {

    const {navigation} = props;
    const [email, setemail] = useState('');

    const ButtonAlert = () =>
    Alert.alert(
      "işte oldu!",
      "lütfen e-postanı kontrol et",
      [
        {
          text: "TAMAM",
          onPress:() => navigation.navigate('Login'),
         
        },
      
      ],
      { cancelable: false }
    );

      forgotPassword = () => {
        Firebase.auth().sendPasswordResetEmail(email)
          .then(function (user) {
            alert('Lütfen e-mail adresinizi kontrol edin')
          })
          .then(()=> ButtonAlert())
          .catch(function (e) {
            console.log(e)
          })
      }


    return (
      <ImageBackground style={{flex: 1, opacity: 0.85,}}  source={require('../assets/sign.jpg')}>
         <View style={styles.container}>
        <Text style={styles.txt}>Lütfen e-mail adresinizi girin</Text>
        <View style={styles.inputView}>
        <TextInput  
      style={styles.inputText}
      placeholder="Email..." 
      placeholderTextColor="#634d4d"
      onChangeText={email => setemail(email)}
      defaultValue={email}/>
      </View>
        <TouchableOpacity style={styles.resetbtn}
      onPress={forgotPassword}>
    <Text style={styles.resetbtntxt}>Reset</Text>
  </TouchableOpacity>
      </View>
      </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container:{
      justifyContent:'center',
      alignItems:'center' ,  
      marginTop:'5%',
      paddingLeft:40,
      paddingRight:40,
      flex:1,
     },
     txt:{
      marginTop: "10%",
      marginBottom:'12%',
      fontWeight:"bold",
      fontSize:17,
      color:"#375267",
      textAlign: "center",
      alignSelf:'stretch',
      borderBottomColor:"#375267",
      borderBottomWidth:3,
      paddingBottom:"5%",
    },
    inputView:{
      width:"95%",
      backgroundColor:"#FFFF",
      borderRadius:15,
      height: "8%",
      marginBottom:"5%",
      justifyContent:"center",
      padding:"7%",
      alignSelf: 'center',
      marginTop:'10%',
      padding:'7%',
      marginRight:'4%',
    },
    inputText:{
      height:50,
      color:"#FFFF"
    },
    resetbtn:{
      width:"95%",
      backgroundColor:"#375267",
      borderColor:"#103637",
      borderRadius:14,
      alignSelf:"center",
      marginTop:"10%",
      marginBottom:"5%",
      marginRight:'4%',
      
     
    },
    resetbtntxt:{
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

  
  
   
  
  
  });

export default ForgotPassword