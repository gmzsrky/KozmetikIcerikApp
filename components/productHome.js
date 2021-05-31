import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useCallback} from "react";

import { TouchableOpacity,View,Text, Modal,FlatList,ScrollView} from 'react-native';
import { StyleSheet} from 'react-native';
import { Card, Button, Icon,SearchBar} from 'react-native-elements';
import Firebase from '../config/firebase'
import { Entypo } from '@expo/vector-icons'; 
import Product from './Product';
import { AntDesign } from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import WavyHeader from "../components/WavyHeader";
//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const productHome = ({ list }) => { 

  const [x,setx]=useState([]);
  const [productvisible, setProductVisible] = useState(false);
  const [heart, setHeart] = useState(false);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  var user = Firebase.auth().currentUser.email;


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
    const food=[...x];
   Firebase.firestore().collection('Bakod').where("urunAdi", "==", list.urunAdi)
   .get()
   .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
      const veri = doc.data().icerik;
      {veri.map((item) => Firebase.firestore().collection("Deneme").where("name", "==", item.value)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
         food.push({
           ...documentSnapshot.data()
          });
        });
      }));
      
      }
    })});

    setx(food);
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
            <ScrollView>
            <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={160}
        customTop={130}
        customBgColor="#5000ca"
        customWavePattern="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{list.urunAdi}</Text>
      </View>
           <FlatList
           style={{marginTop:"20%"}}
                data={x}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => listeleme(item)}
                contentContainerStyle={{ flex: 1 }}
            />
            </ScrollView>
          </Modal>



          <TouchableOpacity>
         <Card style={styles.card}>
        <Card.Title style={{fontSize:23}}>{list.urunAdi}
    
          <TouchableOpacity   onPress={()=>inputHandler(list.urunAdi)}>
        <AntDesign name={heart ? "heart" : "hearto"}size={24} color="red"/>
        
        </TouchableOpacity>
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
      }
    });
    

export default productHome; 