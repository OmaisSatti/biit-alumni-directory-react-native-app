import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FutureParty from './FutureParty';
import ViewParty from './ViewParty';
import { color } from 'react-native-reanimated';
const Tab = createMaterialTopTabNavigator();
export default function PartyInfo() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                inactiveTintColor: '#D3D3D3',
                indicatorStyle: {
                    backgroundColor: '#08d4c4',
                },
            }}
        >
            <Tab.Screen name="Present" component={ViewParty} />
            <Tab.Screen name="UpComing" component={FutureParty} />
        </Tab.Navigator>
    );
}