import React, { useEffect, useState }  from 'react';
import {View, Text, StyleSheet,TextInput, ImageBackground,TouchableOpacity,AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import Firebase from '../config/firebase'
//import { Button } from 'react-native-elements';
import { inlineStyles } from 'react-native-svg';
import { block } from 'react-native-reanimated';



//disable yellow warnings on EXPO client!
console.disableYellowBox = true;



const Login = props => {

  const {navigation} = props;
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  handleLogin = () => {

    Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate('Ingredients',{
          screen: 'HomePage',
          params: {
            screen: 'HomePage',
            params: {
              caption:email,
            },
          },
        }
         ))
        .catch(error => alert(error))
}
  
const saveValueFunction = () => {
  //function to save the value in AsyncStorage
  if (email) {
    //To check the input not empty
    AsyncStorage.setItem('any_key_here', email);
    //Setting a data to a AsyncStorage with respect to a key
    setemail('');
    //alert to confirm
  } 
  if (password) {
    //To check the input not empty
    AsyncStorage.setItem('any_key_here2', password);
    //Setting a data to a AsyncStorage with respect to a key
    setpassword('');
    //Resetting the TextInput
    //alert to confirm
  }
  handleLogin();
};


const genelKullanici = () => {
  Firebase.auth()
  .signInWithEmailAndPassword("genel@gmail.com", "sifre12345")
  .then(() => navigation.navigate('Ingredients',{
    screen: 'HomePage',
    params: {
      screen: 'HomePage',
      params: {
        caption:email,
      },
    },
  }
   ))
  .catch(error => alert(error))
}

return (
<ImageBackground style={{flex: 1, opacity: 0.9,}}  source={require('../assets/log.jpg')}>
  <View style={styles.container}> 
  <View style={styles.inputView} >
    <TextInput style={{marginTop:"10%"}} 
      style={styles.inputText}
      placeholder="Email..." 
      placeholderTextColor="#003f5c"
      onChangeText={email => setemail(email)}
      defaultValue={email}/>
  </View>
  <View style={styles.inputView} >
    <TextInput  
      secureTextEntry={true}
      style={styles.inputText}
      placeholder="Password..." 
      placeholderTextColor="#003f5c"
      onChangeText={password => setpassword(password)}
        defaultValue={password}/>
  </View>
  
  

  <View style={styles.butonlar}>
  <TouchableOpacity  style={styles.loginBtn} onPress={()=>saveValueFunction()}>
        
        <Text style={styles.loginText}>GİRİŞ</Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.loginBtn} onPress={() =>genelKullanici()}>
    <Text
     style={styles.loginText}>Kayıt olmadan devam et</Text>
  </TouchableOpacity>
  </View>

  <View style={styles.title}  >
  <TouchableOpacity  onPress={() => navigation.navigate('ForgotPassword')}>
    <Text style={styles.forgot}>Şifremi Unuttum</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('SingUp')}>
    <Text
     style={styles.forgot}>Kayıt Ol</Text>
     
  </TouchableOpacity>
  </View>
</View>
</ImageBackground>
);
}
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    marginTop:"85%",
  
    
  },

 /* logo:{
    marginTop: "45%",
    fontWeight:"bold",
    fontSize:50,
    color:"#2f5a93",
    marginBottom:"20%",
    textAlign: "center",
    borderBottomColor:"#2f5a93",
    borderBottomWidth:5,
    paddingBottom:"2%",
  }, */

  inputView:{
    width:"90%",
    backgroundColor:"#80A1BB",
    borderRadius:15,
    height: "8%",
    marginBottom:"5%",
    justifyContent:"center",
    padding:"7%",
    alignSelf: 'center',
  },
  inputText:{
    height:50,
    color:"white"
  },

  loginText:{
    marginTop: 15,
    color:"#80A1BB",
    alignItems:"center",
    textAlign:'center',
    fontSize:20,
    fontWeight:"bold",

    
  },
  loginBtn:{
    maxWidth:"100%",
    backgroundColor:"#FFFFFF",
    borderColor:"#191834",
    borderRadius:14,
    height:"60%",
    alignSelf:"center",
    marginTop:"7%",
    marginBottom:"5%",
    marginRight:'4%',
    paddingLeft:"4%",
    paddingRight:'5%',
   
    
    
  },
  butonlar:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:"10%",
    marginLeft:"4%",
    
    
  
  },
  forgot:{
    color:'white',
    opacity: 0.8,
    backgroundColor:"#526E6B",
    borderRadius:3,
    textAlign:"center",
    padding:6,
    fontSize:12,
    //fontWeight:"900",
    fontWeight:"bold",
   // borderBottomColor:"#634d4d",
    //borderBottomWidth:1,
   //paddingBottom:"2%",
     justifyContent:'space-between',
    flexDirection:"row",
    marginRight:"5%",
    
  },
   title:{
    marginTop:"5%",
    padding:"2%",
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:"7%",
    marginLeft:"4%",
    }, 
  
  text:{
    height:'50%',
      fontWeight: 'bold',
      fontSize: 40,
      textAlign: "center",
      fontStyle: 'italic',
      fontFamily:"tahoma",
  },


});


export default Login;