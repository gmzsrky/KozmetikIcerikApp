import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable,} from "react-native";
import { AntDesign } from "../node_modules/@expo/vector-icons";

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const product = ({ list }) => {

  return (
   
    <View>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>closeModal()}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
      <View
        style={[styles.listContainer]}
      >
        <View style={{flexDirection:"row", backgroundColor:"#adcceb"}}>
         
          <Text style={styles.listTitle} >
            Name:{list.name}
          </Text>
          <Text style={styles.listTitle} >
            Dene:{list.dene}
          </Text>
          <Text style={styles.listTitle}>
            Fonksiyon:{list.fonksiyon}
          </Text>
        </View>  
      </View>
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

export default product;