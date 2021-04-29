import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView,AsyncStorage } from 'react-native'
import Firebase from '../config/firebase';
import { AntDesign } from '@expo/vector-icons';

const addBarkod = ()=>{

  const [getValue, setGetValue] = useState('');
  const [inputs, setInputs] = useState([{key: '', value: '',dene:'',akne:'',irite:'',fonksiyon:''}]);

  useEffect(() => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('key').then(
      (value) =>
        //AsyncStorage returns a promise so adding a callback to get the value
        setGetValue(value)
      //Setting the value in Text
    );
  })
  const addHandler = ()=>{
    const _inputs = [...inputs];
    _inputs.push({key: '', value: '',dene:'',akne:'',irite:'',fonksiyon:''});
    setInputs(_inputs);
  }
  
  const deleteHandler = (key)=>{
    const _inputs = inputs.filter((input,index) => index != key);
    setInputs(_inputs);
  }
 
  const inputHandler = (text, key,dene)=>{
   
   

   
    //console.log(inputs)
    console.log(_inputs[key].value.getItem)
  }
  
  const addFirestore=(text,key,dene)=>{
    {inputs.map((item) => Firebase.firestore().collection("Deneme").doc(item.value)
    .onSnapshot((doc) => {
      const _inputs = [...inputs];
      _inputs[key].value = text;
      _inputs[key].key   = key;
      setInputs(_inputs);
      console.log("Current data: ", doc.dene);
    _inputs[key].dene   = doc.dene;
    })
    )}
    
    var washingtonRef = Firebase.firestore().collection("Bakod").doc(getValue).set( { İçerik: inputs})
    console.log('text',text)
    
  }
 
//ekleme çıkartma işlemleri 
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:20}}>{getValue}</Text>
      <ScrollView style={styles.inputsContainer}>
      {inputs.map((input, key)=>(
        <View style={styles.inputContainer}>
          <TextInput placeholder={"İçerik ekleyiniz.. "} value={input.value}  onChangeText={(text)=>inputHandler(text,key)}/>
          <View>
          <TouchableOpacity onPress = {addHandler}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity> 
          </View>
    
          <TouchableOpacity onPress = {()=> deleteHandler(key)}>
          <AntDesign name="minuscircleo" size={24} color="black" />
          </TouchableOpacity>
          
        </View>
      ))}
      </ScrollView>
      
      
      
      <Button style={{backgroundColor:'#36405f'}} title="GÖNDER" onPress={addFirestore} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height:"7%",
    backgroundColor: '#c2d6ec'
  },
  inputsContainer: {
    flex: 1, marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  },
 
})
// scrollview un altındaydı normalde // <Button title="Add" onPress={addHandler} />
export default addBarkod;