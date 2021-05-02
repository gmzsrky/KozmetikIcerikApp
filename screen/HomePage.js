import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useCallback} from "react";
import { ScrollView } from 'react-native';
import { TouchableOpacity,FlatList,Text, View,Image} from 'react-native';
import { StyleSheet} from 'react-native';
import { Card, Button, Icon,SearchBar} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'; 

import Firebase from '../config/firebase'



//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const HomePage = () => { 
  const [search, setsearch] = useState("");
  updateSearch = (search) => {
    setsearch( search );

  };

  renderList = (list) => {
    return <Text style={{marginBottom: 10}}>{list.urun}</Text>
  };

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
  <ScrollView style={styles.container}>
      
      <TouchableOpacity style={styles.searchBar}>
      <SearchBar
        platform="ios"  // ios , default, android
        placeholder="Ürün ismi giriniz.."
        onChangeText={updateSearch}
        value={search}
      />
      </TouchableOpacity>


     <Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>YÜZ BAKIMI</Card.Title>
  <Card.Divider/>
  <Card.Image style={{resizeMode: 'cover'}} source={require('../assets/yuuz.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#36405f',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
</Card>


<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>SAÇ BAKIMI</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/sac.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#36405f',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' 
      />
  </Card.Image>
</Card>
 


<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>KİŞİSEL BAKIM</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/kisiselbakim.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#36405f',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
</Card>




<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>PARFÜM DEODORANT</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/parfum.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#36405f',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
</Card>





<Card style={styles.card}>
  <Card.Title style={{fontSize:23}}>GÜNEŞ ÜRÜNLERİ</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/gunes.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Entypo name="chevron-right" size={24} color="white" />}
      buttonStyle={{backgroundColor:'#36405f',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='ÜRÜNLERİ GÖSTER' />
  </Card.Image>
</Card>


              <FlatList
                data={x}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderList(item)}
                contentContainerStyle={{ flex: 1 }}
            />




      <StatusBar style="auto" />
    </ScrollView>
    
    
  );

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    
  },
  searchBar:{
    width:"96%",
    marginTop:"14%",
    marginBottom:"7%",
    marginLeft:"2%",
    marginRight:"2%"

  },
  card:{
    alignItems:"center",
    justifyContent:"center"
  }
});

export default HomePage; 