import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
const HistoryParty = () => {
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const myData = {
        tableHead: ['Name', 'Contact', 'Amount', 'StartDate', 'Type'],
        // tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
    }
    const searchCommittee = (date) => {
        if(type.length==0){
            setTableData(filterData.filter(i =>{return i[3].toLowerCase().includes(date.toLowerCase())}));
        }else
        {
            setTableData(filterData.filter(i =>{return i[3].toLowerCase().includes(date.toLowerCase()) &&i[4].toLowerCase().includes(type.toLowerCase()) }));

        }
     
    }
    const searchCommittee2 = (type) => {
        if(date.length==0){
            setTableData(filterData.filter(i =>{return i[4].toLowerCase().includes(type.toLowerCase())}));
        }else{
            setTableData(filterData.filter(i =>{return i[3].toLowerCase().includes(date.toLowerCase()) &&i[4].toLowerCase().includes(type.toLowerCase()) }));
        }
    }
    const getAllCommittee = () => {
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
                        StartDate:element.StartDate,
                    }
                    ]);
                    tableData.push([element.Name, element.Contact, element.Amount, element.StartDate, element.Type]);
                });
                setFilterData([...tableData]);
                setLoading(false);
            }else{
                alert("Not found any committee of this member");
            }
            })
            .catch((error) => { alert(error) })
    }
    const showData = () => {
        // console.log(tableData[3]);
        tableData.forEach(element => {
            console.log(element[3]);
        });
    }
    useEffect(() => { getAllCommittee(); }, []);
    const [data, setData] = useState(myData);
    return (
        <View>
            {loading === true ?
                <ActivityIndicator color='Red' size={30} />
                :
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Picker style={{ width: '70%' }} onValueChange={(txt) => { setType(txt),searchCommittee2(txt) }}>
                            <Picker.Item label="Bidding" value="Bidding" />
                            <Picker.Item label="Sequential" value="Sequential" />
                            <Picker.Item label="Random" value="Random" />
                        </Picker>

                        <Picker style={{ width: '70%' }} onValueChange={(date) => { setDate(date), searchCommittee(date) }}>
                            {data2.map((item)=>{
                            return <Picker.Item label={item.StartDate} value={item.StartDate} />
                            })}
                        </Picker>

                    </View>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={data.tableHead} flexArr={[2, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={data.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                            <Rows data={tableData} flexArr={[2, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>
                </View>
            }
        </View>
    )
}
export default HistoryParty;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 32,
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
        height: 50
    },
    text: {
        textAlign: 'center'
    }
});

