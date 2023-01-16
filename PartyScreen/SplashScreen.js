import React, { Component, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, StatusBar, LogBox } from 'react-native';
function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace('LoginScreen');
  }, 3000);
  useEffect(() => {
    LogBox.ignoreLogs(['If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation']);
  }, []);
  return (
    <View style={myStyle.container}>
      <StatusBar hidden={true} />
      <Text style={myStyle.welcome}>Welcome To</Text>
      <Text style={myStyle.txt1}>Kitty Party</Text>
      <Image style={myStyle.img} source={require('../PartyImages/party1.png')}></Image>
      <Text style={myStyle.txt2}>Loading . . .</Text>
    </View>
  );
}
export default SplashScreen;
const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#08d4c4',
    //backgroundColor:'#F2F5CA'
  },
  welcome: {
    fontSize: 31,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'fantasy',

  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 130,
    resizeMode: "cover",
    borderColor: 'black',
    marginLeft: 20,
    borderWidth: 1,
    marginTop: 15
  },
  txt1: {
    fontSize: 21,
    color: 'black',
    marginTop: 12,
    fontFamily: 'fantasy'
  },
  txt2: {
    fontSize: 25,
    color: 'black',
    marginTop: 30,
    fontFamily: 'fantasy'
  }
})