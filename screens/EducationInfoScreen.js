import React,{Component,useState} from 'react'
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image,ScrollView } from 'react-native'; 
import {Picker} from '@react-native-picker/picker';
export default function EducationInfoScreen() {
const [institute,setInstitute]=useState('');
const [grade,setGrade]=useState('');
const [degree,setDegree]=useState('BSCS')
const [year,setYear]=useState('2018')
const[activities,setActivities]=useState('');
var InsertEducation=(navigation)=>{
  var Institute = institute;
  var Grade =grade;
  var Activities = activities;
  var Degree=degree;
  var PassedYear=year;
  var Activities=activities;
  if(Institute.length==0 || Grade.length==0 || Activities.length==0){
    alert("Required Field is missing!");
    }else{
    var InsertApiURL = `http://${mp}/FypApi/api/Student/AddEducationInfo`;
    var headers={
      'Accept':'application/json',
      'Content-Type':'application/json'
    };
    var Data={
      Degree:Degree,
      Institute:Institute,
      Grade:Grade,
      PassedYear:PassedYear,
      Activities:Activities,
      PersonalId:foo,
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
      if(msg=="Data saved successfully"){
        alert(msg);
        setActivities('');
        setGrade('');
        setInstitute('');
      }else{
        alert('Data not saved');
      }
    })
    .catch((error)=>{
      alert("Error :"+error);
    })
    }
 }
const getData=()=>{
  alert(institute+":"+degree+":"+grade+":"+year+":"+activities);
  //alert(foo);
}
     return (
       <ScrollView contentContainerStyle={myStyle.container}> 
       <Image style={myStyle.img} source={require('../assets/skill2.png')}></Image>
       <Text style={myStyle.Welcome} >Add Education!</Text>
       <TextInput style={myStyle.input} placeholder="University/School/Collage" placeholderTextColor="#666"
       onChangeText={(txt)=>setInstitute(txt)} value={institute}/>
       <View style={{flexDirection:'row'}}>
       <Text style={{marginLeft:10,width:'40%',marginTop:15,fontFamily:'fantasy'}}>Degree</Text>
       <Picker style={{width:'50%'}} onValueChange={(txt)=>setDegree(txt)}>
       <Picker.Item label="BSCS" value="BSCS" />
       <Picker.Item label="BSIT" value="BSIT" />
       <Picker.Item label="MCS" value="MCS" />
       <Picker.Item label="MIT" value="MIT" />
       <Picker.Item label="MATRIC" value="Matric" />
       <Picker.Item label="FSC" value="FSC" />
       <Picker.Item label="BSC" value="BSC" />
       </Picker>
       </View>
       <TextInput style={myStyle.input} placeholder="Grade/Obtain Marks" placeholderTextColor="#666"
       onChangeText={(txt)=>setGrade(txt)} value={grade}/>
      <View style={{flexDirection:'row'}}>
      <Text style={{marginLeft:10,width:'40%',marginTop:15,fontFamily:'fantasy'}}>Passed Year</Text>
      <Picker style={{width:'50%'}} onValueChange={(txt)=>setYear(txt)}>
       <Picker.Item label="2000" value="2001" />
       <Picker.Item label="2001" value="2001" />
       <Picker.Item label="2002" value="2002" />
       <Picker.Item label="2003" value="2003" />
       <Picker.Item label="2004" value="2004" />
       <Picker.Item label="2005" value="2005" />
       <Picker.Item label="2006" value="2006" />
       <Picker.Item label="2007" value="2007" />
       <Picker.Item label="2008" value="2008" />
       <Picker.Item label="2009" value="2009" />
       <Picker.Item label="2010" value="2010" />
       <Picker.Item label="2011" value="2011" />
       <Picker.Item label="2012" value="2012" />
       <Picker.Item label="2013" value="2013" />
       <Picker.Item label="2014" value="2014" />
       <Picker.Item label="2015" value="2015" />
       <Picker.Item label="2016" value="2016" />
       <Picker.Item label="2017" value="2017" />
       <Picker.Item label="2018" value="2018" />
       <Picker.Item label="2019" value="2019" />
       <Picker.Item label="2020" value="2020" />
       <Picker.Item label="2021" value="2021" />
       <Picker.Item label="2022" value="2022" />
       <Picker.Item label="2023" value="2023" />
       <Picker.Item label="2024" value="2024" />
       <Picker.Item label="2025" value="2025" />
       <Picker.Item label="2026" value="2026" />
       <Picker.Item label="2027" value="2027" />
       <Picker.Item label="2028" value="2028" />
       <Picker.Item label="2029" value="2029" />
       <Picker.Item label="2030" value="2030" />
       </Picker>
       </View>
      <TextInput style={myStyle.input} placeholder="Activities and societies"  placeholderTextColor="#666"
      onChangeText={(txt)=>setActivities(txt)} value={activities}/>
       <TouchableOpacity style={myStyle.userBtn} onPress={InsertEducation}>
       <Text style={myStyle.btnText}>Save Data</Text>
       </TouchableOpacity>
       </ScrollView> 
     );
}
const myStyle=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'

  },
  Welcome:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    margin:10,
    color:'#08d4c4',
    fontFamily:'fantasy'
  },
  input:{
    width:'90%',
    margin:10,
    padding:7,
    color:'black',
    borderColor:'#08d4c4',
    borderBottomWidth:2,
    fontFamily:'fantasy'

  },
  userBtn:{
    backgroundColor:'#08d4c4',
    margin:10,
    padding:10,
    width:'95%',
    borderRadius:25
  },
  btnText:{
    fontSize:18,
    textAlign:'center',
    fontFamily:'fantasy'
  },
  img:{
    width:75,
    height:75,
    borderColor:'black',
    resizeMode: "stretch"
  },
})