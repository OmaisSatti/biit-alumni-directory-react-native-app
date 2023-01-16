import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text,ScrollView,TouchableOpacity, ToastAndroid} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {DataTable } from 'react-native-paper';
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { Toast } from 'native-base';
const InviteMember = ({navigation,route}) => {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [check1, setCheck1] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const myData = {
    tableHead: ['Name', 'Contact'],
  }
  const onChangeValue = (itemSelected) => {
    const newData = data2.map(item => {
      if (item.MId == itemSelected.MId) {
        return {
          ...item,
          Selected: !item.Selected,
        }
      }
      return {
        ...item,
        Selected: item.Selected
      }
    })
    setData2(newData);
  }
  var InsertMember = (name,contact,mid) => {
    var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/InviteMember`;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      CId:route.params.cid,
      MId:mid,
      CMName:name,
      CMContact:contact,
      Request:"Pending"
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
          if(response=="true"){
            ToastAndroid.show("Member invited successfully",ToastAndroid.SHORT);
          }else{
              ToastAndroid.show("Member already added",ToastAndroid.SHORT);
          }
      })
      .catch((error) => {
        alert("Error :" + error);
      })
  }
  const getAllMember = () => {
    const url = `http://${mp}/KittyPartyApi/api/Party/AllMember`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((response) => {
        response.forEach(element => {
          setData2(data2 => [...data2,
          {
            MName: element.MName,
            MPhone: element.MPhone,
            MId: element.MId,
            Selected:element.MId==foo?true:false,
            Disabled:element.MId==foo?true:false,
          }
          ]);
          tableData.push([element.MName, element.MPhone]);
        });
        setLoading(false);
      })
      .catch((error) => { alert(error) })
  }
  useEffect(() => { getAllMember(); }, []);
  const [data, setData] = useState(myData);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading === true ?
        <ActivityIndicator color='Red' size={30} />
        :
        <ScrollView style={styles.container}>
          <Text style={styles.Welcome}>All Member Information!</Text>
          <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title >Contact</DataTable.Title>
                <DataTable.Title >Select</DataTable.Title>
              </DataTable.Header>
              {data2.map((result, idx) => (
                <DataTable.Row key={idx} style={{ marginTop: 5}}>
                  <DataTable.Cell>{result.MName}</DataTable.Cell>
                  <DataTable.Cell>{result.MPhone}</DataTable.Cell>
                  <DataTable.Cell> 
                  <TouchableOpacity style={styles.btnInvite} onPress={() =>InsertMember(result.MName,result.MPhone,result.MId)}>
                      <Text style={styles.inviteText}>Invite</Text>
                  </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView >
        </ScrollView>
      }
    </ScrollView>
  )
}
export default InviteMember;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  userBtn: {
    backgroundColor: '#08d4c4',
    padding: 11,
    width: '95%',
    borderRadius: 25,
    marginTop:5

  },
  btnInvite: {
    backgroundColor: 'blue',
    padding: 11,
    width: '30%',
    borderRadius: 2,
    marginTop:5,
    marginLeft:5

  },
  Welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'fantasy',
  },
  head: {
    height: 28,
    backgroundColor: '#f1f8ff'
  },
  wrapper: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    backgroundColor: '#f6f8fa'
  },
  row: {
    height: 42
  },
  text: {
    textAlign: 'center'
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'fantasy',
  },
  inviteText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'fantasy',
  },
});

