import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,AsyncStorage,Modal,FlatList,Pressable,ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Firebase from '../config/firebase';
import SelectPicker from 'react-native-form-select-picker';
import Product from "./Product";
import { Ionicons } from '@expo/vector-icons'; 
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const options = ["Yüz Bakımı", "Saç Bakımı", "Kişisel Bakım","Parfüm Deodorant","Güneş Ürünleri"];
//import PickerExample from './PickerExample.js' /*açılır kapanır şey  */
const addBarkod = ()=>{

  const [productvisible, setProductVisible] = useState(false);
  const [getValue, setGetValue] = useState('');
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [x,setx]=useState([]);
  const [urunAdi, onChangeText] = useState("");
  const [selected, setSelected] = useState("");
  const [productName, setProductName] = useState("");

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
      setProductName(doc.data().urunAdi);
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
    var washingtonRef = Firebase.firestore().collection("Bakod").doc(getValue).set( { icerik: inputs}) 
    .then(() => setProductVisible(true))
    .catch(error => alert(error))


    var Ref = Firebase.firestore().collection('Bakod').doc(getValue);

    var setWithMerge = Ref.set({
        urunAdi:urunAdi,
        kategori:selected,
    }, { merge: true });
  }


  renderList = (list) => {
    return  <Product list={list}/>
  };

  closeModal = () => {
    setProductVisible(false);
  };
//ekleme çıkartma işlemleri 
  return (
    <ImageBackground style={{flex: 1, opacity: 0.8,}}  source={require('../assets/addb.jpg')}>
    <View style={styles.container}>
      <ScrollView>

        <Modal
        // style={{marginTop:22,backgroundColor:"#c2d6ec"}}
            animationType="slide"
            visible={productvisible}
            onRequestClose={()=>closeModal()}
          >
            <ScrollView>
            <View style={styles.middle} >
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>closeModal()}
            >
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>{productName}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:"3%"}}>
           <Badge value="1" status="success"/>
           <Badge value="2" status="success"  />
           <Badge value="3" status="warning"  />
           <Badge value="4" status="warning"  />
           <Badge value="5" status="error"  />
           </View>
           <View style={{flexDirection:"row",justifyContent:"space-around"}}>
           <Text>Temiz   </Text>
           <Text>İyi</Text>
          <Text>İdare Eder</Text>
          <Text>Kötü</Text>
          <Text>Zararlı</Text>
           </View>
           <FlatList
                data={x}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderList(item)}
                contentContainerStyle={{ flex: 1 }}
            />
          </ScrollView>
         </Modal>

                


      <Text style={{fontWeight:'bold',fontSize:33,color:'#1B456B',textAlign:'center'}}>{getValue}</Text>

        <View > 
        <View style={styles.üst}>
        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={urunAdi}
        placeholder="Ürün Adını Giriniz..."
      />
      </View> 
       <View style={styles.üst}>
      <SelectPicker 
      placeholder={"Seçim yapınız"}
      onValueChange={(value) => {
        // Do anything you want with the value. 
        // For example, save in state.
        setSelected(value);
      }}
      selected={selected}
      >
     

      {Object.values(options).map((val, index) => (
        <SelectPicker.Item label={val} value={val} key={index} />
      ))}

      </SelectPicker>
      </View>  
      </View>
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
    
    <TouchableOpacity  style={styles.gonder} onPress={addFirestore}>
        <Text style={styles.gonderText}> GÖNDER </Text>
      </TouchableOpacity>
      </ScrollView>
      </ScrollView>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height:"7%",
    backgroundColor: '#c2d6ec',
    
  },
  inputsContainer: {
    flex: 1, marginBottom: 20,
    
  },
  üst:{ 
  color:'white',
  opacity: 0.8,
  backgroundColor:"white",
  borderRadius:3,
  textAlign:"center",
  padding:6,
  fontSize:12,
  fontWeight:"bold",
  marginTop:'7%',
  alignItems: 'center',
  

 


  },
  inputContainer: {
  color:'white',
  opacity: 0.8,
  backgroundColor:"white",
  borderRadius:3,
  textAlign:"center",
  padding:6,
  fontSize:12,
  fontWeight:"bold",
  marginTop:'7%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding:'4%',
   
   
  },
  button: {
    flexDirection:"row-reverse",
   },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
   
  },
  input:{
   
    marginTop:'4%',
    marginLeft:'2.5%',
    fontWeight:'bold',
    

  },
  gonder:{
    width:'99%',
    backgroundColor:"#1B456B",
    borderRadius:7,
    alignItems:"center",
    marginTop:"7%",
    marginBottom:"5%",
   

  },
  gonderText:{
    marginTop: 15,
    color:"#FFFF",
    paddingBottom:'4%',
    textAlign:'center',
    fontSize:19,
    fontWeight:"bold",
  },
  middle: {
    height:"20%",
    backgroundColor: "#ff9774",
    borderBottomRightRadius: 40,
    borderTopLeftRadius:40,
  },
  text:{
  alignSelf:'center' ,
  color:"white",
  fontWeight:'bold',
  fontSize:30,
  }
   
    
 
})
// scrollview un altındaydı normalde // <Button title="Add" onPress={addHandler} />
export default addBarkod;