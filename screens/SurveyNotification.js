import React, { Component,useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator,Switch,RefreshControl} from 'react-native';
import {
  ContainerLst,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/StudentListStyles';
import { Container, Header,Item,Icon,Input} from 'native-base';
import _ from 'lodash';
const Messages = [
  {
    id: '1',
    Title: 'Admin wants to survey React vs Flutter',
    surveyImg: require('../assets/post.png'),
    surveyTime: '19-06-2021',
  },
  {
    id: '2',
    Title: 'Admin wants to survey of Biit Firwall party',
    surveyImg: require('../assets/post.png'),
    surveyTime: '10-06-2021',
  },
];
const SurveyNotification=({route,navigation})=>{
  const[allUsers,setAllUsers]=useState([]);
  const[usersFiltered,setUsersFiltered]=useState([]);
  const[data,setData]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const GetAllSurvey=()=>{
    var InsertApiURL = `http://${mp}/FypApi/api/Student/GetAllSurvey3?sid=${foo}`;
    fetch(InsertApiURL,
     {
       method:'GET',
     }
    )
    .then((response)=>response.json())
    .then((response)=>{
      if(response!='false'){
      response.forEach(element => {
       setData(data=>[...data,
           {
             SurveyId:element.SurveyId,
             Title:element.Title,
             StartDate:element.StartDate,
             EndDate:element.EndDate
           }
         ]);
      })
     setIsLoading(false);
      }else{
        alert('There is no current survey');
        setIsLoading(false);
      }
    })
    .catch((error)=>{
      alert(error);
    })
  } 
  useEffect(()=>{GetAllSurvey()},[])
    return (
      <Container>
      {foo!=1002?
      <ContainerLst>
        {isLoading==false ?
        <FlatList 
          data={data}
          keyExtractor={item=>item.SurveyId}
            refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>alert('abc')}
            />}
            renderItem={({item}) => (
            <Card onPress={() =>navigation.navigate('ShowSurvey',{SurveyId:item.SurveyId})}>
              <UserInfo>
                <UserImgWrapper>
                <UserImg source={require('../assets/notification.jpg')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.Title}</UserName>
                    <PostTime>{'...'}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.StartDate}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
        :
        <ActivityIndicator color={"red"} />
        }
      </ContainerLst>
      :
      <View style={{justifyContent:'center',alignSelf:'center',flex:1}}>
      <Text style={{fontFamily:'fantasy',fontSize:16}}>Guest Can't participate in survey activities</Text>
      </View>
      }
      </Container>
    );
  };
export default SurveyNotification;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});