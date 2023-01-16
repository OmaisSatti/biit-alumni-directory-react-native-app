import React,{useState,useEffect} from 'react';
import {FlatList,View,ActivityIndicator,RefreshControl,StyleSheet,ToastAndroid,TouchableOpacity,Text} from 'react-native';
import PostCard from '../Component/PostCard';
import {Container,} from '../styles/FeedStyles.js';
import {
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    postTime: '4 mins ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-3.jpg'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    postTime: '2 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    postTime: '1 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-2.jpg'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    postTime: '1 day ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-4.jpg'),
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    postTime: '2 days ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];
 function PostRequest({navigation}) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [skill,setSkill]=useState('Android Developer')
  const[city,setCity]=useState('Rawalpindi');
  const[imageType,setImageType]=useState('');
  const[userImageType,setUserImageType]=useState('');
  const[userImage,setUserImage]=useState(null);
  const[name,setName]=useState('');
  const[data,setData]=useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const getAllPost=()=>{
    const url = `http://${mp}/FypApi/api/Student/GetPendingPost`;
    fetch(url,{
        method:'GET',
    }).then((response)=>response.json())
    .then((response)=>{
     response.forEach(element => {
        setData(data=>[...data,
            {
              PostId:element.PostId,
              Post:element.Post,
              Image:element.Image,
              ImageType:element.ImageType,
              FrontImage:element.FrontImage,
              FrontImageType:element.FrontImageType,
              Name:element.Name,
              StudentId:element.StudentId,
              Dated:element.Dated
            }
          ]);
          setPost(element.Post);
          setImageType(element.ImageType);
          setImage(element.Image);
          setUserImage(element.FrontImage);
          setUserImageType(element.FrontImageType)
          setName(element.Name);
        });
        setLoading(false);
      }).catch((error)=>{alert(error)})     
  }
  var acceptPost=(pid)=>{
      var Status="Approved";
      var InsertApiURL = `http://${mp}/FypApi/api/Student/UpdatePostStatus`;
      var headers={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
      var Data={
        PostId:pid,
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
        let msg=response.toString();
        if(msg=="true"){
        const newData=[... data];
        const prevIndex=data.findIndex(item=>item.PostId==pid);
        newData.splice(prevIndex,1);
        setData(newData)
        ToastAndroid.show('Request approved successfully', ToastAndroid.SHORT);
        }else{
          alert('Post Approved Failed');
        }
      })
      .catch((error)=>{
        alert("Error :"+error);
      })
   }
   var rejectPost=(pid)=>{
    var Status="Reject";
    var InsertApiURL = `http://${mp}6/FypApi/api/Student/UpdatePostStatus`;
    var headers={
      'Accept':'application/json',
      'Content-Type':'application/json'
    };
    var Data={
      PostId:pid,
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
      let msg=response.toString();
      if(msg=="true"){
        const newData=[... data];
        const prevIndex=data.findIndex(item=>item.PostId==pid);
        newData.splice(prevIndex,1);
        setData(newData)
        ToastAndroid.show('Request rejected successfully', ToastAndroid.SHORT);
      }else{
        alert('Something went wrong');
      }
    })
    .catch((error)=>{
      alert("Error :"+error);
    })
 }
  useEffect(()=>{getAllPost();},[]);
  const handleRefresh=()=>{
    setData([]);
    getAllPost();
  }
  return (
    <Container>
      {loading==true ?
      <View><ActivityIndicator size={'large'} color="red"/></View>
      :
      <FlatList
        data={data}
        renderItem={({item})=>{
        return <Card>
        <UserInfo onPress={()=>alert(item.PostId)}>
        {item.FrontImage !=null ? <UserImg source={{uri:`data:${item.FrontImageType};base64,${item.FrontImage}`}} />
        :
        <UserImg source={require('../assets/emptyprofile.jpg')}/>
        }
         <UserInfoText>
          <UserName>{item.Name}</UserName>
          <PostTime>{item.Dated}</PostTime>
         </UserInfoText>
        </UserInfo>
        <PostText>{item.Post}</PostText>
        {item.Image !=null ? <PostImg source={{uri:`data:${item.ImageType};base64,${item.Image}`}} /> : <Divider />}
        <InteractionWrapper>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginLeft:5}}>
            <TouchableOpacity style={[styles.btnTouchable,{backgroundColor:'green'}]}
             onPress={()=>acceptPost(item.PostId)}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Accept</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnTouchable,{backgroundColor:'red'}]}
             onPress={()=>rejectPost(item.PostId)}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Reject</Text> 
            </TouchableOpacity>
            </View>
        </InteractionWrapper>
      </Card>
      }}
      keyExtractor={item=>item.PostId} />}
    </Container>
  );
}
export default PostRequest;
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