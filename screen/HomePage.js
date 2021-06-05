import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useCallback} from "react";
import { ScrollView } from 'react-native';
import { TouchableOpacity,FlatList,Text, Modal,Pressable,ImageBackground,View} from 'react-native';
import { StyleSheet} from 'react-native';
import { Card, Button, Icon,SearchBar} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import Firebase from '../config/firebase'
import ProductHome from "../components/productHome"
import {  Badge, } from 'react-native-elements';

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const HomePage = () => { 
  const [search, setsearch] = useState("");
  const [urun, setUrun] = useState([]);
  const [modal, setModal] = useState(false);
  
  const [productName, setProductName] = useState("");
  const [productvisible, setProductVisible] = useState(false);

  updateSearch = (search) => {
    setsearch( search );
    console.log({search})
  };

  
  listeleme = (liste) => {
    return  <Product list={liste}/>
  };


  closeModal = () => {
    setModal(false);
  };
  renderList = (list) => {
    return  <ProductHome list={list}/>
  };


  const urunPage =(kategoriName)=>{
      console.log("kategori=>",kategoriName)    
      Firebase.firestore().collection("Bakod").where("kategori", "==", kategoriName)
      .get()
      .then((querySnapshot) => {
        const users = [];
          querySnapshot.forEach((doc) => {
            users.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          setUrun(users);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  
      setModal(true);
  } 
  const searchFun=(searchProduct)=>{
    const _Urunler=[...urun];
    Firebase.firestore().collection('Bakod').where("urunAdi", "==", searchProduct)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
       const veri = doc.data().icerik;
       setProductName(doc.data().urunAdi);
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
 
     setUrun(_Urunler);
     setProductVisible(true);

  }

  //firebase
  const [x,setx]=useState("");
  const ref =  Firebase.firestore().collection('Bakod');
          const getDoc = ref.doc("8562354")
          .onSnapshot(doc => {
            const data = doc.data().icerik;

            const privateMessages = [];
            for (const urun in data) {
              privateMessages.push({
                urun:data[urun].urun,
              });
            }

            setx(privateMessages)
          }
          
        ); 
  return (
  <ImageBackground style={{flex: 1, opacity: 0.9,}}  source={require('../assets/home.png')}>
  <ScrollView style={styles.container}>

            <Modal 
            animationType="slide"
            visible={modal}
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
                data={urun}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderList(item)}
                contentContainerStyle={{ flex: 1 }}
            />
            </ScrollView>
          </Modal>

          <Modal
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
           <FlatList
           style={{marginTop:"20%"}}
                data={urun}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => listeleme(item)}
                contentContainerStyle={{ flex: 1 }}
            />
            </ScrollView>
          </Modal>


      
      <TouchableOpacity style={styles.searchBar} >
      <SearchBar
        platform="ios"  // ios , default, android
        placeholder="Ürün ismi giriniz.."
        onChangeText={(text) => searchFun(text)}
        value={search}
      />
      </TouchableOpacity>

<TouchableOpacity onPress={()=>urunPage("Yüz Bakımı")}>
     <Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>YÜZ BAKIMI</Card.Title>
  <Card.Divider/>
  <Card.Image style={{resizeMode: 'cover'}} source={require('../assets/yuuz.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#4e84aa',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
   </Card>
   </TouchableOpacity>


   <TouchableOpacity onPress={()=>urunPage("Saç Bakımı")}>
<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>SAÇ BAKIMI</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/sac.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#4e84aa',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' 
      />
  </Card.Image>
</Card>
</TouchableOpacity>


<TouchableOpacity onPress={()=>urunPage("Kişisel Bakım")}>
<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>KİŞİSEL BAKIM</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/kisiselbakim.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#4e84aa',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
</Card>
</TouchableOpacity>



<TouchableOpacity onPress={()=>urunPage("Parfüm Deodorant")}>
<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>PARFÜM DEODORANT</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/parfum.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#4e84aa',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
</Card>

</TouchableOpacity>




<TouchableOpacity onPress={()=>urunPage("Güneş Ürünleri")}>
<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>GÜNEŞ ÜRÜNLERİ</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/gunes.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#4e84aa',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
</Card>
</TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>
    </ImageBackground>
    
    
  );

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    
  },
  searchBar:{
    width:"96%",
    marginTop:"3%",
    marginBottom:"7%",
    marginLeft:"2%",
    marginRight:"2%",
  },
  card:{
    alignItems:"center",
    justifyContent:"center",
    
  },
  button: {
   flexDirection:"row-reverse",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
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
});

export default HomePage; 