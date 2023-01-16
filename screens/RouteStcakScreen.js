import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen.js';
import FindAccount from './FindAccount';
import LoginScreen from  './LoginScreen.js';
import AdminPanel from './AdminPanel.js';
import AdminLogin from './AdminLogin.js';
import AdminScreen from './AdminScreen.js';
import CreateAdmin from './CreateAdmin.js';
import ForgetPassword from './ForgetPassword.js';
import ShowProfile from './ShowProfile.js';
import SeeProfile from './SeeProfile.js';
import SearchStudent from './SearchStudent.js';
import FriendsProfile from './FriendsProfile.js';
import StudentSurveyRequest from './StudentSurveyRequest';
import CreatePost from './CreatePost';
import SimplePost from './SimplePost';
import AdminJobPost from './AdminJobPost';
import PostRequest from './PostRequest';
import PostDataDivide from './PostDataDivide';
import CreateSurvey from './CreateSurvey';
import AddQuestion from './AddQuestion';
import FeedbackSurvey from './FeedbackSurvey';
import SurveyList from './SurveyList';
import Verification from './Varification.js';
import ResetAccount from './ResetAccount.js';
const RouteStack = createStackNavigator();
const RouteStackScreen=()=> {
  return (
      <RouteStack.Navigator>
       {/* <RouteStack.Screen name="Biit Alumni Directory" component={SplashScreen} options={{ headerShown: false }} /> */}
       <RouteStack.Screen name="AdminLogin"  component={AdminLogin} />
       <RouteStack.Screen name="Login" component={LoginScreen}  />
       <RouteStack.Screen name="FindAccount" component={FindAccount} />
       <RouteStack.Screen name="ForgetPassword" component={ForgetPassword} />
       <RouteStack.Screen name="ShowProfile" component={ShowProfile} />
       <RouteStack.Screen name="SeeProfile"   component={SeeProfile} />
       <RouteStack.Screen name="SearchStudent"   component={SearchStudent} />
       <RouteStack.Screen name="FriendsProfile"  component={FriendsProfile} />
       <RouteStack.Screen name="AdminPanel"  component={AdminPanel} />
       <RouteStack.Screen name="Admin"  component={AdminScreen} />
       <RouteStack.Screen name="CreateAdmin"  component={CreateAdmin} />
       <RouteStack.Screen name="SimplePost"  component={SimplePost} />
       <RouteStack.Screen name="CreatePost"  component={CreatePost} />
       <RouteStack.Screen name="StudentSurveyRequest"  component={StudentSurveyRequest} />
       <RouteStack.Screen name="AdminJobPost"  component={AdminJobPost} />
       <RouteStack.Screen name="PostRequest"  component={PostRequest} />
       <RouteStack.Screen name="PostDetails"  component={PostDataDivide} />
       <RouteStack.Screen name="CreateSurvey"  component={CreateSurvey} />
       <RouteStack.Screen name="AddQuestion"  component={AddQuestion} />
       <RouteStack.Screen name="SurveyList"  component={SurveyList} />
       <RouteStack.Screen name="FeedbackSurvey"  component={FeedbackSurvey} />
       <RouteStack.Screen name="Verification"  component={Verification} />
       <RouteStack.Screen name="ResetAccount"  component={ResetAccount} />
      </RouteStack.Navigator>
  );
}
export default RouteStackScreen;