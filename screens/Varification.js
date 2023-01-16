import React,{useState} from 'react'
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image} from 'react-native'; 
function  Verification({route,navigation}) {
  const [otp, setOtp] = useState("");
  const matchcode=()=>{
      if(route.params.Code==otp)
      {
          navigation.navigate('ResetAccount',{Aridno:route.params.Aridno});
      }else{
          alert('verification code not match');
      }
  }
  console.log(route.params.Code);
     return (
       <View style={myStyle.container}>
       <Image style={myStyle.img} source={require('../assets/verify3.png')}></Image>
       <Text style={myStyle.Welcome} >Verify Code!</Text>
       <TextInput style={myStyle.input} maxLength={14} placeholder="Enter 6 digit code" placeholderTextColor="#666"  onChangeText={(code)=>setOtp(code)}/>
       <View style={myStyle.btnContainer}>
       <TouchableOpacity style={myStyle.userBtn} onPress={()=>matchcode()} >
       <Text style={myStyle.btnText}>Verify Code</Text>
       </TouchableOpacity>
       </View>
       </View>
        );
  }
export default Verification;
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