import * as React from 'react';
import { View, Text,Button,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 function HomeScreen() {
  return (
    <View style={myStyle.container}>
      <Text style={myStyle.Welcome}>Welcome to Home Screen</Text>
    </View>
  );
}
export default HomeScreen;