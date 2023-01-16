import React, { useState, useEffect } from 'react';
import {DataTable } from 'react-native-paper';
import {ScrollView,Text } from 'react-native';
const ShowParty = ({ navigation }) => {
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
              <DataTable.Cell>
              <Text style={{color:'blue'}} onPress={()=>navigation.navigate('InviteMember',{cid:result.ID})}>Invite
              </Text>
              </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView >
  );
}
export default ShowParty;
