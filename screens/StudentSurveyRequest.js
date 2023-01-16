import { Toast } from "native-base";
import React,{useState,useEffect,useCallBack} from "react";
import {StyleSheet,View,Text,FlatList,TouchableOpacity,ToastAndroid,ActivityIndicator,Alert} from 'react-native';
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
const StudentSurveyRequest=()=>{
    const[data,setData]=useState([]);
    const[frontImage,setFrontImage]=useState('');
    const[frontImageType,setFrontImageType]=useState('');
    const[coverImage,setCoverImage]=useState('');
    const[coverImageType,setCoverImageType]=useState('');
    const[frontImageName,setFrontImageName]=useState('');
    const[coverImageName,setCoverImageName]=useState('');
    const[approveStatus,setApproveStatus]=useState('Approved');
    const[rejectStatus,setRejectStatus]=useState('Rejected');
    const[loading,setLoading]=useState(true);
    const getAllStudents=()=>{
      const url = `http://${mp}/FypApi/api/Student/GetPendingSurveyRequest`;
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
                  FrontImage:element.FrontImage,
                  FrontImageType:element.FrontImageType,
                  FrontImageName:element.FrontImageName,
                  CoverImage:element.CoverImage,
                  CoverImageType:element.CoverImageType,
                  CoverImageName:element.CoverIamgeName 
                }
              ]);
            //console.log(element.StudentId,element.AridNo,":",element.Name,":",element.Password);
        });
        setLoading(false);
          })
      .catch((error)=>{alert(error)})
     }
    useEffect(()=>{getAllStudents();},[]);
    const gindStudent=(sid)=>{
      var URL = `http://${mp}/FypApi/api/Student/?sid=${sid}`;
      fetch(URL,
       {
         method:'GET',
       }
      )
      .then((response)=>response.json())
      .then((response)=>{
        if(response){
        const newData=[... data];
        const prevIndex=data.findIndex(item=>item.StudentId==sid);
        newData.splice(prevIndex,1);
        setData(newData)
        }
      })
      .catch((error)=>{alert(error)})
    }
    const rejectStudent=(sid)=>{
      const url = `http://${mp}/FypApi/api/Student/UpdateSurveyRequest?sid=${sid}&status=${rejectStatus}`;
      fetch(url,{
          method:'GET',
      }).then((response)=>response.json())
      .then((response)=>{
        if(response){
          const newData=[... data];
          const prevIndex=data.findIndex(item=>item.StudentId==sid);
          newData.splice(prevIndex,1);
          setData(newData)
          }
        }).catch((error)=>{alert(error)})     
     }
    const approveStudent=(sid)=>{
      const url = `http://${mp}/FypApi/api/Student/UpdateSurveyRequest?sid=${sid}&status=${approveStatus}`;
      fetch(url,{
          method:'GET',
      }).then((response)=>response.json())
      .then((response)=>{
        if(response){
          const newData=[... data];
          const prevIndex=data.findIndex(item=>item.StudentId==sid);
          newData.splice(prevIndex,1);
          setData(newData)
          }
        }).catch((error)=>{alert(error)})     
     }
    var updateStudent=(navigation)=>{
      var Status ='Valid';
      var InsertApiURL = `http://${mp}/FypApi/api/Student/UpdateStudentStatus`;
      var headers={
          'Accept':'application/json',
          'Content-Type':'application/json'
      };
      var Data={
          StudentId:1,
          AridNo:'',
          Password:'', 
          Status:Status      
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
          alert(response.toString());
        })
        .catch((error)=>{
          alert("Error :"+error);
        })
    }
    const showAlert1=(sid)=>{  
      Alert.alert(  
          'Warning',  
          'You really want reject this request?',  
          [  
              {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel',},  
              {text: 'Reject', onPress: () => {rejectStudent(sid)}},  
          ]  
      );
    }
    const showAlert2=(sid)=>{  
      Alert.alert(  
          'Warning',  
          'You really want approve this request?',  
          [  
              {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel',},  
              {text: 'Approve', onPress: () => {approveStudent(sid)}},  
          ]  
      );
    }
     return(
      <ContainerLst>
      {loading==true ?
      <View style={styles.container}><ActivityIndicator size={'large'} color="red"/></View>
      :
        <FlatList 
          data={data}
          keyExtractor={item=>item.StudentId}
          renderItem={({item}) => (
            <Card>
              <UserInfo>
              <UserImgWrapper>   
                  {/* <UserImg source={require('../assets/admin1.jpg')} /> */}
                  <UserImg source={{uri:`http://${mp}/FypApi/Photos/${item.FrontImageName}`}} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.Name}</UserName>
                    <PostTime>Student</PostTime>
                  </UserInfoText>
                  <MessageText>{item.AridNo}</MessageText>
                  <UserInfoText>
                    <RemoveBtn onPress={()=>{showAlert1(item.StudentId)}}><Text style={{fontWeight:'bold',fontSize:15}}>Reject</Text></RemoveBtn>
                    <UpdateBtn onPress={()=>showAlert2(item.StudentId)}><Text style={{fontWeight:'bold',fontSize:15}}>Approve</Text></UpdateBtn>
                  </UserInfoText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
        }
      </ContainerLst>
    );
}
export default StudentSurveyRequest;
const styles = StyleSheet.create({
   container:{
    alignItems:'center',
    justifyContent:'center',
    flex:1
   },
   card:{
   borderRadius:10,
   padding:8,
   margin:8,
   backgroundColor:'#dee0e3',
   shadowColor: "black",
   shadowOffset: {
      width: 0,
      height: 12,
   },
   shadowOpacity: 0.2,
   shadowRadius: 10.00,
   elevation: 2,
  },
  text:{
    fontSize:15,
    color:'#000',
    textAlign:'right',
    flex:1
  },
   btnTouchable:{
        width:"46%",
        backgroundColor:'#F89221',
        height:30,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginTop:20,
        marginRight:10,
        marginLeft:5

    }
})








