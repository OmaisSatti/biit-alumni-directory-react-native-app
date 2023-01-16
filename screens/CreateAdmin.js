import React,{useState} from 'react';
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image,StatusBar} from 'react-native'; 
export default function CreateAdmin({route ,navigation}) {
    const[name,setName]=useState('');
    const[contact,setContact]=useState('');
    const[cnic,setCnic]=useState('');
    const[password,setPassword]=useState('');
    var InsertAdmin=(navigation)=>{
        var Name = name;
        var Contact =contact;
        var Cnic=cnic;
        var Password = password;
        if(Name.length==0 || Password.length==0 || Contact.length==0 || Cnic.length==0){
          alert("Required Field is missing!");
        }else{
          var InsertApiURL = `http://${mp}/FypApi/api/Student/AddAdmins`;
          var headers={
            'Accept':'application/json',
            'Content-Type':'application/json'
          };
          var Data={
            Name:Name,
            Contact:Contact,
            Cnic:Cnic,
            Password:Password,
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
              setCnic('');
              setContact('');
              setName('');
              setPassword('');
              alert('Account registered successfully');
              return;
            }
             if(msg=="exist"){
              alert('Account already exist');
              return;
            }else{
              alert('Account registration failed');
            }
          })
          .catch((error)=>{
            alert("Error :"+error);
          })
          }
       }
    var updateAdmin=(navigation)=>{
        var Name =name;
        var Contact =contact;
        var Cnic=cnic;
        var Password =password;
        if(Name.length==0 && Password.length==0 && Contact.length==0 && Cnic.length==0){
          alert("Same data will not update again");
          return;
        }if(Name.length==0){
          Name=route.params.Name;
        }if(Contact.length==0){
          Contact=route.params.Contact;
        }if(Password.length==0)
        {
          Password=route.params.Password;
        }if(Cnic.length==0){
          Cnic=route.params.Cnic;
        }if(Name.length!=0 && Password.length!=0 && Contact.length!=0 && Cnic.length!=0){
          var InsertApiURL = `http://${mp}/FypApi/api/Student/UpdateAdmin`;
          var headers={
            'Accept':'application/json',
            'Content-Type':'application/json'
          };
          var Data={
            AdminId:route.params.AdminId,
            Name:Name,
            Contact:Contact,
            Cnic:Cnic,
            Password:Password,       
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
            alert(msg);
          })
          .catch((error)=>{
            alert("Error :"+error);
          })
          }
    }
    const getData=()=>{
        alert(name+":"+contact+":"+cnic+":"+password);
    }
      return (
      <View style={myStyle.container}>
        <StatusBar backgroundColor='black' barStyle="light-content" />
       <Image style={myStyle.img} source={require('../assets/admin1.jpg')}></Image>
       <Text style={myStyle.Welcome} >Create Admin!</Text>
       <TextInput  style={myStyle.input} placeholder="Provide name" placeholderTextColor='#666' 
       onChangeText={(name)=>setName(name)} defaultValue={route.params!=null?route.params.Name:""} value={name}/>
       <TextInput maxLength={12} keyboardType={'phone-pad'} style={myStyle.input} placeholder="Provide phonenumber" placeholderTextColor='#666' onChangeText={(con)=>setContact(con)} defaultValue={route.params!=null?route.params.Contact:""}
       value={contact} />
       <TextInput style={myStyle.input} placeholder="Provide cnic" placeholderTextColor='#666' 
       onChangeText={(cn)=>setCnic(cn)} defaultValue={route.params!=null?route.params.Cnic:""} value={cnic}/>
       <TextInput style={myStyle.input} placeholder="Provide password" placeholderTextColor='#666' secureTextEntry 
       onChangeText={(pass)=>setPassword(pass)} defaultValue={route.params!=null?route.params.Password:""} value={password}/>
       <View style={myStyle.btnContainer}>
       {route.params!=null?
       <TouchableOpacity style={myStyle.userBtn} onPress={updateAdmin}>
       <Text style={myStyle.btnText}>Update</Text>
       </TouchableOpacity>
       :
       <TouchableOpacity style={myStyle.userBtn} onPress={InsertAdmin}>
       <Text style={myStyle.btnText}>Create</Text>
       </TouchableOpacity>
       }
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
    padding:8,
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
    color:'white'
  },
  img:{
    width:75,
    height:75,
    borderRadius:60,
    resizeMode: "cover"
  },
})