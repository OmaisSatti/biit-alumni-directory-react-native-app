import { Toast } from "native-base";
import React,{useState,useEffect,useCallBack} from "react";
import {StyleSheet,View,Text,FlatList,TouchableOpacity,ListItem,Alert, ToastAndroid} from 'react-native';
const ForgetPassword=()=>{
     const [data, setData] = useState([
                  {Name: 'Muhammad Omais',AridNo:'2019-Arid-2488',PhoneNo:'0321-4567897'},
                  {Name: 'Inzamam Daud',AridNo:'2019-Arid-2485',PhoneNo:'0321-4567897'},
                  {Name: 'Aqdas Farooq',AridNo:'2019-Arid-2475',PhoneNo:'0321-4567897'},
                  {Name: 'Manan Ahmed',AridNo:'2019-Arid-2442',PhoneNo:'0321-4567897'},
        ]);
  return(
     <View>
     <FlatList style={{backgroundColor:'#fff',padding:7}}
      data={data}
      keyExtractor={(item,index)=> index}
       renderItem={({item,index})=>{ 
           return  <View style={styles.card}>
           <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Name </Text>
            <Text style={styles.text}> {item.Name} </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Arid Number </Text>
            <Text style={styles.text}> {item.AridNo} </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Phone Number </Text>
            <Text style={styles.text}> {item.PhoneNo} </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginLeft:5}}>
            <TouchableOpacity style={[styles.btnTouchable,{backgroundColor:'#08d4c4'}]}
             onPress={()=>ToastAndroid.show('Request accepted successfully', ToastAndroid.SHORT)}>
            <Text style={{fontSize:18,color:'white'}}>Send Password</Text> 
            </TouchableOpacity>
            </View>
            </View>
         }}
    />
    </View>
    );
}
export default ForgetPassword;
const styles = StyleSheet.create({
   card:{
   borderRadius:10,
   padding:8,
   margin:8,
   backgroundColor:'#dee0e3',
   shadowColor: "black",
   shadowOffset: {
      width: 0,
      height: 12,
   },
   shadowOpacity: 0.2,
   shadowRadius: 10.00,
   elevation: 2,
  },
  text:{
    fontSize:15,
    color:'#000',
    textAlign:'right',
    flex:1
  },
   btnTouchable:{
        width:"95%",
        height:30,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginTop:20,
        marginRight:10,
        marginLeft:5

    }
})