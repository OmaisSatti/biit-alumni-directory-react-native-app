import React,{useState} from 'react'
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image} from 'react-native'; 
function FindAccount({navigation}) {
  const [aridno, setAridno] = useState("");
  const [name, setName] = useState("");
  const [contact,setContact]=useState('');
  const [email,setEmail]=useState('');
    var findAccount=()=>{
      var Name = name;
     var Aridno =aridno;
     var Contact = contact;
     var Email=email;
     console.log(Name+":"+Aridno+":"+Contact+":"+Email);
     if(Name.length==0 || Aridno.length==0 || Contact.length==0 || Email.length==0){
      alert("Required Field is missing!");
    }else{
        var InsertApiURL = `http://${mp}/FypApi/api/Student/FindAccount?name=${Name}&aridno=${Aridno}&contact=${Contact}&email=${Email}`;
        fetch(InsertApiURL,
         {
           method:'GET',
         }
        )
        .then((response)=>response.json())
        .then((response)=>
        {
          console.log(response);
          var message  = response.toString();
           if(message=="false"){
            alert("Incorrect data please try again");
            return;
          }else if(message.length==6){
            navigation.navigate("Verification",{Code:message,Aridno:aridno});
          }
        })
        .catch((error)=>{
          alert(error);
        })
      }
    }
        return (
      <View style={myStyle.container}>
       <Image style={myStyle.img} source={require('../assets/avatar.png')}></Image>
       <Text style={myStyle.Welcome} >Find Account!</Text>
       <TextInput style={myStyle.input} maxLength={14} placeholder="Provide  aridno" placeholderTextColor="#666"  onChangeText={(aridno)=>setAridno(aridno)}/>
      <TextInput style={myStyle.input} placeholder="Provide  name"  placeholderTextColor="#666" onChangeText={(name)=>setName(name)}/>
       <TextInput style={myStyle.input} placeholder="Provide  contact" placeholderTextColor="#666"  onChangeText={(con)=>setContact(con)}/>
       <TextInput style={myStyle.input} placeholder="Provide email"  placeholderTextColor="#666"  
       onChangeText={(email)=>setEmail(email)}/>
       <View style={myStyle.btnContainer}>
       <TouchableOpacity style={myStyle.userBtn} onPress={()=>findAccount()} >
       <Text style={myStyle.btnText}>Search account</Text>
       </TouchableOpacity>
       </View>
       </View>
        );
  }
export default FindAccount;
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
    borderStyle: 'dotted',
    borderRadius: 1,

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