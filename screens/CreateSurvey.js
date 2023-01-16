import React, { useState } from "react";
import { Button, View ,StyleSheet,Image,Text,TextInput,TouchableOpacity,ScrollView} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const CreateSurvey = ({navigation}) => {
  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [title,setTitle]=useState('');
  const [audience,setAudience]=useState('All');
  const [start,setStart]=useState('Select Start Date');
  const [end, setEnd]=useState('Select End Date');
  const [surveyId,setSurveyId]=useState(-1);

  var saveSurvey=(navigation)=>{
    var Title=title;
    var Audience=audience;
    var StartDate=moment(start).format("MM-DD-YYYY");
    var EndDate=moment(end).format("MM-DD-YYYY");
    if(Title.length==0 || StartDate.length==0 || EndDate.length==0 || Audience.length==0){
      alert("Required Field is missing!");
    }else{
      var InsertApiURL = `http://${mp}/FypApi/api/Student/AddSurvey`;
      var headers={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
      var Data={
        Title:Title,
        Audience:Audience,
        StartDate:StartDate,
        EndDate:EndDate
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
        if(surveyId!=-1){
          alert(msg);
        }
      })
      .catch((error)=>{
        alert("Error :"+error);
      })
      }
   }

  const showDatePicker = () => {
    setStartVisible(true);
  };

  const hideDatePicker = () => {
    setStartVisible(false);
  };

  const handleConfirm = (date) => {
    setStart(date);
    hideDatePicker();
  };

  const showDatePicker2 = () => {
    setEndVisible(true);
  };

  const hideDatePicker2 = () => {
    setEndVisible(false);
  };

  const handleConfirm2 = (date) => {
    setEnd(date);
    hideDatePicker2();
  };
  const getData=()=>{
      //alert(title+":"+audience+":"+start+":"+end) 
      alert( moment(end).format("MM-DD-YYYY"));
  }
  const moveNext=()=>{
    if(title.length==0){
      alert("please provide survey title!");
      return;
    }
    if(start=="Select Start Date")
    {
      alert("plaese choose start date");
      return;
    }
    if(end=="Select End Date")
    {
      alert("plaese choose end date");
      return;
    }else{
      navigation.navigate('AddQuestion',{Title:title,Audience:audience,StartDate:moment(start).format("MM-DD-YYYY"),EndDate:moment(end).format("MM-DD-YYYY")});
  }
}


  return (
    <ScrollView contentContainerStyle={myStyle.container}>
      <Image style={myStyle.img} source={require('../assets/post.png')}></Image>
      <Text style={myStyle.Welcome} >Create Survey!</Text>
      <TextInput style={myStyle.input} placeholder="Provide survey title" 
       onChangeText={(title)=>setTitle(title)}/>
       <View style={{flexDirection:'row'}}>
       <Text style={{marginLeft:15,width:'40%',marginTop:15,fontSize:15,fontFamily:'fantasy'}}>Select Audience</Text>
       <Picker style={{width:'50%'}} onValueChange={(txt)=>setAudience(txt)}>
       <Picker.Item label="All" value="All" />
       <Picker.Item label="2018" value="2018" />
       <Picker.Item label="2019" value="2019" />
       <Picker.Item label="2020" value="2020" />
       <Picker.Item label="2021" value="2021" />
       </Picker>
       </View>
       <View style={{flexDirection:'row'}}>
       <Text style={{width:'40%',marginTop:15,fontSize:15,fontFamily:'fantasy'}}>
         {
           start=="Select Start Date"?(start):(moment(start).format("MM-DD-YYYY"))
         }
         </Text>
       <Icon.Button  onPress={showDatePicker}  style={{ marginLeft:110}} name="md-calendar-outline" backgroundColor='white' color='red' size={30}></Icon.Button>
       </View>
       <View style={{flexDirection:'row'}}>
       <Text style={{width:'40%',marginTop:15,fontSize:15,fontFamily:'fantasy'}}>
         {
           end=="Select End Date"?(end):(moment(end).format("MM-DD-YYYY"))
         }
       </Text>
       <Icon.Button  onPress={showDatePicker2} style={{ marginLeft:110}} name="md-calendar-outline" backgroundColor='white' color='red' size={30}></Icon.Button>
       </View>
       <DateTimePickerModal
        isVisible={startVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={endVisible}
        mode='date'
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
      />
    <TouchableOpacity style={myStyle.userBtn} onPress={()=>moveNext()}>
    <Text style={myStyle.btnText}>Add Question</Text>
    </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateSurvey;
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
      borderColor:'#fb2525',
      borderBottomWidth:2,
      marginBottom:15
    },
    userBtn:{
      backgroundColor:'#fb2525',
      padding:11,
      width:'99%',
      borderRadius:25,
      marginTop:10
  
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
    img:{
      width:100,
      height:100,
      borderRadius:60,
      resizeMode: "cover"
    },
  })