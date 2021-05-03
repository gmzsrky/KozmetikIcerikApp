import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView,AsyncStorage,Modal,FlatList } from 'react-native'
import Firebase from '../config/firebase';
import { AntDesign } from '@expo/vector-icons';
import Product from "../components/product";
const addBarkod = ()=>{

  const [productvisible, setProductVisible] = useState(false);
  const [getValue, setGetValue] = useState('');
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [x,setx]=useState([]);
  const [y,sety]=useState("");
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
    _inputs.push({key: '', value: ''});
    setInputs(_inputs);
  }
  
  const deleteHandler = (key)=>{
    const _inputs = inputs.filter((input,index) => index != key);
    setInputs(_inputs);
  }
 
  const inputHandler = (text, key)=>{
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key   = key;
    setInputs(_inputs);
    //console.log(inputs)
  }
  const addFirestore=(text,key)=>{

    const food=[...x];
    const ref =  Firebase.firestore().collection('Bakod');
    const getDoc = ref.doc(getValue)
    .onSnapshot(doc => {
      const data = doc.data().icerik;

      {data.map((item) => Firebase.firestore().collection("Deneme").where("name", "==", item.value)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
         food.push({
           ...documentSnapshot.data()
          });
        });
      }));
      
      }
    });

    setx(food);
    console.log("aaaaa",food)

    var washingtonRef = Firebase.firestore().collection("Bakod").doc(getValue).set( { icerik: inputs}) 
    .then(() => setProductVisible(true))
    .catch(error => alert(error))
  }

        renderList = (list) => {
          return  <Product list={list}/>
        };

 
//ekleme çıkartma işlemleri 
  return (
    <View style={styles.container}>

        <Modal
            animationType="slide"
            visible={productvisible}
          >
           <FlatList
                data={x}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderList(item)}
                contentContainerStyle={{ flex: 1 }}
            />
          </Modal>

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