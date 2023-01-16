import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList,Alert,ActivityIndicator} from 'react-native';
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
  RemoveBtn,
  UpdateBtn
} from '../styles/MessageStyles';
const adminData= [
  {
    id: '1',
    stdArid: '0300 5137383',
    userImg: require('../assets/drmunir.jpg'),
    messageTime: 'Admin',
    messageText:
      'Doctor Munir Ahmed(HOD)',
  },
  {
    id: '2',
    stdArid: '0315 5425199',
    userImg: require('../assets/sirshahid.jpg'),
    messageTime: 'Admin',
    messageText:
      'Sir Shahid Jamil',
  },
  {
    id: '3',
    stdArid: '0300 5733768',
    userImg: require('../assets/drfarhan.jpg'),
    messageTime: 'Admin',
    messageText:
      'Doctor Farhan Shabbir Ujagar',
  },
  {
    id: '4',
    stdArid: '0302 5698539',
    userImg: require('../assets/siramir.jpg'),
    messageTime: 'Admin',
    messageText:
      'Sir Amir',
  },
  {
    id: '5',
    stdArid: '0302 8979445',
    userImg: require('../assets/sirazhar.jpg'),
    messageTime: 'Admin',
    messageText:
      'Sir Azhar Jamil',
  },
  {
    id: '6',
    stdArid: '0302 5367513',
    userImg: require('../assets/sirzahid.jpg'),
    messageTime: 'Admin',
    messageText:
      'Sir Zahid Ahmed',
  },
  {
    id: '7',
    stdArid: '0312 6466556',
    userImg: require('../assets/sirahsan.jpg'),
    messageTime: 'Admin',
    messageText:
      'Sir Ahsan Ijaz',
  },
];
const AdminScreen = ({navigation}) => {
  const [loading,setLoading]=useState(true);
  const[data,setData]=useState([
    //{"AdminId":101,"Name":'Omais Satti',"Contact":'03408149083','Cnic':'37402-0606728-9','Password':123},
   // {"AdminId":102,"Name":'Inzamam Abbasi',"Contact":'03012345678','Cnic':'37402-0606728-9','Password':123},
  ]);
  const getAllAdmin=()=>{
    const url = `http://${mp}/FypApi/api/Student/getAdminsInfo?aid=${adfoo}`;
    fetch(url,{
        method:'GET',
    }).then((response)=>response.json())
    .then((response)=>{
       response.forEach(element => {
          setData(data=>[...data,
              {
                AdminId:element.AdminId,
                Name:element.Name,
                Contact:element.Contact,
                Cnic:element.Cnic,
                Password:element.Password,
              }
            ]);
        //console.warn(element.AdminId,":",element.Name,":",element.Contact,":",element.Cnic,":",element.Password);
      });
      filteredData:data;
      setLoading(false);
        })
    .catch((error)=>{alert(error)})
  }
  const removeAdmin=(aid)=>{
      var URL = `http://${mp}/FypApi/api/Student/DeleteAdmin?aid=${aid}`;
      fetch(URL,
       {
         method:'GET',
       }
      )
      .then((response)=>response.json())
      .then((response)=>{
        if(response){
        const newData=[... data];
        const prevIndex=data.findIndex(item=>item.AdminId==aid);
        newData.splice(prevIndex,1);
        setData(newData)
        }
      })
      .catch((error)=>{alert(error)})
  }
  useEffect(()=>{getAllAdmin();},[])
 const showAlert1=(aid)=>{  
    Alert.alert(  
        'Warning',  
        'You really want to delete this admin?',  
        [  
            {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel',},  
            {text: 'Delete', onPress: () => {removeAdmin(aid)}},  
        ]  
    );
  }
  const showAlert2=()=>{  
    Alert.alert(  
        'Attention!',  
        'Update will changes the database continue?',  
        [  
            {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel',},  
            {text: 'Update', onPress: () =>{navigation.navigate('CreateAdmin')}},  
        ]  
    );
  }
    return (
      <ContainerLst>
      {loading==true ?
      <View style={styles.container}><ActivityIndicator size={'large'} color="red"/></View>
      :
        <FlatList 
          data={data}
          keyExtractor={item=>item.AdminId}
          renderItem={({item}) => (
            <Card>
              <UserInfo>
                <UserImgWrapper>   
                  <UserImg source={require('../assets/admin1.jpg')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.Contact}</UserName>
                    <PostTime>Admin</PostTime>
                  </UserInfoText>
                  <MessageText>{item.Name}</MessageText>
                  <UserInfoText>
                    {adfoo==1008?
                    <RemoveBtn onPress={()=>{showAlert1(item.AdminId)}}><Text style={{fontWeight:'bold',fontSize:15}}>Remove</Text></RemoveBtn>
                    :
                    <View></View>
                    }
                    {/* <UpdateBtn onPress={()=>navigation.navigate('CreateAdmin',{AdminId:item.AdminId,Name:item.Name,Contact:item.Contact,Cnic:item.Cnic,Password:item.Password})}><Text style={{fontWeight:'bold',fontSize:15}}>Update</Text></UpdateBtn> */}
                  </UserInfoText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
          }
      </ContainerLst>
    );
};
export default AdminScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});