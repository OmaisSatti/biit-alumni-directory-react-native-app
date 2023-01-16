import React, { useState, useEffect } from 'react';
import {DataTable } from 'react-native-paper';
import {ScrollView,Text, Touchable,StyleSheet,TouchableOpacity } from 'react-native';
const ViewParty = ({ navigation }) => {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const getAllCommittee = () => {
    setData2([]);
    const url = `http://${mp}/KittyPartyApi/api/Party/SpecificUserCommittee?mid=${foo}`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((response) => {
        if(response!=="false"){
        response.forEach(element => {
          setData2(data2 => [...data2,
          {
            Name: element.Name,
            Contact: element.Contact,
            Type: element.Type,
            Amount: element.Amount,
            ID:element.ID,
            PerPerson:element.PerPerson,
            OwnerId:element.OwnerId,
            BidStatus:element.BidStatus
          }
          ]);
          tableData.push([element.Name, element.Contact, element.Type, element.Amount]);
        });
        setLoading(false);
      }else{
        alert("Not found any committee of this member");
      }
      })
      .catch((error) => { alert(error) })
  }
  const showData=()=>{
    data2.forEach(element => {
      console.log(element.BidStatus);
    });
  }
  useEffect(() => getAllCommittee(), [])
  useEffect(() => showData(), [])
  const handlePress=(result)=>{
    const {ID,Name,Amount,PerPerson,BidStatus,Type}=result;
    if(Type=="Random"){
      navigation.navigate('DrawCommittee',{cid:ID,per:PerPerson,name:Name,amount:Amount,bStatus:BidStatus})
    }else if(Type=="Bidding"){
      navigation.navigate('OnBidding',{cid:ID,per:PerPerson,name:Name,amount:Amount,bStatus:BidStatus})
    }else{
      console.log(Type);
    }
  }
  const handlePress2=(result)=>{
    const {ID,Name,Amount,BidStatus}=result;
    if(BidStatus==="ON"){
      navigation.navigate('Bidding',{cid:ID,name:Name,amount:Amount});
    }else{
      alert('Owner not on bid yet');
    }
  }
  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title >Contact</DataTable.Title>
          <DataTable.Title >Amount</DataTable.Title>
          <DataTable.Title >Type</DataTable.Title>
          <DataTable.Title >Details</DataTable.Title>
          <DataTable.Title >Action</DataTable.Title>
        </DataTable.Header>
        {data2.map((result, idx) => (
          <DataTable.Row key={idx} style={{marginTop:5}}>
              <DataTable.Cell>{result.Name}</DataTable.Cell>
              <DataTable.Cell>{result.Contact}</DataTable.Cell>
              <DataTable.Cell>{result.Amount}</DataTable.Cell>
              <DataTable.Cell>{result.Type}</DataTable.Cell>
              <DataTable.Cell>
                <Text style={{color:'blue'}} onPress={()=>navigation.navigate('AllMember',{cid:result.ID,per:result.PerPerson,name:result.Name,amount:result.Amount})}>Detail</Text>
              </DataTable.Cell>
              {result.OwnerId===foo?
              <DataTable.Cell>
                {result.Type==="Sequential"?
                 <Text style={{color:'blue'}}></Text>
                :
                <Text style={{color:'blue'}} onPress={()=>handlePress(result)}>{result.Type==="Random"?'Draw':"Bid"}</Text>
                }
              </DataTable.Cell>
              :
              <DataTable.Cell>
              <Text style={{color:`${result.BidStatus==="ON"?'green':'blue'}`}} onPress={()=>handlePress2(result)}>{result.Type==="Bidding"?'Bid':""}</Text>
              </DataTable.Cell>
              }
          </DataTable.Row>
        ))}
      </DataTable>
      
      <TouchableOpacity style={styles.userBtn} onPress={()=>navigation.navigate('MyCommittee')}>
        <Text style={styles.btnText}>View My Amount</Text>
      </TouchableOpacity>
    </ScrollView >
  );
}
export default ViewParty;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  userBtn: {
    backgroundColor: '#08d4c4',
    padding: 11,
    width: '50%',
    borderRadius: 5,
    alignSelf:'center',
    marginTop:8

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































// import React, { Component, useState, useEffect } from 'react';
// import { StyleSheet, View, ActivityIndicator } from 'react-native';
// import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
// const ViewParty = () => {
//   const [data2, setData2] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tableData, setTableData] = useState([]);
//   const myData = {
//     tableHead: ['Name', 'Contact', 'Amount', 'Type'],
//     // tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
//     tableData: [
//       ['Zeeshan', '03011234908', '15000', 'Group'],
//       ['Abid', '03021234909', '12000', 'HouseHold'],
//       ['Nauman', '03031234906', '13000', 'Random'],
//       ['Kiran', '03041234905', '20000', 'Group'],
//       ['Zahid', '03051234904', '16000', 'HouseHold'],
//       ['Sana', '03061234908', '15000', 'Group'],
//       ['Imran', '03071234909', '12000', 'HouseHold'],
//       ['Zahoor', '03081234906', '13000', 'Random'],
//       ['Javed', '03091234905', '20000', 'Group'],
//       ['Tahir', '03031234904', '16000', 'HouseHold'],
//     ]
//   }
//   const getAllCommittee = () => {
//     const url = `http://${mp}/KittyPartyApi/api/Party/AllCommittee`;
//     fetch(url, {
//       method: 'GET',
//     }).then((response) => response.json())
//       .then((response) => {
//         response.forEach(element => {
//           setData2(data2 => [...data2,
//           {
//             Name: element.Name,
//             Contact: element.Contact,
//             Type: element.Type,
//             Amount: element.Amount
//           }
//           ]);
//           tableData.push([element.Name, element.Contact, element.Type, element.Amount]);
//         });
//         setLoading(false);
//       })
//       .catch((error) => { alert(error) })
//   }
//   const showData = () => {
//     console.log(tableData);
//   }
//   useEffect(() => { getAllCommittee(); }, []);
//   useEffect(() => { showData(); }, []);
//   const [data, setData] = useState(myData);
//   return (
//     <View style={styles.container}>
//       {loading === true ?
//         <ActivityIndicator color='Red' size={30} />
//         :
//         <Table borderStyle={{ borderWidth: 1 }}>
//           <Row data={data.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
//           <TableWrapper style={styles.wrapper}>
//             <Col data={data.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
//             <Rows data={tableData} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
//           </TableWrapper>
//         </Table>
//       }
//     </View>
//   )
// }
// export default ViewParty;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     paddingTop: 30,
//     backgroundColor: '#fff'
//   },
//   head: {
//     height: 28,
//     backgroundColor: '#f1f8ff'
//   },
//   wrapper: {
//     flexDirection: 'row'
//   },
//   title: {
//     flex: 1,
//     backgroundColor: '#f6f8fa'
//   },
//   row: {
//     height: 42
//   },
//   text: {
//     textAlign: 'center'
//   }
// });
