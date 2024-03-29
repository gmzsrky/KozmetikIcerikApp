import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Alert,Modal,AsyncStorage,FlatList } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Firebase from '../config/firebase'
import AddBarkod from "../components/addBarkod";
import Product from "../components/product";
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge,} from 'react-native-elements';

const BarkodPage = () =>  {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataa, setdataa] = useState("");
  const [productName, setProductName] = useState("");
  const [addBarkod, setBarkod] = useState(false);
  const [productvisible, setProductVisible] = useState(false);
  const [array,setArray]=useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  },[]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const saveValueFunction = () => {
      AsyncStorage.setItem('key', data);
      setdataa("")
      setBarkod(true);
    } 

    const productPage=()=>{
      
    const _Array=[...array];
    const ref =  Firebase.firestore().collection('Bakod');
    const getDoc = ref.doc(data)
    .onSnapshot(doc => {
      const veri = doc.data().icerik;
      setProductName(doc.data().urunAdi);
      {veri.map((item) => Firebase.firestore().collection("Deneme").where("name", "==", item.value)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          _Array.push({
           ...documentSnapshot.data()
          });
        });
      }));
      
      }
    });

    setArray(_Array);
    setProductVisible(true);
    }

    var sfDocRef = Firebase.firestore().collection("Bakod").doc(data)
    Firebase.firestore().runTransaction(function(transaction) {
      return transaction.get(sfDocRef).then(function(sfDoc) {
          if (!sfDoc.exists) {
            Alert.alert(
              "Çok Üzgünüz",
              "Maalesef bu ürün bizim veritabanımızda bulunmamaktadır. Eklemek ister misiniz?",
              [
                {
                  text: "Evet",
                  onPress: () => { saveValueFunction(); }
                },
                { text: "Hayır", onPress: () => console.log("Hayır Pressed") }
              ],
              { cancelable: false }
            )
          }
          else{
            productPage();
          }
        })
      })

  // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
      
  const closeModal = () => {
    setProductVisible(false);
    setBarkod(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  renderList = (list) => {
    return  <Product list={list}/>
  };

  return (
    <View style={styles.container}>

        <Modal
            animationType="slide"
            visible={addBarkod}
            onRequestClose={()=>closeModal()}
          >
            
            <ScrollView>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>closeModal()}
            >
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
            <AddBarkod/>
            </ScrollView>
         </Modal>
         
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

           <ScrollView>
           <FlatList
                data={array}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => renderList(item)}
                contentContainerStyle={{ flex: 1 }}
            />
            </ScrollView>
          </Modal>



      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Yeni Bir Ürün Okutunuz'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    flexDirection:"row-reverse",
   },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  middle: {
    height:"15%",
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
});


export default BarkodPage;