import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useCallback} from "react";
import { ScrollView } from 'react-native';
import { TouchableOpacity,FlatList,Text, View,Image} from 'react-native';
import { StyleSheet} from 'react-native';
import { Card, Button, Icon,SearchBar} from 'react-native-elements'

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
        placeholder="Ürün ismi giriniz.."
        onChangeText={updateSearch}
        value={search}
      />
      </TouchableOpacity>


     <Card style={styles.card}>
  <Card.Title>HELLO WORLD</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/on.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' />
  </Card.Image>
</Card>


<Card style={styles.card}>
  <Card.Title>HELLO WORLD</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/on.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' />
  </Card.Image>
</Card>
 


<Card style={styles.card}>
  <Card.Title>HELLO WORLD</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/on.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' />
  </Card.Image>
</Card>




<Card style={styles.card}>
  <Card.Title>HELLO WORLD</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/on.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' />
  </Card.Image>
</Card>





<Card style={styles.card}>
  <Card.Title>HELLO WORLD</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../assets/on.jpg')}>
  <Text style={{marginBottom:"40%"}}></Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' />
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
    marginTop:"13%",
    width:"100%"

  },
  card:{
    alignItems:"center",
    justifyContent:"center"
  }
});

export default HomePage; 