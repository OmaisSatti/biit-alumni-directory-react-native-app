import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StudentListScreen from './StudentListScreen';
import AllAlumni from './AllAlumni';
import { color } from 'react-native-reanimated';
const Tab = createMaterialTopTabNavigator();
export default function DivideData() {
  return (
    <Tab.Navigator 
    tabBarOptions={{
      inactiveTintColor:'#D3D3D3',
      indicatorStyle:{
          backgroundColor: '#08d4c4',
      },
  }}
    >
      <Tab.Screen name="SectionFellows" component={StudentListScreen} />
      <Tab.Screen name="AllAlumni" component={AllAlumni} />
    </Tab.Navigator>
  );
}