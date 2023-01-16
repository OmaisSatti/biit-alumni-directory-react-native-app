import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text,ScrollView,TouchableOpacity} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {DataTable } from 'react-native-paper';
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
const SelectMembers = ({navigation}) => {
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
  const saveMember=()=>{
    const selectedList = data2.filter(item => item.Selected == true);
    if(selectedList.length<2){
      alert('please select at least two member')
      return;
    }else{
      const total=selectedList.length;
      navigation.navigate('AddParty',{total:selectedList.length,list:selectedList});
    }
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
                     {/* <CheckBox disabled={false} tintColors='black' value={toggleCheckBox} onValueChange={(newValue) => setToggleCheckBox(newValue)} /> */}
                  <CheckBox
                  checkedColor={'#3EB489'}s
                  checked={result.Selected}
                  disabled={result.Disabled}
                  onPress={() =>onChangeValue(result)}
                  />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
            <TouchableOpacity style={styles.userBtn} onPress={() =>saveMember()}>
              <Text style={styles.btnText}>Add Members</Text>
            </TouchableOpacity>
          </ScrollView >
        </ScrollView>
      }
    </ScrollView>
  )
}
export default SelectMembers;
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
});

