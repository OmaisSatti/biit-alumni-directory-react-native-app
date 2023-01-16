import React,{useState,useEffect} from 'react';
import { View, Text,Button,StyleSheet,Image,StatusBar,TextInput,ScrollView,LogBox,Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import { FloatingAction } from "react-native-floating-action";
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
const actions = [
  {
    text: "Accessibility",
    icon: require("../assets/logo1.jpg"),
    name: "bt_accessibility",
    position: 2
  },
  {
    text: "Language",
    icon: require("../assets/logo1.jpg"),
    name: "bt_language",
    position: 1
  },
];
 function SimplePost() {
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const savePost= () => {   
    console.log('...................................');
    var currentDate=new Date();
    var today=currentDate.getMonth()+"-"+currentDate.getDate()+"-"+currentDate.getFullYear()+" "+currentDate.getHours()+":"+currentDate.getMinutes();
    const data = new FormData();
    data.append('Skill',`${null}`);
    data.append('City',`${null}`);
    data.append('Post',`${today}`);
    data.append('AdminId',`${adfoo}`);
    if(image.length>0){
    let imageName = image.substring(image.lastIndexOf('/') + 1, image.length);
    data.append('Image',{uri: image, name: imageName,type:'image/jpeg'});
    console.log('Data ',JSON.stringify(data));
    }
    if(post.length==0){
      alert('can not share empty post');
    }else{
      var InsertApiURL = `http://${mp}/FypApi/api/Student/SaveAdminPost`;
      var headers={
        'Content-Type': 'multipart/form-data',
      };
      fetch(InsertApiURL,
       {
         method:'POST',
         headers:headers,
         body:  data
       }
      )
      .then((response)=>response.json())
      .then((response)=>
      {
         alert(response)
         console.log(response);
      })
      .catch((error)=>{
        let errMsg = "Error :"+error;
        alert(data)
        ToastAndroid.show(errMsg,ToastAndroid.LONG);
        console.log("Error :"+error);
      });
    }
  }
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      setImage(image.path);
    }).catch((error)=>{
      alert('abc error here');
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
     cropping: true,
    }).then((image) => {
      setImage(image.path);
    });
  };
  useEffect(() => {
    LogBox.ignoreLogs(['If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation']);}, []);
  return (
    <ScrollView contentContainerStyle={myStyle.container}>
       <Pressable style={myStyle.userBtn} onPress={()=>savePost()}><Text style={{fontWeight:'bold',alignSelf:'center'}}>Share Post</Text></Pressable>
       <InputWrapper>
        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
      {image !=null ? <AddImage source={{uri: image}} /> : null}
      </InputWrapper>
      <ActionButton buttonColor="#08d4c4" >
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={myStyle.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={myStyle.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
  </ScrollView>
  )}
export default SimplePost;
const myStyle=StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
    Welcome:{
      fontSize:20,
      textAlign:'center',
      margin:10,
      color:'black'
    },
    input:{
        textAlignVertical: "top",
        borderColor:'#08d4c4',
        borderWidth:1,
        height:'40%',
        fontSize:18,
        marginTop:10,
        width:'95%',
        borderRadius:5
    },
    userBtn:{
      backgroundColor:'#08d4c4',
      padding:9,
      width:'50%',
      marginTop:10,
      borderRadius:25,
      alignSelf:'center'
  
    },
    btnText:{
      fontSize:18,
      textAlign:'center',
      color:'white',
      fontWeight:'bold'
    },
    img:{
      width:100,
      height:100,
      borderRadius:60,
      resizeMode: "cover"
    },
  })