import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, Image, StatusBar, ScrollView } from 'react-native';
function AddMember({ navigation,route }) {
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const[password,setPassword]=useState("")
    const showDatePicker = () => {
        setStartVisible(true);
    };
    var InsertMember = (name,contact,mid,cid) => {
        var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/SaveCommitteeMember`;
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        var Data = {
          CId:cid,
          MId:mid,
          CMName:name,
          CMContact:contact,
          Status:'Pending'
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
            console.log(response);
          })
          .catch((error) => {
            alert("Error :" + error);
          })
    }
    var InsertData = () => {
        if (name.length == 0 || contact.length == 0 || password.length == 0) {
            alert("Required Field is missing!");
        } else {
            var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/SaveMember`;
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            var Data = {
                MName: name,
                MPhone: contact,
                MPassword:password
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
                        InsertMember(name,contact,response.toString(),route.params.cid);
                        alert('Member added successfully');
                })
                .catch((error) => {
                    alert("Error :" + error);
                })
        }
    }
    return (
        <ScrollView contentContainerStyle={myStyle.container}>
            <StatusBar backgroundColor="black" />
            <Image style={myStyle.img} source={require('../PartyImages/com.jpg')}></Image>
            <Text style={myStyle.Welcome} >Add Member!</Text>
            <Text style={{alignSelf:'flex-start',marginLeft:20}}>Enter Member Name</Text>
            <TextInput style={myStyle.input} onChangeText={(nm) => setName(nm)} />

            <Text style={{alignSelf:'flex-start',marginLeft:20}}> Enter Member Contact</Text>
            <TextInput style={myStyle.input} onChangeText={(con) => setContact(con)} />

            <Text style={{alignSelf:'flex-start',marginLeft:20}}> Enter Member Password</Text>
            <TextInput secureTextEntry style={myStyle.input} onChangeText={(p) => setPassword(p)} />

            <TouchableOpacity style={myStyle.userBtn} onPress={() =>InsertData()}>
            <Text style={myStyle.btnText}>Save Member</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
export default AddMember;
const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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
        marginLeft: 20,
        padding: 7,
        color: 'black',
        borderColor: '#08d4c4',
        borderBottomWidth: 2,
    },
    userBtn: {
        backgroundColor: '#08d4c4',
        padding: 11,
        marginTop:10,
        width: '90%',
        borderRadius: 25

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
        resizeMode: "stretch"
    },
})






