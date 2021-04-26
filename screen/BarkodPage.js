import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Alert,Modal,AsyncStorage  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Firebase from '../config/firebase'
import AddBarkod from "../components/addBarkod";

const BarkodPage = () =>  {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataa, setdataa] = useState("");
  const [addBarkod, setBarkod] = useState(false);

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
        })
      })

  // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

        <Modal
            animationType="slide"
            visible={addBarkod}
          >
            <AddBarkod/>
         </Modal>



      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});


export default BarkodPage;