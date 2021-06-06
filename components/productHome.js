import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useCallback} from "react";

import { TouchableOpacity,View,Text, Modal,FlatList,ScrollView} from 'react-native';
import { StyleSheet} from 'react-native';
import { Card, Button, Icon,SearchBar} from 'react-native-elements';
import Firebase from '../config/firebase'
import { Entypo } from '@expo/vector-icons'; 
import Product from './product';
import { AntDesign } from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import {  Badge, } from 'react-native-elements';
//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const productHome = ({ list }) => { 

  const [urunler,setUrunler]=useState([]);
  
  const [i3, seti3] = useState("");
  const [productName, setProductName] = useState("");
  const [productvisible, setProductVisible] = useState(false);
  const [heart, setHeart] = useState(false);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  var user = Firebase.auth().currentUser.email;


  useEffect(() => {
    
    Firebase.firestore().collection(user).where("fav", "==", true)
    .onSnapshot((querySnapshot) => {
        var favs = [];
        querySnapshot.forEach((doc) => {
            favs.push(doc.data().name);
        });
        if(favs.indexOf(list.urunAdi)!=-1)
        {
          setHeart(true);
        }
    });
  },[heart,productvisible]);



  const inputHandler = (text)=>{
    if(heart==true){
      setHeart(false);
      Firebase.firestore().collection(user).doc(text).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
    }
    else {
      setHeart(true);
      Firebase.firestore().collection(user).doc(text).set({ fav:true,name:text})
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
      }
    }  

  const productPage=()=>{
    const _Urunler=[...urunler];
   Firebase.firestore().collection('Bakod').where("urunAdi", "==", list.urunAdi)
   .get()
   .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
      const veri = doc.data().icerik;
      setProductName(doc.data().urunAdi);
      seti3(doc.data().i3);
      {veri.map((item) => Firebase.firestore().collection("Deneme").where("name", "==", item.value)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          _Urunler.push({
           ...documentSnapshot.data()
          });
        });
      }));
      
      }
    })});

    setUrunler(_Urunler);
    setProductVisible(true);
    }

    listeleme = (liste) => {
      return  <Product list={liste}/>
    };
  
    return (
        <View>

         <Modal
            animationType="slide"
            visible={productvisible}
             onRequestClose={()=>closeModal()}
          >
            <View style={styles.middle} >
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>closeModal()}
            >
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>{productName.toUpperCase()}</Text>
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
           
          <Text>{i3}</Text>
           <ScrollView>
           <FlatList
           style={{marginTop:"20%"}}
                data={urunler}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => listeleme(item)}
                contentContainerStyle={{ flex: 1 }}
            />
            </ScrollView>
          </Modal>



          <TouchableOpacity>
         <Card style={styles.card}>
         <TouchableOpacity style={{alignItems:'flex-end'}}  onPress={()=>inputHandler(list.urunAdi)}>
        <AntDesign  name={heart ? "heart" : "hearto"}size={24} color="red"/>
        
        </TouchableOpacity>
        <Card.Title style={{fontSize:23}}>{list.urunAdi.toUpperCase()}
               
 
        </Card.Title>
        <Card.Divider/>
        <Card.Image style={{resizeMode: 'cover'}} source={require('../assets/yuuz.jpg')}>
        <Text style={{marginBottom:"40%"}}></Text>
          <Button
           onPress={()=>productPage()}
            icon={<Entypo name="chevron-right" size={24} color="white" />}
            buttonStyle={{backgroundColor:'#36405f',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='ÜRÜNLERİ GÖSTER' />
        </Card.Image>
        </Card>
   </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      listContainer: {
        marginTop: 15,
        borderRadius: 2,
        width: "100%",
        height:60,
        paddingLeft:"5%",
        justifyContent:"space-between",
        justifyContent:"center",
        alignContent:"center"
      },
      listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#634d4d",
        marginBottom: 18,
        paddingLeft:20,
        alignItems:"center",
        
        marginTop:10
      },
      count: {
        fontSize: 48,
        fontWeight: "200",
        color: "#634d4d",
        
      },
      subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "white",
      },
      tinyLogo: {
        width: "20%",
        height: "120%",
      },
      input:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "white",
        borderRadius: 6,
        height: 30,
        marginTop: 8,
        paddingHorizontal: 20,
        fontSize: 18,
        alignSelf: "center",
        width: "45%",
        
      },
      card:{
        alignItems:"center",
        justifyContent:"center"
      },
      headerContainer: {
        marginTop: 50,
        marginHorizontal: 10
      },
      svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
      },
      headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        // change the color property for better output
        color: '#fff',
        textAlign: 'center',
        marginTop: 30
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
      },
      button: {
        flexDirection:"row-reverse",
       },
    });
    

export default productHome; 