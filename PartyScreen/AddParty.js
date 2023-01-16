import React, { useState,useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, Image, StatusBar, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
function AddParty({ navigation,route }) {
  const [name, setName] = useState("")
  const [type, setType] = useState("Bidding")
  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [contact, setContact] = useState("")
  const [sTime, setSTime] = useState("Start Date")
  const [member, setMember] = useState("0")
  const [dTime, setDTime] = useState("Draw Date")
  const [perPerson, setPerPerson] = useState("0");
  const [amount, setAmount] = useState()
  const showDatePicker = () => {
    setStartVisible(true);
  };

  const hideDatePicker = () => {
    setStartVisible(false);
  };

  const handleConfirm = (date) => {
    setSTime(date);
    hideDatePicker();
  };

  const showDatePicker2 = () => {
    setEndVisible(true);
  };

  const hideDatePicker2 = () => {
    setEndVisible(false);
  };

  const handleConfirm2 = (date) => {
    setDTime(date);
    hideDatePicker2();
  };
  const setPayment=(am)=>{
    let amu=am/member;
    setPerPerson(amu.toString());
  }
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
        CMContact:contact
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
    if (name.length == 0 || contact.length == 0 || type.length == 0 || amount.length == 0 || member.length == 0 || sTime == "Start Date" || dTime == "Draw Date" || perPerson.length == 0) {
      alert("Required Field is missing!");
    } else {
      var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/SaveCommittee`;
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var Data = {
        Name: name,
        Contact: contact,
        Amount: amount,
        Member: member,
        Type: type,
        StartDate: moment(sTime).format("MM-DD-YYYY"),
        DrawDate: moment(dTime).format("MM-DD-YYYY"),
        PerPerson: perPerson,
        OwnerId:foo,
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
          var lst=route.params.list;
          lst.forEach(element => {
            console.log(element)
            InsertMember(element.MName,element.MPhone,element.MId,response.toString())
          });
           alert('Committee Added successfully');
           setName('');
           setContact('');
           setMember('');
           setAmount('');
           setPerPerson('');
           setSTime("Start Date");
           setDTime("Draw Date");
        })
        .catch((error) => {
          alert("Error :" + error);
        })
    }
  }
  var check=()=>{
    var lst=route.params.list;
    lst.forEach(element => {
      console.log(element)
      InsertMember(element.MName,element.MPhone,element.MId,response.toString())
    });
    alert('Committee Added successfully');
  }
  useEffect(() => {setMember(route.params.total.toString())},[])
  return (
    <ScrollView contentContainerStyle={myStyle.container}>
      <StatusBar backgroundColor="black" />
      <Image style={myStyle.img} source={require('../PartyImages/committe2.jpg')}></Image>
      <Text style={myStyle.Welcome} >Add Committee!</Text>
      <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'baseline' }}>
        <Text>Name</Text>
        <TextInput style={myStyle.input} onChangeText={(nm) => setName(nm)} />
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'baseline' }}>
        <Text>Contact</Text>
        <TextInput style={myStyle.input} onChangeText={(con) => setContact(con)} />
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'baseline' }}>
        <Text>Amount</Text>
        <TextInput style={myStyle.input} onChangeText={(am) => {setAmount(am),setPayment(am)}} />
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'baseline' }}>
        <Text>Member</Text>
        <TextInput  value={member} style={myStyle.input}/>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'baseline' }}>
        <Text>PerPerson</Text>
        <TextInput style={myStyle.input}  value={perPerson} editable={false} onChangeText={(pr) => setPerPerson(pr)} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: 40, marginTop: 15 }}>Type</Text>
        <Picker style={{ width: '70%' }} onValueChange={(txt) => setType(txt)}>
          <Picker.Item label="Bidding" value="Bidding" />
          <Picker.Item label="Sequential" value="Sequential" />
          <Picker.Item label="Random" value="Random" />
        </Picker>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ width: '40%', marginTop: 15, fontSize: 15, fontFamily: 'fantasy' }}>
          {
            sTime == "Start Date" ? (sTime) : (moment(sTime).format("MM-DD-YYYY"))
          }
        </Text>
        <Icon.Button onPress={showDatePicker} style={{ marginLeft: 120 }} name="md-calendar-outline" backgroundColor='white' color='red' size={30}></Icon.Button>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ width: '40%', marginTop: 15, fontSize: 15, fontFamily: 'fantasy' }}>
          {
            dTime == "Draw Date" ? (dTime) : (moment(dTime).format("MM-DD-YYYY"))
          }
        </Text>
        <Icon.Button onPress={showDatePicker2} style={{ marginLeft: 120 }} name="md-calendar-outline" backgroundColor='white' color='red' size={30}></Icon.Button>
      </View>
      <DateTimePickerModal
        isVisible={startVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={endVisible}
        mode='date'
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
      />
      <TouchableOpacity style={myStyle.userBtn} onPress={() => InsertData()}>
        <Text style={myStyle.btnText}>Save Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
export default AddParty;
const myStyle = StyleSheet.create({
  container: {
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
    width: '70%',
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
    width: '80%',
    borderRadius: 25,
    marginTop:5,
    marginBottom:8

  },
  btnContainer: {
    flexDirection: 'column',
    width: '90%',
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
    width: 70,
    height: 70,
    borderRadius: 60,
    resizeMode: "stretch"
  },
})