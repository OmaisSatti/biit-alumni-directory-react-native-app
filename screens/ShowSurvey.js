import React, { useState ,useEffect} from "react";
import { Button, View ,StyleSheet,Image,Text,TouchableOpacity,ScrollView,FlatList,LogBox,ActivityIndicator} from "react-native";
import RadioButtonRN from 'radio-buttons-react-native';
const surveyData= [
    {
      id: '1',
      question: 'Is flutter better than react?',
      userImg: require('../assets/drmunir.jpg'),
      Option1: 'Yes',
      Option2:'No',
    },
    {
      id: '2',
      question: 'Is it worth to learn flutter in 2021?',
      userImg: require('../assets/sirshahid.jpg'),
      Option1: 'Yes',
      Option2:'No',
    },
    {
      id: '3',
      question: 'Is react native easy than flutter ?',
      userImg: require('../assets/drfarhan.jpg'),
      Option1: 'Yes',
      Option2:'No',
    },
    {
      id: '4',
      question: 'Is flutter is faster than react native?',
      userImg: require('../assets/siramir.jpg'),
      Option1: 'Yes',
      Option2:'No',
    },
    {
      id: '5',
      question: 'Which should i learn first in 2021',
      userImg: require('../assets/sirazhar.jpg'),
      Option1: 'React',
      Option2:'Flutter',
    },
  ];
  const data = [
    {
      label: 'Yes'
     },
     {
      label: 'No'
     },
    ];
const ShowSurvey = ({route,navigation}) => {
  const [title,setTitle]=useState('');
  const [allData,setAllData]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const[ansData,setAnsData]=useState([]);
  const getData=()=>{
     console.log(ansData);
  }
  const getAllSurvey=()=>{
    const url = `http://${mp}/FypApi/api/Student/GetSurveyWithQuestion?srid=${route.params.SurveyId}`;
    fetch(url,{
        method:'GET',
    }).then((response)=>response.json())
    .then((response)=>{
       response.forEach(element => {
          setAllData(data=>[...data,
              {
                surveyId:element.surveyId,
                Title:element.Title,
                StartDate:element.StartDate,
                EndDate:element.EndDate,
                QuestionId:element.QuestionId,
                Option1:element.Option1,
                Option2:element.Option2,
                Question:element.Question
              }
            ]);
        setTitle(element.Title);
      });
      setIsLoading(false);
      })
    .catch((error)=>{alert(error)})
    }
  const pushAnswer=(qid,answer)=>{
    var obj=
    {
      QuestionId:qid,
      Answer:answer
    }
    var objIndex = ansData.findIndex((obj => obj.QuestionId == qid));
    if(objIndex==-1){
      ansData.push(obj);
      console.log(`answer of question :  ${qid}  is  ${answer} `);
    }else{
      ansData[objIndex].Answer = answer;
      console.log('ansswer updated successfully');
    }
  }
  var saveAnswer=(qid,ans)=>{
      var InsertApiURL = `http://${mp}/FypApi/api/Student/AddAnswer`;
      var headers={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
      var Data={
        Answer:ans,
        QuestionId:qid,
        StudentId:foo,
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
        }else{
          alert('some thing went wrong');
        }
      })
      .catch((error)=>{
        alert("Error :"+error);
      })
  }
  const popAnswer=()=>{
    console.log(ansData.length+":"+allData.length);
    if(ansData.length<allData.length)
    {
      alert('please must select all answers');
    }else{
    ansData.forEach(element => {
      // console.log('----------------------------------')
      // console.log(element.Answer,element.QuestionId,foo);
      saveAnswer(element.QuestionId,element.Answer);
    });
    saveSubmitInfo();
    alert('your answers submit successfully');
    navigation.navigate("SurveyNotification");
    }
  }
  const saveSubmitInfo=()=>{
    var InsertApiURL = `http://${mp}/FypApi/api/Student/AddSubmitInfo`;
    var headers={
      'Accept':'application/json',
      'Content-Type':'application/json'
    };
    var Data={
      SurveyId:route.params.SurveyId,
      StudentId:foo,
      SubmitStatus:'Yes'
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
      }else{
        alert('submit info not saved');
      }
    })
    .catch((error)=>{
      alert("Error :"+error);
    })

  }
  useEffect(() => {getAllSurvey()},[]);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);}, [])
  return (
      <ScrollView contentContainerStyle={myStyle.container}>
      {isLoading == false ?
      <ScrollView contentContainerStyle={myStyle.container}>
      <Image style={myStyle.img} source={require('../assets/post.png')}></Image>
      <Text style={myStyle.Welcome} >{title}</Text>
      <FlatList style={{backgroundColor:'#F2F5CA',padding:7}}
      data={allData}
      keyExtractor={(item,index)=> index}
      renderItem={({item,index})=>{
      return<View>
      <Text style={{margin:10,fontWeight:'100',fontSize:19,fontFamily:'fantasy'}}>{item.Question}</Text>
      <RadioButtonRN
        box={true}
        boxActiveBgColor={'#e1f5fe33'}
        data={[{label:item.Option1},{label:item.Option2}]}
        textStyle={{fontFamily:'fantasy',fontSize:20,margin:10}}
        deactiveColor={"red"}
        activeColor={"black"}
        textColor={'red'}
        selectedBtn={(e) =>pushAnswer(item.QuestionId,e.label)} 
        />
        </View>
        }}/>
      <TouchableOpacity style={myStyle.userBtn} onPress={()=>popAnswer()}>
      <Text style={myStyle.btnText}>Submit Survey</Text>
      </TouchableOpacity>
      </ScrollView>
      :
      <ActivityIndicator color={'red'}/>
      }
      </ScrollView>
      );
  };
export default ShowSurvey;
const myStyle=StyleSheet.create({
    container:{
     // flex:1,
      backgroundColor:'#F2F5CA'
    },
    Welcome:{
      fontSize:20,
      textAlign:'center',
      margin:10,
      fontWeight:'bold',
      color:'black',
      fontFamily:'fantasy',
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
      backgroundColor:'#F2F5CA',
      padding:8,
      width:'99%',
      borderRadius:25,
      marginTop:10,
      borderColor:'#fb2525',
      borderWidth:2
  
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
      color:'black'
    },
    img:{
      width:90,
      height:90,
      borderRadius:60,
      margin:10,
      alignSelf:'center',
      resizeMode: "cover"
    },
  })