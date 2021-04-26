
import React, { useState, PropTypes, useEffect}  from 'react';
import {View, Text, StyleSheet,AsyncStorage ,TextInput, Button } from 'react-native';
import Firebase from "../config/firebase";
import { AntDesign } from "../node_modules/@expo/vector-icons";



//disable yellow warnings on EXPO client!
console.disableYellowBox = true;



const addBarkod = props => {

    
  const [getValue, setGetValue] = useState('');
  

  const [textInput, setTextInput] = useState([]);
  const [inputData, setInputData] = useState([]);

    useEffect(() => {
        //function to get the value from AsyncStorage
        AsyncStorage.getItem('key').then(
          (value) =>
            //AsyncStorage returns a promise so adding a callback to get the value
            setGetValue(value)
          //Setting the value in Text
        );
      })

      addTextInput = (index) => {
        var x=[];
        let textInput = textInput;
        x.push(<TextInput style={styles.textInput}
          onChangeText={(text) => this.addValues(text, index)} />);
        setTextInput(x);
      }

      removeTextInput = () => {
        let a = textInput;
        let b = inputData;
        a.pop();
        b.pop();
        setTextInput(a);
        setInputData(b);
      }

      addValues = (text, index) => {
        let dataArray = inputData;
        let checkBool = false;
        if (dataArray.length !== 0){
          dataArray.forEach(element => {
            if (element.index === index ){
              element.text = text;
              checkBool = true;
            }
          });
        }
        if (checkBool){
       setInputData(dataArray)
      }
      else {
        var x=[];
        x.push({'text':text,'index':index});
        setInputData(x)
      }
      }
      
    return(
      <View>
      <View style= {styles.row}>
        <View style={{margin: 10}}>
      <Button title='Add' onPress={() => this.addTextInput(textInput.length)} />
      </View>
      <View style={{margin: 10}}>
      <Button title='Remove' onPress={() => this.removeTextInput()} />
      </View>
      </View>
      {textInput.map((value) => {
        return value
      })}
      <Button title='Get Values' onPress={() => this.getValues()} />
    </View>
  )
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
buttonView: {
flexDirection: 'row'
},
textInput: {
height: 40,
borderColor: 'black', 
borderWidth: 1,
margin: 20
},
row:{
flexDirection: 'row',
justifyContent: 'center'
},
});

export default addBarkod;