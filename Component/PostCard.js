import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const PostCard=({item,navigation})=>{
//  const likeIconColor=item.liked ? '#2e64e5' : '#333'  
//  let likeText='';
//  let  commentText='';
//   if (item.likes == 1) {
//     likeText = '1 Like';
//   } else if (item.likes > 1) {
//     likeText = item.likes + ' Likes';
//   } else {
//     likeText = 'Like';
//   }
//   if (item.comments == 1) {
//     commentText = '1 Comment';
//   } else if (item.comments > 1) {
//     commentText = item.comments + ' Comments';
//   } else {
//     commentText = 'Comment';
//   }
       return(
        <Card>
          <UserInfo onPress={()=>navigation.navigate('FriendsProfile')}>
          {item.FrontImage !=null ? <UserImg source={{uri:`data:${item.FrontImageType};base64,${item.FrontImage}`}} />
          :
          <UserImg source={require('../assets/emptyprofile.jpg')}/>
          }
           <UserInfoText>
            <UserName>{item.Name}</UserName>
            <PostTime>{'12:00'}</PostTime>
           </UserInfoText>
          </UserInfo>
          <PostText>{item.Post}</PostText>
          {item.Image !=null ? <PostImg source={{uri:`data:${item.ImageType};base64,${item.Image}`}} /> : <Divider />}
          <InteractionWrapper>
            <Interaction active={true}>
              <MaterialCommunityIcons name="heart-outline" size={25} color='blue'/>
              <InteractionText>2</InteractionText>
            </Interaction>
            <Interaction>
              <MaterialCommunityIcons name="comment-outline" size={25}/>
              <InteractionText>1k</InteractionText>
            </Interaction>
          </InteractionWrapper>
        </Card>
       );
  }
  export default PostCard;
  