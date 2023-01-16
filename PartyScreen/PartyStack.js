import React,{useLayoutEffect} from 'react';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import SplashScreen from './SplashScreen';
import AddParty from './AddParty';
import ViewParty from './ViewParty';
import HistoryParty from './HistoryParty';
import AddMember from './AddMember';
import AllMember from './AllMember';
import SelectMembers from './SelectMembers';
import FutureParty from './FutureParty';
import PartyInfo from './PartyInfo';
import DrawCommittee from './DrawCommittee';
import Bidding from './Bidding'
import AllBidding from './AllBidding';
import OnBidding from './OnBidding';
import SelectBid from './SelectBid';
import InviteMember from './InviteMember';
import ShowParty from './ShowParty'
import MyCommittee from './MyCommittee'
import { MemberRequest } from './MemberRequest';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions} from '@react-navigation/native';
const Stack = createStackNavigator();
function MyStack() {
        return (
                <NavigationContainer>
                <Stack.Navigator>
                        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="SignupScreen" component={SignupScreen} />
                        <Stack.Screen name="KittyParty" component={MainScreen} />
                        <Stack.Screen name="AddParty" component={AddParty} />
                        <Stack.Screen name="ViewParty" component={ViewParty} />
                        <Stack.Screen name="HistoryParty" component={HistoryParty} />
                        <Stack.Screen name="AddMember" component={AddMember} />
                        <Stack.Screen name="AllMember" component={AllMember} />
                        <Stack.Screen name="SelectMembers" component={SelectMembers} />
                        <Stack.Screen name="PartyInfo" component={PartyInfo} />
                        <Stack.Screen name="MemberRequest" component={MemberRequest} />
                        <Stack.Screen name="FutureParty" component={FutureParty} />
                        <Stack.Screen name="DrawCommittee" component={DrawCommittee} />
                        <Stack.Screen name="Bidding" component={Bidding} />
                        <Stack.Screen name="AllBidding" component={AllBidding} />
                        <Stack.Screen name="OnBidding" component={OnBidding} />
                        <Stack.Screen name="SelectBid" component={SelectBid} />
                        <Stack.Screen name="InviteMember" component={InviteMember} />
                        <Stack.Screen name="ShowParty" component={ShowParty} />
                        <Stack.Screen name="MyCommittee" component={MyCommittee} />
                      
                </Stack.Navigator>
                </NavigationContainer>
        );
}
export default MyStack;