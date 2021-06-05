import React, { useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import { ListItem, Avatar } from 'react-native-elements'
//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const IngredientPageModal = ({ list }) => {


  return (
    <View>
    {

        <ListItem  bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{list.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>{list.i1}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
    }
  </View>
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
    paddingLeft:"5%",
    justifyContent:"space-between",
    justifyContent:"center",
    alignContent:"center",
    flexDirection:"row"
  },
  searchBar:{
    width:"96%",
    marginTop:"3%",
    marginBottom:"7%",
    marginLeft:"2%",
    marginRight:"2%",
  },
  title:{
    width:'100%',
    color:"white",
    backgroundColor:"#4e84aa",
    opacity:0.70,
    borderRadius:4,
    padding:"3%",
    marginBottom:"3%",
    marginTop:'1%',
    marginLeft:"1%",
    textAlign:'center',
    

  },
  subtitle:{
    marginTop:'4%',
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:'14%',
  }
  
});

export default IngredientPageModal;