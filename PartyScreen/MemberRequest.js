import React, { useState, useEffect } from 'react'
import { FlatList, View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native'
export const MemberRequest = () => {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllMember = () => {
    const url = `http://${mp}/KittyPartyApi/api/Party/AllPending?mid=${foo}`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((response) => {
        if (response === "false") {
          alert('No Request for committee')
        } else {
          response.forEach(element => {
            setData2(data2 => [...data2,
            {
              MName: element.CMName,
              MPhone: element.CMContact,
              MId: element.MId,
            }
            ]);
          });
          setLoading(false);
        }
      })
      .catch((error) => { alert(error) })
  }
  const approveMember = (id) => {
    var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/UpdateStatus`;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      MId: id,
      Request: 'Approved'
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
        alert(response);
        const newData = [...data2];
        const prevIndex = data2.findIndex(item => item.MId == id);
        newData.splice(prevIndex, 1);
        setData2(newData)
      })
      .catch((error) => {
        alert("Error :" + error);
      })
  }
  const deleteMember = (id) => {
    var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/UpdateStatus`;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      MId: id,
      Request: 'Rejected'
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
        alert(response);
        const newData = [...data2];
        const prevIndex = data2.findIndex(item => item.MId == id);
        newData.splice(prevIndex, 1);
        setData2(newData)
      })
      .catch((error) => {
        alert("Error :" + error);
      })

  }
  useEffect(() => { getAllMember(); }, []);
  return (
    <FlatList style={{ backgroundColor: '#fff', padding: 6 }}
      data={data2}
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => {
        return <View style={myStyle.card}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 15, color: '#000', flex: 1, fontWeight: 'bold', fontFamily: 'fantasy' }}>Name </Text>
            <Text style={myStyle.text}> {item.MName} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 15, color: '#000', flex: 1, fontWeight: 'bold', fontFamily: 'fantasy' }}> Contact</Text>
            <Text style={myStyle.text}> {item.MPhone} </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
            <TouchableOpacity style={{ backgroundColor: 'red', width: '40%', textAlign: 'center' }} onPress={() => deleteMember(item.MId)}><Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Reject</Text></TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'green', width: '40%', textAlign: 'center' }} onPress={() => approveMember(item.MId)}><Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Approve</Text></TouchableOpacity>
          </View>
        </View>
      }} />
  )
}
const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    fontSize: 15,
    color: '#000',
    textAlign: 'right',
    marginTop: 5,
    flex: 1,
    fontFamily: 'fantasy'
  },
  card: {
    marginTop: 5,
    borderRadius: 10,
    padding: 15,
    margin: 2,
    backgroundColor: '#dee0e3',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.00,
    elevation: 2,
  },
  Welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: -50,
    fontFamily: 'fantasy'
  },
  userBtn: {
    backgroundColor: 'white',
    padding: 8,
    width: '97%',
    borderRadius: 15,
    alignSelf: 'center',
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderColor: '#fb2525',
    marginTop: 5
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
    fontSize: 20,
    color: 'black',
    fontFamily: 'fantasy'
  },
  btnText2: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'fantasy'
  },
})
