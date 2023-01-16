import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator,Text, ScrollView ,TouchableOpacity} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {DataTable } from 'react-native-paper';
const SelectBid = ({navigation,route}) => {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const myData = {
    tableHead: ['Name','Amount'],
  }
  const getAllMember = () => {
    const url = `http://${mp}/KittyPartyApi/api/Party/AllBids?cid=${route.params.cid}`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((response) => {
        response.forEach(element => {
          setData2(data2 => [...data2,
          {
            BName: element.BName,
            BAmount: element.BAmount,
          }
          ]);
          tableData.push([element.BName,element.BAmount]);
        });
        setLoading(false);
      })
      .catch((error) => { alert(error) })
  }
  useEffect(() => { getAllMember(); }, []);
  const [data, setData] = useState(myData);
  const getSelected=(amount)=>{
      const max = Math.max(...data2.map(o => o.BAmount), 0);
      console.log(max);
      const obj=data2.find(x => x.BAmount==max)?.BName;
      console.log(amount+":"+max)
      if(max==amount){
        return true;
      }else{
        return false;
      }
  }
  return (
    <ScrollView style={styles.container}>
      {loading === true ?
        <ActivityIndicator color='Red' size={30} />
        :
        <View style={styles.container}>
        <Text style={styles.Welcome}>Selected Person For Bid</Text>
        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title >Amount</DataTable.Title>
        </DataTable.Header>
        {data2.map((result, idx) => (
             Math.min(...data2.map(o => o.BAmount))==result.BAmount?
             <DataTable.Row style={{marginTop:5, backgroundColor:'yellow'}}>
             <DataTable.Cell>{result.BName}</DataTable.Cell>
             <DataTable.Cell>{result.BAmount}</DataTable.Cell>
             </DataTable.Row>
             :
             <></> 
        ))}
      </DataTable>
      </View>
      }
      <TouchableOpacity style={styles.userBtn2} onPress={() =>navigation.navigate('AllBidding',{cid:route.params.cid,total:route.params.total})}>
      <Text style={styles.btnText}>Bid Amount</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
export default SelectBid;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  userBtn2: {
    backgroundColor: '#08d4c4',
    padding: 11,
    width: '92%',
    marginTop: 15,
    marginLeft:10,
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
    width: '90%',
    marginTop: 15,
    marginLeft:10,
},
btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'fantasy',
},
});

