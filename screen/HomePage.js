import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useCallback} from "react";
import { ScrollView } from 'react-native';
import { TouchableOpacity,FlatList,Text, Modal,Pressable,ImageBackground} from 'react-native';
import { StyleSheet} from 'react-native';
import { Card, Button, Icon,SearchBar} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import Firebase from '../config/firebase'
import ProductHome from "../components/productHome"


//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const HomePage = () => { 
  const [search, setsearch] = useState("");
  const [urun, setUrun] = useState([]);
  const [modal, setModal] = useState(false);
  updateSearch = (search) => {
    setsearch( search );

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
          </Modal>


      
      <TouchableOpacity style={styles.searchBar}>
      <SearchBar
        platform="ios"  // ios , default, android
        placeholder="Ürün ismi giriniz.."
        onChangeText={updateSearch}
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
    marginTop:"21%",
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
});

export default HomePage; 