import { Footer } from 'native-base';
import React,{useState} from 'react'
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image,ScrollView} from 'react-native'; 
function ChangePassword({navigation}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[currentPassword,setCurrentPassword]=useState("");
  var updatePassword=()=>{
      var Password = password;
      var ConfirmPassword=confirmPassword;
      var CurrentPassword=currentPassword;
      if(Password.length==0 || ConfirmPassword.length==0 || CurrentPassword.length==0 ){
        alert("Required Field is missing!");
      }else if(password!=confirmPassword){
          alert("Password and Confirm Password does not match!");
        }else{
        var InsertApiURL = `http://${mp}/FypApi/api/Student/UpdatePassword?sid=${foo}&oldPassword=${CurrentPassword}&newPassword=${Password}`;
        fetch(InsertApiURL,
         {
           method:'GET',
         }
        )
        .then((response)=>response.json())
        .then((response)=>
        {
          var message  = response.toString();
          if(message=="true"){
            alert('password change successfully');
          } if(message=="false"){
            alert("Incorrect current password try again");
          }
        })
        .catch((error)=>{
          alert(error);
        })
      }
    }
      return (
      <ScrollView contentContainerStyle={{backgroundColor:"black",flex:1}}>
       {foo!=1002?
       <ScrollView contentContainerStyle={myStyle.container}>
       <Image style={myStyle.img} source={require('../assets/lock.png')}></Image>
       <Text style={myStyle.Welcome} >Change Password!</Text>
       <TextInput style={myStyle.input} placeholder="Current password"  secureTextEntry  placeholderTextColor="#666" 
       onChangeText={(current)=>setCurrentPassword(current)} />
       <TextInput style={myStyle.input} placeholder="Provide new password" placeholderTextColor="#666" secureTextEntry onChangeText={(password)=>setPassword(password)}/>
       <TextInput style={myStyle.input} placeholder="Confirm new password"  placeholderTextColor="#666" secureTextEntry 
       onChangeText={(confirmPassword)=>setConfirmPassword(confirmPassword)}/>
       <View style={myStyle.btnContainer}>
       <TouchableOpacity style={myStyle.userBtn} onPress={()=>updatePassword()} >
       <Text style={myStyle.btnText}>Save Changes</Text>
       </TouchableOpacity>
       </View>
       </ScrollView>
       :
      <View style={{justifyContent:'center',alignSelf:'center',flex:1}}>
      <Text style={{fontFamily:'fantasy',fontSize:16,color:'#fff'}}>You can't change password of this account</Text>
      </View>
       }
       </ScrollView>
        );
  }
export default ChangePassword;
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
    fontFamily:'fantasy'
  },
  btnContainer:{
    flexDirection:'column',
    width:'100%',
    marginTop:5,
    justifyContent:'space-between'
  },
  input:{
    width:'90%',
    margin:13,
    padding:7,
    color:'white',
    borderColor:'white',
    borderBottomWidth:2,
    fontFamily:'fantasy'

  },
  userBtn:{
    backgroundColor:'#fb2525',
    margin:13,
    padding:10,
    width:'94%',
    borderRadius:25
  },
  btnText:{
    fontSize:18,
    textAlign:'center',
    color:'white',
    fontFamily:'fantasy'
  },
  img:{
    width:120,
    height:120,
    borderRadius:60,
    resizeMode: "cover"
  },
})