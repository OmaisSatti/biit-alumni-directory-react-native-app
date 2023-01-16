import React, { Component,useState,useEffect} from 'react';
import { View,StyleSheet, FlatList, ActivityIndicator } from 'react-native';
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
const SearchResults=({route,navigation})=>{
  const[allUsers,setAllUsers]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const[myImg,setMyImg]=useState('');
const getStudentWithSession=()=>{
   const url = `http://${mp}/FypApi/api/Student/GetStudentsWithSession?name=${route.params.Name}&arid=${route.params.AridNo}&degree=${route.params.Degree}&passedYear=${route.params.PassedYear}`;
  fetch(url,{
      method:'GET',
  }).then((response)=>response.json())
  .then((response)=>{
    if(response!='false'){
    response.forEach(element => {
      setAllUsers(data=>[...data,
           {

             StudentId:element.StudentId,
             AridNo:element.AridNo,
             Password:element.Password,
             Name:element.Name,
             Session:element.PassedYear,
             FrontImageName:element.FrontImageName,
             CoverImageName:element.CoverIamgeName
           }
         ]);
         setMyImg(element.FrontImageName);
         console.log(myImg);
   });
    setIsLoading(false);
  }else{
    alert('No such record found');
  }
  })
  .catch((error)=>{alert(error)})
 }

useEffect(()=>{getStudentWithSession();},[]);
    return (
      <Container>
      {isLoading==true ?
      <View style={styles.container}><ActivityIndicator size={'large'} color="red"/></View>
      :
      <Container>
      <ContainerLst>
        <FlatList 
          data={allUsers}
          keyExtractor={item=>item.StudentId}
          renderItem={({item}) => (
            <Card onPress={() =>navigation.navigate('FriendsProfile',{Name:item.Name,StudentId:item.StudentId})}>
              <UserInfo>
                <UserImgWrapper>
                  {/* <UserImg source={require('../assets/emptyprofile.jpg')} /> */}
                  <UserImg source={{uri:`http://${mp}/FypApi/Photos/${myImg}`}} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.AridNo}</UserName>
                    <PostTime>{item.Session==null ? 'student' : item.Session.toString().trim()}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.Name}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </ContainerLst>
      </Container>
          }
      </Container>
    );
  };
export default SearchResults;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});