import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AdminJobPost from './AdminJobPost';
import SimplePost from './SimplePost';
import PostRequest from './PostRequest';
import { color } from 'react-native-reanimated';
const Tab = createMaterialTopTabNavigator();
export default function PostDataDivide() {
  return (
    <Tab.Navigator 
    tabBarOptions={{
      inactiveTintColor:'#D3D3D3',
      indicatorStyle:{
          backgroundColor: '#08d4c4',
      },
  }}
    >
      <Tab.Screen name="SimplePost" component={SimplePost} />
      <Tab.Screen name="JobPost" component={AdminJobPost} />
      <Tab.Screen name="PostRequest" component={PostRequest} />
    </Tab.Navigator>
  );
}