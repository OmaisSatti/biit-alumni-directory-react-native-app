import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator,Text, ScrollView, TextInput, Pressable,TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {DataTable } from 'react-native-paper';
const DrawCommittee = ({navigation,route}) => {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const myData = {
    tableHead: ['Name', 'Contact','PerPerson','Amount'],
  }
  const getAllMember = () => {
    setData2([]);
    const url = `http://${mp}/KittyPartyApi/api/Party/AllCommitteeMember?cid=${route.params.cid}`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((response) => {
        response.forEach(element => {
          setData2(data2 => [...data2,
          {
            CMName: element.CMName,
            CMContact: element.CMContact,
            MId:element.MId,
            Status:element.Status,
          }
          ]);
          tableData.push([element.CMName, element.CMContact,route.params.per,route.params.amount]);
        });
        setLoading(false);
      })
      .catch((error) => { alert(error) })
  }
  const showData = () => {
    console.log(tableData);
  }
  useEffect(() => { getAllMember(); }, []);
  const [data, setData] = useState(myData);
  const DrawCommittee = () => {
    getAllMember();
    const url = `http://${mp}/KittyPartyApi/api/Party/DrawCommittee?cid=${route.params.cid}`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((response) => {
          if(response.toString()=='false'){
            alert('Nothing to draw');
          }else{
            alert(response.toString());
            getAllMember();
          }
      })
      .catch((error) => { alert(error) })
  }
  const getRandom=()=>{
    const a = Math.floor(Math.random() * (data2.length)) + 0;
    alert(data2[a].CMName);
  }
  return (
    <ScrollView style={styles.container}>
      {loading === true ?
        <ActivityIndicator color='Red' size={30} />
        :
        <View style={styles.container}>
        <Text style={styles.Welcome}>{route.params.name}</Text>
        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title >Contact</DataTable.Title>
          <DataTable.Title>PerPerson</DataTable.Title>
          <DataTable.Title >Amount</DataTable.Title>
        </DataTable.Header>
        {data2.map((result, idx) => (
          <DataTable.Row key={idx} style={{marginTop:5, backgroundColor:`${result.Status=="Draw"?'yellow':''}`}}>
              <DataTable.Cell>{result.CMName}</DataTable.Cell>
              <DataTable.Cell>{result.CMContact}</DataTable.Cell>
              <DataTable.Cell>{route.params.per}</DataTable.Cell>
              <DataTable.Cell>{route.params.amount}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <TouchableOpacity style={styles.userBtn} onPress={() => DrawCommittee()}>
        <Text style={styles.btnText}>Draw</Text>
      </TouchableOpacity>
      </View>
      //   <View style={styles.container}>
      //   <Text style={styles.Welcome}>{route.params.name}</Text>
      //   <Table borderStyle={{ borderWidth: 1 }}>
      //     <Row data={data.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
      //     <TableWrapper style={styles.wrapper}>
      //       <Col data={data.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
      //       <Rows data={tableData} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
      //     </TableWrapper>
      //   </Table>
      //   <TouchableOpacity style={styles.userBtn} onPress={() => DrawCommittee()}>
      //     <Text style={styles.btnText}>Draw</Text>
      //   </TouchableOpacity>
      //  </View>
      }
    </ScrollView>
  )
}
export default DrawCommittee;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  Welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight:'bold',
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
  userBtn: {
    backgroundColor: '#08d4c4',
    padding: 11,
    width: '99%',
    borderRadius: 25,
    marginTop:10

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
});

