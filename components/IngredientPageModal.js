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
            <ListItem.Title>{list.name}</ListItem.Title>
            <ListItem.Subtitle>{list.i1}</ListItem.Subtitle>
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
  
});

export default IngredientPageModal;