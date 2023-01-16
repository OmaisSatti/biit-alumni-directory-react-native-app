import React,{useState} from 'react'
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image, ToastAndroid} from 'react-native'; 
function ResetAccount({route,navigation}) {
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const resetData=()=>{
        if(password!=confirmPassword)
        {
            alert('password and confirm password does not match');
        }else{
            var InsertApiURL = `http://${mp}/FypApi/api/Student/ResetAccount`;
            var headers={
              'Accept':'application/json',
              'Content-Type':'application/json'
            };
            var Data={
                AridNo:route.params.Aridno,
                Password:password
            }
            fetch(InsertApiURL,
             {
               method:'POST',
               headers:headers,
               body:  JSON.stringify(Data)
             }
            )
            .then((response)=>response.json())
            .then((response)=>
            {
              let msg=response.toString();
              if(msg=="true"){
                ToastAndroid.show("Password update successfully",ToastAndroid.SHORT)
                navigation.navigate('Login');
              }else{
                alert('Password not change please try again');
              }
            })
            .catch((error)=>{
              alert("Error :"+error);
            })
        }
    }
        return (
       <View style={myStyle.container}>
       <Image style={myStyle.img} source={require('../assets/avatar.png')}></Image>
       <Text style={myStyle.Welcome} >Reset Account!</Text>
       <TextInput style={myStyle.input} maxLength={14} placeholder="Provide  new password" placeholderTextColor="#666" secureTextEntry onChangeText={(pass)=>setPassword(pass)} />
       <TextInput style={myStyle.input} placeholder="Confirm new password"  placeholderTextColor="#666"  secureTextEntry
       onChangeText={(con)=>setConfirmPassword(con)}/>
       <View style={myStyle.btnContainer}>
       <TouchableOpacity style={myStyle.userBtn} onPress={()=>resetData()} >
       <Text style={myStyle.btnText}>Reset Now</Text>
       </TouchableOpacity>
       </View>
       </View>
        );
  }
export default ResetAccount;
const myStyle=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black'
  },
  Welcome:{
    fontSize:20,
    textAlign:'center',
    margin:10,
    color:'white',
  },
  btnContainer:{
    flexDirection:'column',
    width:'100%',
    marginTop:5,
    justifyContent:'space-between'
  },
  input:{
    width:'92%',
    margin:8,
    padding:7,
    color:'white',
    borderColor:'white',
    borderBottomWidth:2,

  },
  userBtn:{
    backgroundColor:'#fb2525',
    margin:10,
    padding:10,
    width:'95%',
    borderRadius:25
  },
  btnText:{
    fontSize:18,
    textAlign:'center',
    color:'white'
  },
  img:{
    width:90,
    height:90,
    borderRadius:60,
    resizeMode: "cover"
  },
})