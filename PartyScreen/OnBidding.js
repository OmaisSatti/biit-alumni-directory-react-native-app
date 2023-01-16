import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView, TextInput, TouchableOpacity,Switch } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
const OnBidding = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [bidAmount, setBidAmount] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const myData = {
        tableHead: ['Committee Name', 'Total Amount'],
    }
    const [data, setData] = useState(myData);
    const pushData = () => {
        tableData.push([route.params.name, route.params.amount])
        setLoading(false);
    }
    var InsertData = () => {
        if (bidAmount > route.params.amount) {
            alert("Bid Amount must be less than committee amount!");
        } else if (bidAmount.length == 0) {
            alert("Please Enter Bid Amount First");
        } else {
            var InsertApiURL = `http://${mp}/KittyPartyApi/api/Party/SaveBid`;
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            var Data = {
                BName: fooName,
                BAmount: bidAmount,
                Cid: route.params.cid
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
                    alert('Amount added successfully');
                    setBidAmount("");
                })
                .catch((error) => {
                    alert("Error :" + error);
                })
        }
    }
    const sendData = () => {
        const url = `http://${mp}/KittyPartyApi/api/Party/UpdateBidStatus?cid=${route.params.cid}`;
        fetch(url, {
          method: 'GET',
        }).then((response) => response.json())
          .then((response) => {
              alert('Bid status change successfully')
              navigation.navigate("KittyParty");
          })
          .catch((error) => { alert(error) })
      }
    useEffect(() => pushData(), []);
    const bStatus=route.params.bStatus;
    return (
        <ScrollView style={styles.container}>
            {loading === true ?
                <ActivityIndicator color='Red' size={30} />
                :
                <View style={styles.container}>
                    <Text style={styles.Welcome}>Owner Bidding Activity</Text>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={data.tableHead} flexArr={[1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={data.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                            <Rows data={tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>
                    {route.params.bStatus=="ON" ?
                     <View>
                    <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'baseline' }}>
                        <Text>Enter Bid Amount</Text>
                        <TextInput style={styles.input} onChangeText={(txt) => setBidAmount(txt)}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                        <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('SelectBid', { cid: route.params.cid,total:route.params.amount})}>
                            <Text style={styles.btnText}>View Bids</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.userBtn} onPress={() => InsertData()}>
                            <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    :
                    <></>
                    }
                    <TouchableOpacity style={styles.userBtn2} onPress={() =>sendData()}>
                        <Text style={styles.btnText}>{bStatus=="ON"?"OFF Bid":"ON Bid"}</Text>
                    </TouchableOpacity>
               </View>
            }
        </ScrollView>
    )
}
export default OnBidding;
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
    input: {
        borderBottomWidth: 2,
        width: '60%',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    userBtn: {
        backgroundColor: '#08d4c4',
        padding: 11,
        width: '45%',
        marginTop: 15,
        marginLeft:10,
    },
    userBtn2: {
        backgroundColor: '#08d4c4',
        padding: 11,
        width: '92%',
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

