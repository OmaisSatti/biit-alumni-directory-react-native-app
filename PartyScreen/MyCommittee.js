import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator,Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
const MyCommittee = ({navigation,route}) => {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const myData = {
    tableHead: ['Name', 'Contact','PerPerson'],
  }
  const getAllMember = () => {
    const url = `http://${mp}/KittyPartyApi/api/Party/AllMyCommittee?mid=${foo}`;
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
            PerPerson:element.PerPerson,
            Amount:element.Amount
          }
          ]);
          tableData.push([element.CMName, element.CMContact,element.PerPerson]);
        });
        setLoading(false);
      })
      .catch((error) => { alert(error) })
  }
  const totalSum=()=>{
    const sum = data2.map(item => item.PerPerson).reduce((prev, curr) => prev + curr, 0);
    return sum;
  }
  useEffect(() => { getAllMember(); }, []);
  const [data, setData] = useState(myData);
  return (
    <ScrollView style={styles.container}>
      {loading === true ?
        <ActivityIndicator color='Red' size={30} />
        :
        <View style={styles.container}>
        <Text style={styles.Welcome}>Monthly Amount Details</Text>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row data={data.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
          <TableWrapper style={styles.wrapper}>
            <Col data={data.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
            <Rows data={tableData} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>
        <Text style={{fontWeight:'bold',fontFamily:'fantasy',marginTop:10}}>{`Total Amount To be paid monthly ${totalSum()}`}</Text>
       </View>
      }
    </ScrollView>
  )
}
export default MyCommittee;
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
  }
});

