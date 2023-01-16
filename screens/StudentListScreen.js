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
    stdArid: '2019-arid-2488',
    userImg: require('../assets/users/messi.jpg'),
    messageTime: 'student',
    messageText:'Muhammad Omais Satti'
  },
  {
    id: '2',
    stdArid: '2019-arid-2485',
    userImg: require('../assets/users/inzamam.jpg'),
    messageTime: 'student',
    messageText:
      'Muhammad Inzamam Daud Abbasi',
  },
  {
    id: '3',
    stdArid: '2019-arid-2452',
    userImg: require('../assets/users/arham.jpg'),
    messageTime: 'student',
    messageText:
      'Arham Ali Khan',
  },
  {
    id: '4',
    stdArid: '2019-arid-2454',
    userImg: require('../assets/users/basit.jpg'),
    messageTime: 'student',
    messageText:
      'Basit Ali Abbasi',
  },
    {
    id: '5',
    stdArid: '2019-arid-2480',
    userImg: require('../assets/users/cr.jpg'),
    messageTime: 'student',
    messageText:
      'Muhammad Aqib Javed',
  },
    {
    id: '6',
    stdArid: '2019-arid-2445',
    userImg: require('../assets/users/ali.jpg'),
    messageTime: 'student',
    messageText:
      'Ali Hassan',
  },
    {
    id: '7',
    stdArid: '2019-arid-2515',
    userImg: require('../assets/users/soman.jpg'),
    messageTime: 'student',
    messageText:
      'Soman Abid.',
  },
  {
    id: '8',
    stdArid: '2019-arid-2496',
    userImg: require('../assets/users/waqas.jpg'),
    messageTime: 'student',
    messageText:
      'Muhammad Waqas Saleem',
  },
  {
    id: '9',
    stdArid: '2019-arid-2493',
    userImg: require('../assets/users/usama.jpg'),
    messageTime: 'student',
    messageText:
      'Muhammad Usama',
  },
  {
    id: '10',
    stdArid: '2019-arid-2474',
    userImg: require('../assets/users/user-1.jpg'),
    messageTime: 'student',
    messageText:
      'Unknown Person',
  },
];
const StudentListScreen=({route,navigation})=>{
  const[allUsers,setAllUsers]=useState([]);
  const[usersFiltered,setUsersFiltered]=useState([]);
  const[data,setData]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const searchUser=(textToSerach)=>{
    setData(usersFiltered.filter(i=>i.AridNo.toLowerCase().includes(textToSerach.toLowerCase())));
  }
  const getImages=()=>{
    //Api code for fetching data from database goes here
    var InsertApiURL = `http://${mp}/FypApi/api/Student/GetImage`;
    fetch(InsertApiURL,
     {
       method:'GET',
     }
    )
    .then((response)=>response.json())
    .then((response)=>{
      response.forEach(element => {
       setData(data=>[...data,
           {
             StudentId:element.StudentId,
             AridNo:element.AridNo,
             Name:element.Name,
             Image:element.Image,
             ImageType:element.ImageType
           }
         ]);
      })
      //console.log(response);
     // setShowImage(response);
     setIsLoading(false);
    })
    .catch((error)=>{
      alert(error);
      //console.log(error);
    })
  } 
 const getAllStudents=()=>{
 const url = `http://${mp}/FypApi/api/Student/GetSpecStudents2?sid=${foo}`;
 fetch(url,{
     method:'GET',
 }).then((response)=>response.json())
 .then((response)=>{
    response.forEach(element => {
       setData(data=>[...data,
           {
             StudentId:element.StudentId,
             AridNo:element.AridNo,
             Password:element.Password,
             Name:element.Name,
             Image:element.FrontImage,
             ImageType:element.FrontImageType,
             FrontImageName:element.FrontImageName,
             CoverImage:element.CoverImage,
             CoverImageType:element.CoverImageType,
             CoverImageName:element.CoverIamgeName
           }
         ]);
         setUsersFiltered(data=>[...data,
          {
            StudentId:element.StudentId,
            AridNo:element.AridNo,
            Password:element.Password,
            Name:element.Name,
            Image:element.FrontImage,
            ImageType:element.FrontImageType,
            FrontImageName:element.FrontImageName,
            CoverImage:element.CoverImage,
            CoverImageType:element.CoverImageType,
            CoverImageName:element.CoverIamgeName
          }
        ]);
   });
   setIsLoading(false);
     })
 .catch((error)=>{alert(error)})
 }
useEffect(()=>{getAllStudents();},[]);
    return (
      <Container>
      {isLoading==true ?
      <View style={styles.container}><ActivityIndicator size={'large'} color="red"/></View>
      :
      <Container>
      <Header style={{backgroundColor:'white'}} searchBar rounded>
      <Item style={{backgroundColor:'white',borderColor:'red',borderWidth:3,borderRadius:20}}>
      <Icon name="search" />
      <Input placeholder="search student here" onChangeText={(text)=>{searchUser(text);}}/>
      </Item>
      </Header>
      <ContainerLst>
      <View style={{flexDirection:'row',alignItems:'baseline'}}>       
      <Text style={{fontSize:18,fontWeight:"bold",marginRight:145,marginTop:5}}>Show Old Images</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled} 
        />
       </View>
        <FlatList 
          data={data}
          keyExtractor={item=>item.StudentId}
            renderItem={({item}) => (
            <Card onPress={() =>navigation.navigate('FriendsProfile',{Name:item.Name,StudentId:item.StudentId})}>
              <UserInfo>
                {isEnabled==false ?
                <UserImgWrapper>
                  {item.Image!='N/A'?
                  // <UserImg source={{uri:`data:${item.ImageType};base64,${item.Image}`}} />
                  <UserImg source={{uri:`http://192.168.43.186/FypApi/Photos/${item.FrontImageName}`}} />
                  :
                  <UserImg source={require('../assets/emptyprofile.jpg')} />
                  }
                </UserImgWrapper>
                :
                <UserImgWrapper>
                {item.Image!='N/A'?
                //<UserImg source={{uri:`data:${item.CoverImageType};base64,${item.CoverImage}`}} />
                <UserImg source={{uri:`http://192.168.43.186/FypApi/Photos/${item.CoverImageName}`}} />
                :
                <UserImg source={require('../assets/emptyprofile.jpg')} />
                }
               </UserImgWrapper>
                }
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.AridNo}</UserName>
                    <PostTime>{'student'}</PostTime>
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
export default StudentListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});