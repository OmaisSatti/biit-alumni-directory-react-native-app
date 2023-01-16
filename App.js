//------------------------- Kitty Party data---------------
import React from 'react';
import PartyStack from './PartyScreen/PartyStack'
global.mp="192.168.43.186";
const App=()=>{
  return(
    <PartyStack />
  );
};
export default App


//.......................Alumni Directory(Linkedin)-----------------------------------
// import React,{useReducer,useEffect,useMemo,useState,useRef,useContext} from 'react';
// import { NavigationContainer, StackActions} from '@react-navigation/native';
// import RouteStack from './screens/RouteStcakScreen.js'
// import AsyncStorage from '@react-native-async-storage/async-storage';;
// import { AuthContext } from './Component/context';
// import { StatusBar,StyleSheet,LogBox,} from 'react-native';
// import SplashScreen from './screens/SplashScreen.js';
// import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
// import MainScreen from './screens/MainScreen.js';
// import SeeProfile from './screens/SeeProfile.js';
// import SearchStudent from './screens/SearchStudent.js';
// import StudentListScreen from './screens/StudentListScreen.js';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { DrawerContent } from './screens/DrawerContent';
// import PostScreen from './screens/PostScreen.js';
// import EditProfile from './screens/EditProfile.js';
// import EducationInfoScreen from './screens/EducationInfoScreen.js';
// import ExperienceInfoScreen from './screens/ExperienceInfoScreen.js';
// import FriendsProfile from './screens/FriendsProfile.js';
// import SearchResults from './screens/SearchResults.js';
// import Icon from 'react-native-vector-icons/Ionicons';
// import CreatePost from './screens/CreatePost.js';
// import AllAlumni from  './screens/AllAlumni';
// import DivideData from './screens/DivideData';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo'
// import  Notification from './screens/Notification';
// import ShowSurvey from './screens/ShowSurvey.js';
// import SurveyNotification from './screens/SurveyNotification.js';
// import ChangePassword from './screens/ChangePassword.js';
// import SkillsEndorcements from './screens/SkillsEndorcements.js';
// import FeedbackSurvey from './screens/FeedbackSurvey.js';
// import CreateSurvey from './screens/CreateSurvey.js';
// import AddQuestion from './screens/AddQuestion.js';
// import SurveyList from './screens/SurveyList.js';
// import MySurveyList from './screens/MySurveyList.js'
// import CreateMySurvey from './screens/CreateMySurvey.js';
// import MySurveyQuestion from './screens/MySurveyQuestion.js';
// const App=({navigation})=> {
//   const Stack = createStackNavigator();
//   const Drawer= createDrawerNavigator();
//   const drawer = useRef(null);
//   global.mp="192.168.43.186";
//   LogBox.ignoreLogs(['Reanimated 2']);
//   const getData = async () => {
//     try {
//       const aridno = await AsyncStorage.getItem('aridno')
//       const password = await AsyncStorage.getItem('password')
//       if(aridno !==null) {
//         console.log(aridno);
//       }
//       if(password !==null) {
//         console.log(password);
//       }
//    } catch(e) {
//    }
//  }
//   // const [isLoading, setIsLoading] = useState(true);
//   // const [userToken, setUserToken] = useState(null);
//   const initialLoginState = {
//     isLoading: true,
//     userToken: null,
//   }
//   const loginReducer = (prevState, action) => {
//     switch (action.type) {
//       case 'RETERIVE_TOKEN':
//         return {
//           ...prevState,
//           userToken: action.token,
//           isLoading: false,
//         };
//       case 'LOGIN':
//         return {
//           ...prevState,
//           userToken: action.token,
//           isLoading: false,
//         };
//       case 'LOGOUT':
//         return {
//           ...prevState,
//           userToken: null,
//           isLoading: false,
//         };
//       case 'REGISTER':
//         return {
//           ...prevState,
//           userToken: action.token,
//           isLoading: false,
//         };
//     }
//   }
//   const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
//   const authContext = useMemo(() => ({
//     signIn: async (response) => {
//       // setIsLoading(false);
//       // setUserToken('fgg');
//       let userToken;
//       userToken = null;
//      // console.log(response);
//       try {
//         userToken = {
//           StudentId: response[0].StudentId,
//           Name: response[0].Name,
//         }
//         global.foo=response[0].StudentId;
//         global.gName=response[0].Name;


//         await AsyncStorage.setItem('userToken', JSON.stringify(userToken));
//       } catch (error) {
//         alert('Error in Async Storage : ', error.Message);
//       }
//       dispatch({ type: 'LOGIN', token: userToken });
//     },
//     signOut: async () => {
//       // setIsLoading(false);
//       // setUserToken(null);

//       try {
//         await AsyncStorage.removeItem('userToken');
//       } catch (error) {
//         alert('Error While Logout: ', error);
//         console.log('Error while Logout: ', error);
//       }
//       dispatch({ type: 'LOGOUT' });

//     },
//     signUp: () => {
//       setIsLoading(false);
//       setUserToken('fgg');
//     },
//   }))

//   useEffect(() => {
//     setTimeout(async () => {
//       // setIsLoading(false);
//       let userToken;
//       global.foo=0;
//       userToken = null;
//       try {
//         userToken = await AsyncStorage.getItem('userToken');
//         console.log(userToken,'....');
//         if (userToken != null) {
//           let parrsedToken = JSON.parse(userToken);
//           global.foo=parrsedToken.StudentId;
//           global.gName=parrsedToken.Name;
//           //userRole = parrsedToken.UserRole;
//         }
//         console.log('---------------------------------');
//       } catch (error) {
//         alert('Error in UseEffect: ', error);
//         console.log('Error in UseEffect: ', error);
//       }
//       dispatch({ type: 'RETERIVE_TOKEN', token: userToken });
//     }, 2000);
//   }, [])
//   if (loginState.isLoading) {
//     return (
//       <SplashScreen />
//     )
//   }
//   return (
//     <AuthContext.Provider value={authContext}>
//     <StatusBar backgroundColor='black' barStyle='light-content' />
//     <NavigationContainer>
//       {
//         loginState.userToken !=null?(
//           <Stack.Navigator>
//           <Stack.Screen name="Biit Alumni Directory" component={MainScreen} />
//           <Stack.Screen name="SeeProfile" component={SeeProfile} />
//           <Stack.Screen name="SearchStudent" component={SearchStudent} />
//           <Stack.Screen name="StudentListScreen" component={StudentListScreen} />
//           <Stack.Screen name="PostScreen" component={PostScreen} />
//           <Stack.Screen name="EditProfile" component={EditProfile} />
//           <Stack.Screen name="Education" component={EducationInfoScreen} />
//           <Stack.Screen name="Experience" component={ExperienceInfoScreen} />
//           <Stack.Screen name="FriendsProfile" component={FriendsProfile} />
//           <Stack.Screen name="SearchResults" component={SearchResults} />
//           <Stack.Screen name="CreatePost"  component={CreatePost} />
//           <Stack.Screen name="AllAlumni" component={AllAlumni} />
//           <Stack.Screen name="DivideData" component={DivideData} />
//           <Stack.Screen name="Notification" component={Notification} />
//           <Stack.Screen name="ShowSurvey" component={ShowSurvey} />
//           <Stack.Screen name="SurveyNotification" component={SurveyNotification} />
//           <Stack.Screen name="ChangePassword" component={ChangePassword} />
//           <Stack.Screen name="SkillsEndorcements" component={SkillsEndorcements} />
//           <Stack.Screen name="FeedbackSurvey" component={FeedbackSurvey} />
//           <Stack.Screen name="CreateSurvey" component={CreateSurvey} />
//           <Stack.Screen name="AddQuestion" component={AddQuestion} />
//           <Stack.Screen name="SurveyList" component={SurveyList} />
//           <Stack.Screen name="MySurveyList" component={MySurveyList} />
//           <Stack.Screen name="CreateMySurvey" component={CreateMySurvey} />
//           <Stack.Screen name="MySurveyQuestion" component={MySurveyQuestion} />
//          </Stack.Navigator>
//         ):(
//           <RouteStack />
//         )
//       }
//     </NavigationContainer>
//     </AuthContext.Provider>
//   );
// }
// export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//   },
//   navigationContainer: {
//     backgroundColor: "#ecf0f1",
//   },
//   paragraph: {
//     padding: 10,
//     fontSize: 15,
//     textAlign: "center"
//   },
//   text:{
//     fontSize:20,
//     fontWeight:'800'
//   }
// });
