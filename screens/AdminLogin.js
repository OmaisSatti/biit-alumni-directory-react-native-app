import React,{useState} from 'react';
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image,StatusBar} from 'react-native'; 
export default function AdminLogin({navigation}) {
   const [contact,setContact] = useState("");
   const [password, setPassword] = useState("");
   var FuncAdminLogin=(navgation)=>{
     var Contact= contact;
     var Password = password;
     if(Contact.length==0 || Password.length==0){
       alert("Required Field is missing!");
     }else{
       var InsertApiURL = `http://${mp}/FypApi/api/Student/LoginAdmin?contact=${Contact}&pass=${Password}`;
       fetch(InsertApiURL,
        {
          method:'GET',
        }
       )
       .then((response)=>response.json())
       .then((response)=>
       {
         var message  = response.toString();
         if(message!="false"){
            navigation.replace("AdminPanel",{AdminId:response});
         }else{
          alert("Incorrect phoneno or password");
         }
       })
       .catch((error)=>{
         alert(error);
       })
     }
   }
      return (
      <View style={myStyle.container}>
       <StatusBar backgroundColor='black' />
       <Image style={myStyle.img} source={require('../assets/admin1.jpg')}></Image>
       <Text style={myStyle.Welcome} >Admin Login!</Text>
       <TextInput maxLength={12} keyboardType={'phone-pad'} style={myStyle.input} placeholder="Provide phonenumber" placeholderTextColor='#666' 
       onChangeText={(contact)=>setContact(contact)}/>
       <TextInput style={myStyle.input} placeholder="Provide password" placeholderTextColor='#666' secureTextEntry onChangeText={(password)=>setPassword(password)}/>
       <View style={myStyle.btnContainer}>
       <TouchableOpacity style={myStyle.userBtn} onPress={()=>FuncAdminLogin()}>
       <Text style={myStyle.btnText}>Login</Text>
       </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
      <Text style={{color:'white',margin:8}}>You are not admin?</Text></TouchableOpacity>
       </View>
       </View>
        );
    }
const myStyle=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black'
  },
  Welcome:{
    fontSize:20,
    textAlign:'center',
    margin:10,
    color:'white',
    fontFamily:'fantasy',
  },
  input:{
    width:'90%',
    margin:10,
    padding:8,
    color:'white',
    borderColor:'white',
    borderBottomWidth:2,
  },
  userBtn:{
    backgroundColor:'#fb2525',
    padding:11,
    width:'99%',
    borderRadius:25

  },
  btnContainer:{
    flexDirection:'column',
    width:'95%',
    margin:15,
    justifyContent:'space-between'
  },
    txtContainer:{
    width:'90%',
    marginLeft:15,
    justifyContent:'space-between'
  },
  btnText:{
    fontSize:18,
    textAlign:'center',
    color:'white',
    fontFamily:'fantasy',
  },
  img:{
    width:100,
    height:100,
    borderRadius:60,
    resizeMode: "cover"
  },
})