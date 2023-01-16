import React, { useState ,useEffect} from "react";
import { Button, View ,StyleSheet,Image,Text,TouchableOpacity,ScrollView,FlatList,LogBox,ActivityIndicator} 
from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioButtonRN from 'radio-buttons-react-native';
import Pie from 'react-native-pie'
import {Surface, Shape} from '@react-native-community/art';
const feedbakData= [
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
const FeedbackSurvey = ({route,navigation}) => {
  const [title,setTitle]=useState('');
  const [allData,setAllData]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const[ansData,setAnsData]=useState([]);
  const[total,setTotal]=useState(0);
  const getAllSurvey=()=>{
    const url = `http://${mp}/FypApi/api/Student/GetQuestionPercentage?srid=${route.params.SurveyId}`;
    fetch(url,{
        method:'GET',
    }).then((response)=>response.json())
    .then((response)=>{
      if(response!='false'){
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
                Question:element.Question,
                PercentOption1:element.PercentOption1 ,
                PercentOption2:element.PercentOption2,
                Total:element.Total,
              }
            ]);
        setTotal(element.Total);
        setTitle(element.Title);
      });
      setIsLoading(false);
    }else{
      alert('Currently no submission for survey');
    }
      })
    .catch((error)=>{alert(error)})
    }
  useEffect(() => {getAllSurvey()},[]);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);}, [])
  return (
      <ScrollView contentContainerStyle={myStyle.container}>
      {isLoading == false ?
      <ScrollView contentContainerStyle={myStyle.container}>
      <Image style={myStyle.img} source={require('../assets/posts/feedback.png')}></Image>
      <Text style={myStyle.Welcome} >{route.params.Title}</Text>
      {/* <View style={{width: '100%',borderWidth: 1,borderColor:'#666',marginTop:10}}></View>
      <Text style={myStyle.info} >Total alumni participate in survey : {total}</Text>
      <View style={{width: '100%',borderWidth: 1,borderColor:'#666',marginTop:10}}></View> */}
      <FlatList style={{backgroundColor:'#F2F5CA',padding:7}}
      data={allData}
      keyExtractor={(item,index)=> index}
      renderItem={({item,index})=>{
      return<View>
      <Text style={{margin:10,fontWeight:'100',fontSize:19,fontFamily:'fantasy'}}>{item.Question}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{flexDirection:'column'}}>
      <View style={{flexDirection:'row'}}>
      <MaterialCommunityIcons name="check-circle" size={30} color={'#C70039'}></MaterialCommunityIcons>
      <Text style={{marginLeft:10,fontSize:20,fontFamily:'fantasy'}}>{item.Option1}</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:20}}>
      <MaterialCommunityIcons name="check-circle" size={30} color={'#44CD40'}></MaterialCommunityIcons>
      <Text style={{marginLeft:10,fontSize:20,fontFamily:'fantasy'}}>{item.Option2}</Text>
      </View>
      </View>
      {/* <Pie radius={55} innerRadius={35} 
      sections={[{percentage: 60,color: '#C70039',},{percentage: 40,color: '#44CD40',},]}
      strokeCap={'butt'}
      /> */}
      <View style={{ width: 175, alignItems: 'center' }}>
      <Pie radius={80} innerRadius={55} sections={[{percentage: item.PercentOption1,color: '#f00',},{percentage: item.PercentOption2,color: '#44CD40',}]} backgroundColor="#ddd" />
      <View style={myStyle.gauge} >
      <Text style={myStyle.gaugeText}>{item.PercentOption1}%</Text>
      <Text style={myStyle.gaugeText2}>{item.PercentOption2}%</Text>
      </View>
      </View>
      </View>
      <View style={{width: '100%',borderWidth: 1,borderColor:'#666',marginTop:10}}></View>
      </View>
      }}/>
      </ScrollView>
      :
      <ActivityIndicator color={'red'}/>
      }
      </ScrollView>
      );
  };
export default FeedbackSurvey;
const myStyle=StyleSheet.create({
    container:{
      //flex:1,
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
   info:{
      fontSize:15,
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
    gauge: {
      position: 'absolute',
      width: 100,
      height: 160,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gaugeText: {
      backgroundColor: 'transparent',
      color: '#f00',
      fontSize: 24,
    },
    gaugeText2: {
      backgroundColor: 'transparent',
      color: '#44CD40',
      fontSize: 24,
    },
    

  })