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
const MySurveyList=({route,navigation})=>{
  const[allUsers,setAllUsers]=useState([]);
  const[usersFiltered,setUsersFiltered]=useState([]);
  const[data,setData]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const GetAllSurvey=()=>{
    var InsertApiURL = `http://${mp}/FypApi/api/Student/GetAllSurveyForMe?sid=${foo}`;
    fetch(InsertApiURL,
     {
       method:'GET',
     }
    )
    .then((response)=>response.json())
    .then((response)=>{
      if(response!='false')
      {
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
    }
    })
    .catch((error)=>{
      alert(error);
    })
  } 
  useEffect(()=>{GetAllSurvey()},[])
    return (
      <Container>
      <ContainerLst>
        {isLoading==false ?
        <FlatList 
          data={data}
          keyExtractor={item=>item.SurveyId}
            renderItem={({item}) => (
            <Card onPress={() =>navigation.navigate('FeedbackSurvey',{SurveyId:item.SurveyId,Title:item.Title})}>
              <UserInfo>
                <UserImgWrapper>
                <UserImg source={require('../assets/posts/feedback.png')} />
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
      </Container>
    );
  };
export default MySurveyList;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});