
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import TabNavigator from '../navigation/TabNavigator';

const Gecis =(props)=> {
    
  return (
    <View style={styles.container}>
        <TabNavigator style={styles.feed} />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed: {
    flex: 1,
  },
});
export default Gecis;