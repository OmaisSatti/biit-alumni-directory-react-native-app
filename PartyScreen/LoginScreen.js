import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, Image, StatusBar } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  var FuncLogin = () => {
    var Phone = phone;
    var Password = password;
    if (Phone.length == 0 || Password.length == 0) {
      alert("Required Field is missing!");
    } else {
      var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/LoginMember?phone=${Phone}&password=${Password}`;
      fetch(InsertApiURL,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then((response) => {
          if(response === "false") {
            alert("Incorrect phone or password");
          }else{
            navigation.navigate("KittyParty",{logId:response.MId,logName:response.MName});
          }
        })
        .catch((error) => {
          alert(error);
        })
    }
  }
  return (
    <View style={myStyle.container}>
      <StatusBar backgroundColor="black" />
      <Image style={myStyle.img} source={require('../PartyImages/blue.png')}></Image>
      <Text style={myStyle.Welcome} >Login Here!</Text>
      <TextInput style={myStyle.input} placeholder="Provide phoneno"
        onChangeText={(phone) => setPhone(phone)} placeholderTextColor="#666" />
      <TextInput style={myStyle.input} placeholder="Provide password" secureTextEntry onChangeText={(password) => setPassword(password)} placeholderTextColor="#666" />
      <View style={myStyle.btnContainer}>
        <TouchableOpacity style={myStyle.userBtn} onPress={() =>{FuncLogin()}}>
          <Text style={myStyle.btnText}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("ViewParty")}>
          <Text style={{ color: 'blue', margin: 8, marginTop: 13 }}>Click here ? Join without login</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={{ color: 'blue', margin: 8, marginTop: 13 }}>Sign-up already ? Click to sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default LoginScreen;
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
    color: 'black',
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