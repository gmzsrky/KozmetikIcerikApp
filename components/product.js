import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable,} from "react-native";
import { Card, Badge,} from 'react-native-elements';


//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const Product = ({ list }) => {


const [sayac,setSayac]=useState(0);

console.log(list.i2);

  return (
        <Card style={styles.card}>
        <Card.Title style={{fontSize:23}}>{list.name}</Card.Title>
        <Text style={styles.text}>{list.i2.toUpperCase()}</Text>
        <Card.Divider/>
        <Text style={{marginBottom:"4%"}}>FONKSİYON: {list.fonksiyon}</Text>
        <Text style={{marginBottom:"4%"}}>İRİTASYON: {list.irite}</Text>
        <Text style={{marginBottom:"4%"}}>KOMEDOJENİK: {list.akne}</Text>
        <Text style={{marginBottom:"4%"}}>ZARAR MİKTARI: {list.dene}</Text>
        </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    
  },
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
  card:{
    alignItems:"center",
    justifyContent:"center"
  },
  text:
  {
    justifyContent:"center",
    textAlign:"center"
  }
});

export default Product;