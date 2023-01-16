import React, { useState, useEffect } from 'react';
import {DataTable } from 'react-native-paper';
import {ScrollView } from 'react-native';
const FutureParty = ({ navigation }) => {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const getAllCommittee = () => {
    setData2([]);
    const url = `http://${mp}/KittyPartyApi/api/Party/AllCommittee`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((response) => {
        response.forEach(element => {
          setData2(data2 => [...data2,
          {
            Name: element.Name,
            Contact: element.Contact,
            Type: element.Type,
            Amount: element.Amount,
            ID:element.ID,
            PerPerson:element.PerPerson,
          }
          ]);
          tableData.push([element.Name, element.Contact, element.Type, element.Amount]);
        });
        setLoading(false);
      })
      .catch((error) => { alert(error) })
  }
  useEffect(() => getAllCommittee(), [])
  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title >Contact</DataTable.Title>
          <DataTable.Title >Amount</DataTable.Title>
          <DataTable.Title >Type</DataTable.Title>
          <DataTable.Title >Details</DataTable.Title>
          <DataTable.Title >Add</DataTable.Title>
        </DataTable.Header>
        {data2.map((result, idx) => (
          <DataTable.Row key={idx} style={{marginTop:5}}>
              <DataTable.Cell>{result.Name}</DataTable.Cell>
              <DataTable.Cell>{result.Contact}</DataTable.Cell>
              <DataTable.Cell>{result.Amount}</DataTable.Cell>
              <DataTable.Cell>{result.Type}</DataTable.Cell>
              <DataTable.Cell onPress={()=>navigation.navigate('AllMember',{cid:result.ID,per:result.PerPerson})}>Details</DataTable.Cell>
              <DataTable.Cell onPress={()=>navigation.navigate('AddMember',{cid:result.ID})}>Add</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView >
  );
}
export default FutureParty;































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
