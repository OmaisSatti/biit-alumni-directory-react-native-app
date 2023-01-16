import React,{useState,useEffect} from 'react';
import { View, Text,Button,StyleSheet,Image,StatusBar,TextInput,ScrollView,LogBox,Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';
import { TouchableOpacity } from 'react-native-gesture-handler';
 function CreatePost() {
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const [skill,setSkill]=useState('Android Developer')
  const[city,setCity]=useState('Rawalpindi');
  const savePost= () => {   
    console.log('...................................');
    const data = new FormData();
    data.append('Skill',`${skill}`);
    data.append('City',`${city}`);
    data.append('Post',`${post}`);
    data.append('StudentId',`${foo}`);
    if(image!=null){
    let imageName = image.substring(image.lastIndexOf('/') + 1, image.length);
    data.append('FrontImage',{uri: image, name: imageName,type:'image/jpeg'});
    console.log('Data ',JSON.stringify(data));
    }
    if(post.length==0){
      alert('can not share empty post');
    }else{
      var InsertApiURL = `http://${mp}/FypApi/api/Student/SavePost`;
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
  const getData=()=>{
    alert(skill+":"+city+":"+post+":"+image);
  }
  useEffect(() => {
    LogBox.ignoreLogs(['If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation']);}, []);
  return (
       <ScrollView contentContainerStyle={myStyle.container}>
       {foo!=1002?
       <ScrollView contentContainerStyle={myStyle.container}>
       <View style={{flexDirection:'row'}}>
       <Text style={{marginLeft:15,width:'40%',marginTop:15,fontSize:18,fontWeight:'bold',fontFamily:'fantasy'}}>Required Skills</Text>
       <Picker style={{width:'50%'}} onValueChange={(txt)=>setSkill(txt)}>
       <Picker.Item label="Web Developer" value="Web Developer" />
       <Picker.Item label="Android Developer" value="Android Developer" />
       <Picker.Item label="Desktop Developer" value="Desktop Developer" />
       <Picker.Item label="Flutter Developer" value="Flutter Developer" />
       <Picker.Item label="React Developer" value="React Developer" />
       <Picker.Item label="Asp.Net Developer" value="Asp.Net Developer" />
       <Picker.Item label="Ios Developer" value="Ios Developer"/>
       <Picker.Item label="Php Developer" value="Php Developer"/>
       <Picker.Item label="Python Developer" value="Python Developer"/>
       <Picker.Item label="Java Developer" value="Java Developer"/>
       <Picker.Item label="C# Developer" value="C# Developer"/>
       <Picker.Item label="Swift Developer" value="Swift Developer"/>
       <Picker.Item label="C++ Developer" value="C++ Developer"/>
       </Picker>
       </View>
       <View style={{flexDirection:'row'}}>
       <Text style={{marginLeft:15,width:'40%',marginTop:15,fontSize:18,fontWeight:'bold',fontFamily:'fantasy'}}>Available City</Text>
       <Picker style={{width:'50%'}} onValueChange={(txt)=>setCity(txt)}>
       <Picker.Item label="Rawalpindi" value="Rawalpindi" />
       <Picker.Item label="Multan" value="Multan" />
       <Picker.Item label="Lahore" value="Lahore" />
       <Picker.Item label="Kahuta" value="Kahuta" />
       <Picker.Item label="Karachi" value="Karachi" />
       <Picker.Item label="Islamabad" value="Islamabad" />
       <Picker.Item label="Faisalabad" value="Faisalabad" />
       <Picker.Item label="Gujranwala" value="Gujranwala" />
       <Picker.Item label="Quetta" value="Quetta" />
       <Picker.Item label="Hyderabad" value="Hyderabad" />
       </Picker>
       </View>
       <Pressable style={myStyle.userBtn} onPress={savePost}>
       <Text style={myStyle.btnText}>Share Post</Text></Pressable>
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
      :
      <View><Text style={{fontFamily:'fantasy',fontSize:18}}>Guest can't create post</Text></View>
      }
    </ScrollView>
  )}
export default CreatePost;
const myStyle=StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
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
      backgroundColor:'#fff',
      padding:9,
      borderColor:'#08d4c4',
      borderWidth:2,
      width:'50%',
      marginTop:10,
      borderRadius:25,
      alignSelf:'center',
  
    },
    btnText:{
      fontSize:15,
      textAlign:'center',
      color:'black',
      fontWeight:'bold',
      alignSelf:'center',
      fontFamily:'fantasy'
    },
    img:{
      width:100,
      height:100,
      borderRadius:60,
      resizeMode: "cover"
    },
  })