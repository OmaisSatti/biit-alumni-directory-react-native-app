import React, { useState,useRef, useLayoutEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image,BackHandler, DrawerLayoutAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const MainScreen = ({ route, navigation }) => {
  global.foo=route.params.logId;
  global.fooName=route.params.logName;
  console.log(foo);
  const drawer = useRef(null);
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
      <TouchableOpacity onPress={() => navigation.navigate('SelectMembers')} style={{ marginLeft: 15 }}><Text style={styles.text}>Create Party</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
      <MaterialIcons name="feedback" size={35} color={'#666'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() => navigation.navigate("ViewParty")} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>View Party</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
      <MaterialIcons name="history" size={35} color={'#666'} backgroundColor={'#ecf0f1'} />
      <MaterialCommunityIcons onPress={() => navigation.navigate("HistoryParty")} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Party History</Text></MaterialCommunityIcons>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <Icon name="notifications" size={35} color={'#DE3163'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('MemberRequest')} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Notification</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <MaterialCommunityIcons name="logout-variant" size={35} color={'#DE3163'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() =>navigation.navigate('LoginScreen')} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Logout</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <MaterialCommunityIcons name="close-circle-multiple" size={35} color={'#138679'} backgroundColor={'#ecf0f1'} />
      <TouchableOpacity onPress={() => BackHandler.exitApp()} style={{ marginLeft: 15 }}>
      <Text style={styles.text}>Close App</Text></TouchableOpacity>
      </View>
    </View>
  );
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
      <Image source={require('../PartyImages/party2.png')} style={styles.img} />
      <Text style={styles.Welcome} >Kitty Party Activities</Text>
      </View>
      <View style={styles.footer}>
      <Text style={styles.title}>Perform activities as given!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectMembers')}>
      <Text style={styles.txtBtn}>Add Party</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewParty')}>
      <Text style={styles.txtBtn}>View Party</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HistoryParty')}>
      <Text style={styles.txtBtn}>Party History</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('ShowParty')}>
      <Text style={styles.txtBtn}>Invite Member</Text>
      </TouchableOpacity>
      </View>
      </DrawerLayoutAndroid>
    </View>
  );
};
export default MainScreen;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 3,
    backgroundColor: '#F2F5CA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: 'white',
    margin: 15
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'fantasy'
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    backgroundColor:'#08d4c4',
    // backgroundColor: '#fb2525'
  },
  Welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontFamily: 'fantasy'
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 60,
    resizeMode: "stretch"
  },
  modalView: {
    margin: 15,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
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
    // // backgroundColor: "#2196F3",
    // backgroundColor: '#fb2525',
    backgroundColor:'#08d4c4',
    marginTop: 5,
    width: '95%'
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'fantasy'
  },
  modalText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff"
  },
  txtBtn:{
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'fantasy',
    fontSize:20
  }
});