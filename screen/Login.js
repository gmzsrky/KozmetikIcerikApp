import React, { useEffect, useState }  from 'react';
import {View, Text, StyleSheet,TextInput, ImageBackground,TouchableOpacity,AsyncStorage} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import Firebase from '../config/firebase'
import { Button } from 'react-native-elements';
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
        .then(() => navigation.navigate('Gecis'))
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

return (


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
        
        <Text style={styles.loginText}>LOGİN</Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Gecis')}>
    <Text
     style={styles.loginText}>Kayıt olmadan devam et</Text>
  </TouchableOpacity>
  </View>

  <View style={styles.title}  >
  <TouchableOpacity  onPress={() => navigation.navigate('ForgotPassword')}>
    <Text style={styles.forgot}>Forgot Password?</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('SingUp')}>
    <Text
     style={styles.forgot}>Sign up</Text>
  </TouchableOpacity>
  </View>
</View>
);
}
const styles = StyleSheet.create({
  container:{
    marginTop:"90%",
    flex: 1, 
  },
  logo:{
    marginTop: "45%",
    fontWeight:"bold",
    fontSize:50,
    color:"#2f5a93",
    marginBottom:"20%",
    textAlign: "center",
    borderBottomColor:"#2f5a93",
    borderBottomWidth:5,
    paddingBottom:"2%",
  },
  forgot:{
    color:"#634d4d",
    fontSize:11,
    fontWeight:"700",
    borderBottomColor:"#634d4d",
    //borderBottomWidth:3,
    paddingBottom:"2%",
     justifyContent:'space-between',
    flexDirection:"row",
  },
    title:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:"7%",
    marginLeft:"4%",
    }, 
  
  inputView:{
    width:"80%",
    backgroundColor:"#adcceb",
    borderRadius:25,
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
    color:"white",
    alignItems:"center",
    textAlign:'center',
    fontSize:20,
    fontWeight:"bold",

    
  },
  loginBtn:{
    maxWidth:"100%",
    backgroundColor:"pink",
    borderColor:"#191834",
    borderRadius:14,
    height:"60%",
    alignSelf:"center",
    marginTop:"10%",
    marginBottom:"5%",
    marginRight:'5%',
    paddingLeft:"5%",
    paddingRight:'5%',
    
    
  },
  butonlar:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:"10%",
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
  buttonContainer:{
    justifyContent:'space-between',
    width:'50%',
    height:'25%',
  },
  kayitText:{
   
    backgroundColor: "#FFCC80",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent:"space-around",
    fontSize: 20,
  },
  textButton:{
    fontSize:20,
    textAlign: "center",
  },


});


export default Login;