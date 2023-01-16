import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, Image, StatusBar } from 'react-native';
function SignupScreen({ navigation }) {
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  var InsertData = () => {
    if (name.length == 0 || password.length == 0 || phoneno.length == 0 || confirm.length == 0) {
      alert("Required Field is missing!");
    } else if (password !== confirm) {
      alert("Both password not match")
    } else {
      var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/SaveMember`;
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var Data = {
        MName: name,
        MPhone: phoneno,
        MPassword: password,
      }
      fetch(InsertApiURL,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        }
      )
        .then((response) => response.json())
        .then((response) => {
          let msg = response.toString();
          if (msg == "true") {
            setConfirm('');
            setPhoneno('');
            setName('');
            setPassword('');
            alert('Account registered successfully');
          } else {
            alert('Account registration failed');
          }
        })
        .catch((error) => {
          alert("Error :" + error);
        })
    }
  }
  return (
    <View style={myStyle.container}>
      <StatusBar backgroundColor="black" />
      <Image style={myStyle.img} source={require('../PartyImages/blue.png')}></Image>
      <Text style={myStyle.Welcome} >Signup Here!</Text>
      <TextInput style={myStyle.input} placeholder="Provide name" placeholderTextColor='#666'
        onChangeText={(name) => setName(name)} />
      <TextInput style={myStyle.input} placeholder="Provide phoneno" placeholderTextColor='#666'
        onChangeText={(ph) => setPhoneno(ph)} />
      <TextInput style={myStyle.input} placeholder="Provide password" placeholderTextColor='#666' secureTextEntry onChangeText={(password) => setPassword(password)} />
      <TextInput style={myStyle.input} placeholder="Confirm Password" placeholderTextColor='#666' secureTextEntry onChangeText={(confirm) => setConfirm(confirm)} />
      <View style={myStyle.btnContainer}>
        <TouchableOpacity style={myStyle.userBtn} onPress={() => InsertData()}>
          <Text style={myStyle.btnText}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={{ color: 'blue', margin: 8, marginTop: 13 }}>Are you ready to login?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SignupScreen;
const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontFamily: 'fantasy',
  },
  input: {
    width: '90%',
    margin: 10,
    padding: 7,
    color:'black',
    borderColor: '#08d4c4',
    borderBottomWidth: 2,
  },
  userBtn: {
    backgroundColor: '#08d4c4',
    padding: 11,
    width: '99%',
    borderRadius: 25

  },
  btnContainer: {
    flexDirection: 'column',
    width: '95%',
    margin: 15,
    justifyContent: 'space-between'
  },
  txtContainer: {
    width: '90%',
    marginLeft: 15,
    justifyContent: 'space-between'
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'fantasy',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 60,
    resizeMode: "cover"
  },
})