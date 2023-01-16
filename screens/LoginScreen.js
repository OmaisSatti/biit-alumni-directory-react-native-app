import React,{useState,useContext} from 'react';
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image,StatusBar,ToastAndroid} from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {AuthContext} from '../Component/context';
function LoginScreen({navigation}) {
   const [aridno,setAridno] = useState("");
   const [password, setPassword] = useState("");
   const [toggleCheckBox, setToggleCheckBox] = useState(false)
   const {signIn}=useContext(AuthContext);
   var FuncLogin=(navgation)=>{
     var Aridno= aridno;
     var Password = password;
     if(Aridno.length==0 || Password.length==0){
       alert("Required Field is missing!");
     }else{
       var InsertApiURL = `http://${mp}/FypApi/api/Student/LoginWithData?arid=${Aridno}&pass=${Password}`;
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
            response.forEach(element => {
              //console.log(element.StudentId);
              signIn(response);
             //navigation.navigate("Main",{StudentId:element.StudentId,Name:element.Name});
          });
         }else{
          alert("Incorrect arridno or password");
         }
       })
       .catch((error)=>{
         alert(error);
       })
     }
   }
      return (
      <View style={myStyle.container}>
       <StatusBar backgroundColor="black" />
       <Image style={myStyle.img} source={require('../assets/avatar.png')}></Image>
       <Text style={myStyle.Welcome} >Login Here!</Text>
       <TextInput style={myStyle.input} placeholder="Provide aridno" placeholderTextColor='#666' 
       onChangeText={(aridno)=>setAridno(aridno)}/>
       <TextInput style={myStyle.input} placeholder="Provide password" placeholderTextColor='#666' secureTextEntry onChangeText={(password)=>setPassword(password)}/>
       <View style={myStyle.btnContainer}>
       <TouchableOpacity style={myStyle.userBtn} onPress={FuncLogin}>
       <Text style={myStyle.btnText}>Login</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate("FindAccount")}>
       <Text style={{color:'white',margin:8,marginTop:13}}>Forget account ? Find your account</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate("AdminLogin")}>
       <Text style={{color:'white',margin:8,marginTop:13}}>Are you admin ? Login as an admin</Text>
       </TouchableOpacity>
       {/* <View style={{flexDirection:'row',alignItems:'center'}}>
       <CheckBox disabled={false} tintColors='white' value={toggleCheckBox} onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
       <Text style={{color:'white'}}>I Agree with terms and conditions</Text>
       </View> */}
       </View>
       </View>
        );
    }
export default LoginScreen;
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
    padding:7,
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