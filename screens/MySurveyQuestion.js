import React, { useEffect, useState } from "react";
import { Button, View ,StyleSheet,Image,Text,TextInput,TouchableOpacity,ScrollView} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
const MySurveyQuestion = ({route,navigation}) => {
  // console.log(route.params);
  const[question,setQuestion]=useState('');
  const[option1,setOption1]=useState('');
  const[option2,setOption2]=useState('');
  const[data,setData]=useState([]);
  const [surveyId,setSurveyId]=useState(-1);
  const pushData=()=>{
    if(question.length==0 || option2==0 ||  option1==0)
    {
      alert('Required filed is misssing');
      return ;
    }else{
    var obj={
      Question:question,
      Option1:option1,
      Option2:option2
    }
    data.push(obj);
    setOption1('');
    setOption2('')
    setQuestion('');
    alert('date push in array');
     }
  }
  var saveQuestion=(Question,Option1,Option2,SurveyId)=>{
    if(Question.length==0 || Option1.length==0 || Option2.length==0){
      alert("Required Field is missing!");
    }else{
      var InsertApiURL = `http://${mp}/FypApi/api/Student/AddQuestion`;
      var headers={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
      var Data={
        Question:Question,
        Option1:Option1,
        Option2:Option2,
        SurveyId:SurveyId
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
          console.log(response);
          //alert(msg);
        }else{
          alert('some thing went wrong');
        }
      })
      .catch((error)=>{
        alert("Error :"+error);
      })
      }
   }
  var saveSurvey=(navigation)=>{
    if(data.length==0){
      alert('add at least 1 question for survey')
    }else{
    var Title=route.params.Title;
    var Audience=route.params.Audience;
    var StartDate=route.params.StartDate;
    var EndDate=route.params.EndDate;
      var InsertApiURL = `http://${mp}/FypApi/api/Student/AddSurvey`;
      var headers={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
      var Data={
        Title:Title,
        Audience:Audience,
        StartDate:StartDate,
        EndDate:EndDate,
        StudentId:foo
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
        setSurveyId(response);
          data.forEach(element => {
            // console.log('----------------------------------')
            // console.log(element.Question,element.Option1,element.Option2,surveyId);
            saveQuestion(element.Question,element.Option1,element.Option2,response)
          });
          alert('survey shared successfully');
      })
      .catch((error)=>{
        alert("Error :"+error);
        console.log(error);
      })
    }
  }
  return (
    <ScrollView contentContainerStyle={myStyle.container}>
      <Image style={myStyle.img} source={require('../assets/survey2.png')}></Image>
      <Text style={myStyle.Welcome} >Add Question!</Text>
      <TextInput value={question} style={myStyle.input} placeholder="Provide Question for survey" 
       onChangeText={(title)=>setQuestion(title)}/>
       <TextInput value={option1} style={myStyle.input} placeholder="Provide option1" 
       onChangeText={(op1)=>setOption1(op1)}/>
       <TextInput  value={option2} style={myStyle.input} placeholder="Provide option2" 
       onChangeText={(op2)=>setOption2(op2)}/>
     {data.length==0 ?
    <TouchableOpacity style={myStyle.userBtn2} onPress={()=>pushData()}>
    <Text style={myStyle.btnText2}>Save Question</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity style={myStyle.userBtn2} onPress={()=>pushData()}>
    <Text style={myStyle.btnText2}>Add More Question</Text>
    </TouchableOpacity>
    }

    <TouchableOpacity style={myStyle.userBtn} onPress={()=>saveSurvey()}>
    <Text style={myStyle.btnText}>Share Survey</Text>
    </TouchableOpacity>
    </ScrollView>
  );
};

export default MySurveyQuestion;
const myStyle=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white'
    },
    Welcome:{
      fontSize:20,
      textAlign:'center',
      margin:10,
      color:'black',
      fontFamily:'fantasy'
    },
    input:{
      width:'90%',
      margin:10,
      padding:7,
      color:'black',
      borderColor:'black',
      borderBottomWidth:2,
      marginBottom:15
    },
    userBtn:{
      backgroundColor:'#fb2525',
      padding:9,
      width:'99%',
      borderRadius:25,
      marginTop:10
  
    },
    userBtn2:{
        backgroundColor:'white',
        borderColor:'#08d4c4',
        borderWidth:2,
        padding:9,
        width:'99%',
        borderRadius:25,
        marginTop:10,
        color:'black'
    
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
      fontFamily:'fantasy'
    },
    btnText2:{
        fontSize:18,
        textAlign:'center',
        color:'black',
        fontFamily:'fantasy'
      },
    img:{
      width:100,
      height:100,
      borderRadius:45,
      resizeMode: "cover"
    },
  })