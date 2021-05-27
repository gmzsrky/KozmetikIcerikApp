import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useCallback} from "react";

import { TouchableOpacity,View,Text, Modal,FlatList,ScrollView} from 'react-native';
import { StyleSheet} from 'react-native';
import { Card, Button, Icon,SearchBar} from 'react-native-elements';
import Firebase from '../config/firebase'
import { Entypo } from '@expo/vector-icons'; 
import Product from './Product';
import { AntDesign } from '@expo/vector-icons';

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const productHome = ({ list }) => { 

  const [x,setx]=useState([]);
  const [productvisible, setProductVisible] = useState(false);


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
              <TouchableOpacity
              style={[styles.button]}
              onPress={() =>closeModal()}
            >
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
           <FlatList
                data={x}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => listeleme(item)}
                contentContainerStyle={{ flex: 1 }}
            />
            </ScrollView>
          </Modal>



          <TouchableOpacity onPress={()=>productPage()}>
         <Card style={styles.card}>
        <Card.Title style={{fontSize:23}}>{list.urunAdi}</Card.Title>
        <Card.Divider/>
        <Card.Image style={{resizeMode: 'cover'}} source={require('../assets/yuuz.jpg')}>
        <Text style={{marginBottom:"40%"}}></Text>
          <Button
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
      }
    });
    

export default productHome; 