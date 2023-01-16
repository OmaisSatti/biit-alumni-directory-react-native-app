import React, { useState, useEffect, useRef, useLayoutEffect,useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, Alert, Modal, TextInput, Pressable, BackHandler, DrawerLayoutAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import {AuthContext} from '../Component/context';
const AdminPanel = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const drawer = useRef(null);
  const {signOut}=useContext(AuthContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 20, flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
          <MaterialCommunityIcons name='menu' size={30} onPress={() => drawer.current.openDrawer()} />
        </View>
      ),
    });
    return () => { };
  }, [navigation])
  const navigationView = () => (
      <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <Icon name="create" size={35} color={'#DE3163'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() => navigation.navigate('CreateSurvey')} style={{ marginLeft: 15 }}><Text style={styles.text}>Create Survey</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
      <MaterialIcons name="feedback" size={35} color={'#666'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() => navigation.navigate("SurveyList")} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>All Survey</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
      <Entypo name="users" color={'#138679'} size={35} />
      <TouchableOpacity onPress={() => navigation.navigate('Admin')} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Admin List</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
      <MaterialIcons name="post-add" size={35} color={'#DE3163'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() => navigation.navigate('PostDetails')} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Post Details</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
      <Icon name="git-pull-request-sharp" size={35} color={'#666'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('PostRequest')} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Post Request</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <MaterialCommunityIcons name="logout-variant" size={35}  color={'#138679'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('StudentSurveyRequest')} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Survey Request</Text></TouchableOpacity>
      </View>
      {adfoo==1008?
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <Icon name="md-add-circle-outline" size={35} color={'#138679'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('CreateAdmin')} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Create Admin</Text></TouchableOpacity>
      </View>
      :
      <View></View>
      }
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <MaterialCommunityIcons name="logout-variant" size={35} color={'#DE3163'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('AdminLogin')} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Logout</Text></TouchableOpacity>
      </View>

      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <MaterialCommunityIcons name="close-circle-multiple" size={35} color={'#138679'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() => BackHandler.exitApp()} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Close App</Text></TouchableOpacity>
      </View> */}
    </View>
  );
  global.adfoo = route.params.AdminId;
  return (
    <View style={styles.container}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={230}
        drawerPosition={'left'}
        renderNavigationView={navigationView}
      >
      <StatusBar backgroundColor='white' barStyle="dark-content" />
      <View style={styles.header}>
      <Image source={require('../assets/admin5.png')} style={styles.img} />
      <Text style={styles.Welcome} >Directory Admin Activities</Text>
      </View>
      <View style={styles.footer}>
      <Text style={styles.title}>Check recent activities!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SurveyList')}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'fantasy' }}>Survey Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateSurvey')}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'fantasy' }}>Create Survey Planning</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'fantasy' }}>Check admin list</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PostDetails')}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'fantasy' }}>Post Details</Text>
      </TouchableOpacity>
      {adfoo==1008?
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAdmin')}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'fantasy' }}>Crete Admin</Text>
      </TouchableOpacity>
      :
      <View></View>
      }
      </View>
      </DrawerLayoutAndroid>
    </View>
  );
};
export default AdminPanel;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //backgroundColor:'#F2F5CA'
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'fantasy'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 3,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderColor: 'white',
    margin: 20
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'fantasy'
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fb2525'
  },
  Welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontFamily: 'fantasy'
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 60,
    resizeMode: "cover"
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    // backgroundColor: "#2196F3",
    backgroundColor: '#fb2525',
    //backgroundColor:'#08d4c4',
    marginTop: 10,
    width: '95%'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'fantasy'
  },
  modalText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff"
  }
});