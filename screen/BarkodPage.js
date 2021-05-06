import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Alert,Modal,AsyncStorage,FlatList ,Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Firebase from '../config/firebase'
import AddBarkod from "../components/addBarkod";
import Product from "../components/product";
const BarkodPage = () =>  {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataa, setdataa] = useState("");
  const [addBarkod, setBarkod] = useState(false);
  const [productvisible, setProductVisible] = useState(false);
  const [x,setx]=useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const saveValueFunction = () => {
      AsyncStorage.setItem('key', data);
      setdataa("")
      setBarkod(true);
    } 

    const productPage=()=>{
      
    const food=[...x];
    const ref =  Firebase.firestore().collection('Bakod');
    const getDoc = ref.doc(data)
    .onSnapshot(doc => {
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
    });

    setx(food);
    console.log("aaaaa",food)
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
      
  closeModal = () => {
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>closeModal()}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <AddBarkod/>
          
            
         </Modal>
         <Modal
            animationType="slide"
            visible={productvisible}
             onRequestClose={()=>closeModal()}
          >
           <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>closeModal()}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
           <FlatList
                data={x}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderList(item)}
                contentContainerStyle={{ flex: 1 }}
            />
          </Modal>



      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(true)} />}
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
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});


export default BarkodPage;