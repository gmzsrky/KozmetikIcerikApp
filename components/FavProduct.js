import React, { useState } from "react";
import { View, Text, StyleSheet,} from "react-native";
import { ListItem, Avatar } from 'react-native-elements'

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const FavProduct = ({ list }) => {

  return (
    <View>
    <Text>{list.name}</Text>
        <ListItem  bottomDivider>
          <ListItem.Content>
          </ListItem.Content>
        </ListItem>
    
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
  
});

export default FavProduct;