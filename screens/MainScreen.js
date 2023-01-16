import React,{useEffect,useContext,useRef,useLayoutEffect,useState} from 'react';
import { ScrollView, StyleSheet,View,LogBox,DrawerLayoutAndroid,TouchableOpacity,Text,BackHandler,Image,StatusBar} from 'react-native'; 
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from  'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import StudentListScreen from './StudentListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import PostScreen from './PostScreen.js';
import ShowProfile from './ShowProfile';
import SeeProfile from './SeeProfile';
import SearchStudent from './SearchStudent';
import DivideData from './DivideData';
import CreatePost from './CreatePost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {AuthContext} from '../Component/context';
import Notification from './Notification';
import ShowSurvey from './ShowSurvey.js';
import { parse } from '@babel/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkillsEndorcements from './SkillsEndorcements';
const Tab = createBottomTabNavigator();
 function MainScreen({route,navigation}) {
    const drawer = useRef(null);
    const[frontImage,setFrontImage]=useState('');
    const[frontImageType,setFrontImageType]=useState('');
    const[loading,setLoading]=useState(true);
    const[data,setData]=useState([]);
    const[want,setWant]=useState();
    const[status,setStatus]=useState('Pending');
    const {signOut}=useContext(AuthContext);
    const getPersonalInfo=()=>{
      const url = `http://${mp}/FypApi/api/Student/GetPersonalInfo?perid=${foo}`;
      fetch(url,{
          method:'GET',
      }).then((response)=>response.json())
      .then((response)=>{
       response.forEach(element => {
          setData(data=>[...data,
              {
                FrontImage:element.FrontImage,
                FrontImageType:element.FrontImageType,
              }
            ]);
            setFrontImage(element.FrontImage);
            setFrontImageType(element.FrontImageType);
          });
          setLoading(false);
        }).catch((error)=>{alert(error)})     
  }
  const getSurveyStatus=()=>{
    const url = `http://${mp}/FypApi/api/Student/GetTrySurveyStudents?sid=${foo}`;
    fetch(url,{
        method:'GET',
    }).then((response)=>response.json())
    .then((response)=>{
     response.forEach(element => {
        setData(data=>[...data,
            {
              StudentId:element.StudentId,
              WantSurvey:element.WantSurvey
            }
          ]);
          setWant(element.WantSurvey);
          console.log("Want survey status is : "+want);
        });
        setLoading(false);
      }).catch((error)=>{alert(error)})     
 }
 const updateSurveyStatus=()=>{
  const url = `http://${mp}/FypApi/api/Student/UpdateSurveyRequest?sid=${foo}&status=${status}`;
  fetch(url,{
      method:'GET',
  }).then((response)=>response.json())
  .then((response)=>{
    if(response=='true')
    {
        console.log(response);
        alert('your request send to admin please wait for approval');
    }else{
      alert('some thing went wrong');
    }
    }).catch((error)=>{alert(error)})     
 }
   useEffect(() => {getPersonalInfo(),getSurveyStatus()},[]);
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
        <View style={{ flexDirection: 'row',marginRight:10, flex: 1, alignItems: 'center',justifyContent:'flex-end', }}>
        <MaterialCommunityIcons  name='dots-vertical' size={30} onPress={()=>drawer.current.openDrawer()}/>
        </View>
        ),});
      return () => {};}, [navigation])
      const navigationView = () => (
      <ScrollView contentContainerStyle={{padding:10}}>
      <View style={{ flexDirection: 'row'}}>
      <View>
      <TouchableOpacity
      style={myStyle.btnTouchable}
      onPress={() => navigation.navigate("SeeProfile")}>
      <Image style={myStyle.img} source={{uri:`data:${frontImageType};base64,${frontImage}`}}/>
      </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'column'}}>
      <Text style={myStyle.btnText}>{gName}</Text>
      <Text style={myStyle.btnTextView}>View your profile</Text>
      </View>
      </View>
      <View style={myStyle.btnSeperator}></View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <Icon name="create" size={35}  color={'#DE3163'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate("Notification")} style={{marginLeft:15}}><Text style={myStyle.text}>Admin Post</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <MaterialCommunityIcons name="account-search" color={'#9A3065'} size={35} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('SearchStudent')}  style={{marginLeft:15}}><Text style={myStyle.text}>
      Search</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <Icon  name="settings-outline" size={35}  color={'#666'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('ChangePassword')}  style={{marginLeft:15}}><Text style={myStyle.text}>Settings</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <Entypo name="users" color={'#138679'} size={35} />
      <TouchableOpacity onPress={() =>navigation.navigate('StudentListScreen')}  style={{marginLeft:15}}><Text style={myStyle.text}>Fellows</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <Icon  name="notifications" size={35}  color={'#666'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('SurveyNotification')}  style={{marginLeft:15}}><Text style={myStyle.text}>Notifications</Text></TouchableOpacity>
      </View>
  
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <Icon name="arrow-redo-circle-sharp" size={35} color={'#9A3065'} backgroundColor={'#ecf0f1'} />
      {want==null || want=='Pending' || want=='Rejected'?
       <TouchableOpacity onPress={()=>updateSurveyStatus()}  style={{marginLeft:15}}><Text style={myStyle.text}>Want Survey</Text></TouchableOpacity>
      :
      <TouchableOpacity onPress={()=>navigation.navigate('CreateMySurvey')}  style={{marginLeft:15}}><Text style={myStyle.text}>Create Survey</Text></TouchableOpacity>
      }
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <View></View>
      <MaterialIcons name="feedback" size={35} color={'#666'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={()=>navigation.navigate('MySurveyList')}  style={{marginLeft:15}}><Text style={myStyle.text}>Survey Result</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <MaterialCommunityIcons   name="logout-variant" size={35}  color={'#DE3163'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={()=>signOut()}  style={{marginLeft:15}}><Text style={myStyle.text}>Logout</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
      <MaterialCommunityIcons   name="close-circle-multiple" size={35}  color={'#138679'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>BackHandler.exitApp()}  style={{marginLeft:15}}><Text style={myStyle.text}>Close App</Text></TouchableOpacity>
      </View>
      </ScrollView>
    );
  return (
    <DrawerLayoutAndroid
    ref={drawer}
    drawerWidth={230}
    drawerPosition={'left'}
    renderNavigationView={navigationView}
    >
      <StatusBar backgroundColor="black" />
      <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor:'#08d4c4',
        activeColor:'#fb2525',
      }}
      >
      <Tab.Screen
        name="Profile"
        component={SeeProfile}
        options={{
          tabBarLabel: 'home',
          tabBarIcon: ({ color,size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={DivideData}
        options={{
          tabBarLabel: 'students',
          tabBarIcon: ({ color,size}) => (
            <Entypo name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={CreatePost}
        options={{
          tabBarLabel: 'post',
          tabBarIcon: ({ color,size}) => (
          <Ionicons name="md-add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStudent}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color,size}) => (
            <MaterialCommunityIcons name="account-search" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Job"
        component={PostScreen}
        options={{
          tabBarLabel: 'Job',
          tabBarIcon: ({ color,size}) => (
            <FontAwesome5 name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    </DrawerLayoutAndroid>
  );
}
export default MainScreen;  
const myStyle=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:10
  },
  Welcome:{
    fontSize:20,
    textAlign:'center',
    margin:10,
  },
  input:{
    width:'90%',
    margin:5,
    padding:7,
    marginBottom:10,
    borderColor:'black',
    borderBottomWidth:2,

  },
  userBtn:{
    backgroundColor:'#fb2525',
    padding:5,
    width:'99%',
    borderRadius:25
  },
    userBtn2:{
    backgroundColor:'white',
    padding:5,
    width:'99%',
    borderRadius:25,
    borderColor:'blue',
    borderWidth:2,
    marginTop:5
      
  },
  btnContainer:{
    flexDirection:'column',
    width:'90%',
    margin:15,
    justifyContent:'space-between'
  },
    txtContainer:{
    width:'90%',
    marginLeft:15,
    justifyContent:'space-between'
  },
  img:{
    width:70,
    height:70,
    borderRadius:35,
    resizeMode: "cover",
    borderColor:'black',
    // alignSelf:'center',
    borderWidth:1
  },
  containerd: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  },
  text:{
    fontSize:20,
    fontWeight:'800',
    fontFamily:'fantasy'
  },
  btnSeperator: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#666'
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginTop:12,
    marginLeft:10
  },
  btnTextView: {
    fontSize: 16,
    color: '#666',
    marginTop:10,
    marginLeft:10
  },
  btnTouchable: {
    width: "100%",
    backgroundColor: '#fff',
    height: 80,
    flexDirection:'row',
  },
})
