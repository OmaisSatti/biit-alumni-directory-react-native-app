import React,{useState,useEffect} from 'react';
import {FlatList,View,ActivityIndicator,RefreshControl} from 'react-native';
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
 function Notification({navigation}) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [skill,setSkill]=useState('Android Developer')
  const[city,setCity]=useState('Rawalpindi');
  const[imageType,setImageType]=useState('');
  const[name,setName]=useState('');
  const[data,setData]=useState([]);
  const[dated,setDated]=useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const getAllPost=()=>{
    const url = `http://${mp}/FypApi/api/Student/GetAllAdminPost?sid=${foo}`;
    fetch(url,{
        method:'GET',
    }).then((response)=>response.json())
    .then((response)=>{
     response.forEach(element => {
        setData(data=>[...data,
            {
              Dated:element.Dated,
              Post:element.Post,
              Image:element.Image,
              ImageType:element.ImageType,
              Name:element.Name,
              AdminId:element.AdminId
            }
          ]);
          setPost(element.Post);
          setImageType(element.ImageType);
          setImage(element.Image);
          setName(element.Name);
          setDated(element.Dated);
        });
        setLoading(false);
      }).catch((error)=>{alert(error)})     
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
        refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={()=>alert('waiting for refresh')}/>}
        renderItem={({item})=>{
        return <Card>
        <UserInfo onPress={()=>alert('abc')}>
        <UserImg source={require('../assets/admin1.jpg')}/>
         <UserInfoText>
          <UserName>{item.Name}</UserName>
          <PostTime>{item.Dated}</PostTime>
         </UserInfoText>
        </UserInfo>
        <PostText>{item.Post}</PostText>
        {item.Image !=null ? <PostImg source={{uri:`data:${item.ImageType};base64,${item.Image}`}} /> : <Divider />}
          {/* <InteractionWrapper>
          <Interaction active={true}>
            <MaterialCommunityIcons name="heart-outline" size={25} color='blue'/>
            <InteractionText>2</InteractionText>
          </Interaction>
          <Interaction>
            <MaterialCommunityIcons name="comment-outline" size={25}/>
            <InteractionText>1</InteractionText>
          </Interaction>
        </InteractionWrapper> */}
      </Card>
      }}
      keyExtractor={item=>item.AdminId} />}
    </Container>
  );
}
export default Notification;