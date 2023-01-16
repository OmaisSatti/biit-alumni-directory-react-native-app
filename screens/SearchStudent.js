import React,{useState} from 'react';
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image,StatusBar,ScrollView} from 'react-native'; 
import {Picker} from '@react-native-picker/picker';
export default function SearchStudent({navigation}) {
    const[name,setName]=useState('');
    const[aridno,setAridno]=useState('');
    const[session,setSession]=useState('');
    const [degree,setDegree]=useState('BSCS')
    const searachRecord=()=>{
        if(name.length==0 || aridno.length==0 || session.length==0)
        {
          alert('Required filled is missing');
          return;
        }else{
          navigation.navigate('SearchResults',{Name:name,AridNo:aridno,Degree:degree,PassedYear:session});
        }
    }
      return (
      <ScrollView contentContainerStyle={myStyle.container}>
        <StatusBar backgroundColor='black' barStyle="light-content" />
       <Image style={myStyle.img} source={require('../assets/admin4.jpg')}></Image>
       <Text style={myStyle.Welcome} >Search Student?</Text>
       <TextInput  style={myStyle.input} placeholder="Student aridno" placeholderTextColor='#666'
       onChangeText={(arid)=>setAridno(arid)} />
       <TextInput style={myStyle.input} placeholder="Student name"  placeholderTextColor='#666'
        onChangeText={(name)=>setName(name)} />
       <View style={{flexDirection:'row'}}>
       <Text style={{marginLeft:10,width:'40%',marginTop:15,fontFamily:'fantasy'}}>Decipline</Text>
       <Picker style={{width:'50%'}} onValueChange={(txt)=>setDegree(txt)}>
       <Picker.Item label="BSCS" value="BSCS" />
       <Picker.Item label="BSIT" value="BSIT" />
       <Picker.Item label="MCS" value="MCS" />
       <Picker.Item label="MIT" value="MIT" />
       </Picker>
       </View>
       <TextInput style={myStyle.inputLast} placeholder="Passed year"  placeholderTextColor='#666' keyboardType='phone-pad'
       onChangeText={(session)=>setSession(session)}  />
       <View style={myStyle.btnContainer}>
       <TouchableOpacity style={myStyle.userBtn} onPress={()=>searachRecord()}><Text style={myStyle.btnText}>Search</Text>
       </TouchableOpacity>
       </View>
       </ScrollView>
        );
    }
const myStyle=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  Welcome:{
    fontSize:20,
    textAlign:'center',
    margin:10,
    color:'#08d4c4',
    fontWeight:'bold',
    fontFamily:'fantasy'
  },
  input:{
    width:'90%',
    margin:10,
    padding:7,
    color:'black',
    fontFamily:'fantasy',
    borderColor:'#08d4c4',
    borderBottomWidth:2,
  },
  inputLast:{
    width:'90%',
    marginTop:5,
    padding:7,
    color:'black',
    borderColor:'#08d4c4',
    borderBottomWidth:2,
  },
  userBtn:{
    backgroundColor:'#08d4c4',
    //backgroundColor:'#01ab9d',
    //backgroundColor:'#009387',
    padding:11,
    width:'100%',
    borderRadius:20,
  },
  btnContainer:{
    flexDirection:'column',
    width:'95%',
    marginTop:25,
    justifyContent:'space-between'
  },
    txtContainer:{
    width:'90%',
    marginLeft:10,
    justifyContent:'space-between'
  },
  btnText:{
    fontSize:18,
    textAlign:'center',
    color:'white',
    fontFamily:'fantasy'
  },
  img:{
    width:85,
    height:85,
    borderRadius:60,
    resizeMode: "cover"
  },
})