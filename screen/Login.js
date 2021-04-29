import React, { useEffect, useState }  from 'react';
import {View, Text, StyleSheet,Button,TextInput, ImageBackground,TouchableOpacity,Modal} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import Firebase from '../config/firebase'
import SignUp from "./SignUp";
import Anasayfa from "./Anasayfa";


//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const Login = props => {

  const {navigation} = props;
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [getValue, setGetValue] = useState('');
  const [addBarkod, setBarkod] = useState(false);

  handleLogin = () => {

    Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate('Anasayfa'))
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
    
    <Modal
            animationType="slide"
            visible={addBarkod}
          >
            <SignUp/>
         </Modal>

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
  <TouchableOpacity style={styles.title} onPress={() => navigation.navigate('ForgotPassword')}>
    <Text style={styles.forgot}>Forgot Password?</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.loginBtn} 
      onPress={()=>saveValueFunction()}>
    <Text style={styles.loginText}>LOGIN</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.title} onPress={setBarkod(true)}>
    <Text
     style={styles.kayit}>Sign up</Text>
  </TouchableOpacity>
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
    textAlign: "center",
    fontWeight:"700",
    borderBottomColor:"#634d4d",
    borderBottomWidth:3,
    paddingBottom:"2%",
  },
  title:{
    alignItems:"center",
    borderBottomWidth:0,
    borderBottomColor:"white"
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
  loginBtn:{
    width:"90%",
    backgroundColor:"#d77a5b",
    borderRadius:20,
    height:"14%",
    alignSelf: 'center',
    

    marginTop:"10%",
    marginBottom:"5%",
  },
  loginText:{
    marginTop: 15,
    color:"white",
    textAlign: "center",
    alignItems:'center',
    fontSize:25,
    fontWeight:"bold",
    
  },
  kayit:{
    marginTop: 15,
    color:"#634d4d",
    textAlign: "center",
    fontWeight:"bold",
    borderBottomColor:"#634d4d",
    borderBottomWidth:3,
    paddingBottom:"2%",
    fontSize:20
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