import React,{Component,useState,useEffect} from 'react'
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image,ScrollView,LogBox, ImageBackground,ToastAndroid,ActivityIndicator, UIManager} from 'react-native'; 
import { RadioButton } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
export default function EditProfile({route,navigation}){
  const [email,setEmail]=useState('');
  const [address,setAddress]=useState('');
  const [contact,setContact]=useState('');
  const[loading,setLoading]=useState(true);
  const [checked, setChecked] =useState('');
  const [coverImage,setCoverImage]=useState('');
  const [frontImage,setFrontImage]=useState('');
  const[pId,setPid]=useState(-1);
  const[coverImageType,setCoverImageType]=useState('');
  const[frontImageType,setFrontImageType]=useState('');
  const [data,setData]=useState();
  const[prsnl,setPrsnl]=useState([]);
  const[change,setChange]=useState(false);
  const getPersonalInfo=()=>{
    const url = `http://192.168.43.186/FypApi/api/Student/GetPersonalInfo?perid=${foo}`;
    fetch(url,{
        method:'GET',
    }).then((response)=>response.json())
    .then((response)=>{
     response.forEach(element => {
        setPrsnl(data=>[...data,
            {
              Address:element.Address,
              Contact:element.Contact,
              Email:element.Email,
              Gender:element.Gender,
              FrontImage:element.FrontImage,
              FrontImageType:element.FrontImageType,
              CoverImage:element.CoverImage,
              CoverImageType:element.CoverImageType,
            }
          ]);
          setAddress(element.Address);
          setContact(element.Contact);
          setEmail(element.Email);
          //setChecked(element.Gender);
          setPid(element.PersonalId)
          setFrontImage(element.FrontImage);
          setFrontImageType(element.FrontImageType);
          setCoverImage(element.CoverImage);
          setCoverImageType(element.CoverImageType);
        });
        setLoading(false);
        //console.log('yeh omais ki personal info aaa')
      }).catch((error)=>{alert(error)})     
}
useEffect(() =>{ 
      setCoverImage(route.params.CoverImageName);
      setFrontImage(route.params.FrontImageName);
      setAddress(route.params.Address);
      setContact(route.params.Contact);
      setEmail(route.params.Email);
      setChecked(route.params.Gender.trim().toString());
},[]); 
useEffect(() => {
  LogBox.ignoreLogs(['If you want to use Reanimated 2']);}, [])
  const InsertPersonalInfo= () => {  
    var Email=email;
    var Contact=contact;
    var Address=address;
    if(Email.length==0 || Contact.length==0 || Address.length==0){
      alert('Required filed is missing');
    }else{
    let frontImageName = frontImage.substring(frontImage.lastIndexOf('/') + 1, frontImage.length);
    let coverImageName = coverImage.substring(coverImage.lastIndexOf('/') + 1, coverImage.length);
    console.log('...................................');
    const data = new FormData();
    data.append('Email',`${email}`);
    data.append('Gender',`${checked}`);
    data.append('Contact',`${contact}`);
    data.append('Address',`${address}`);
    data.append('StudentId',`${foo}`);
    data.append('FrontImage',{uri: frontImage, name: frontImageName,type:'image/jpeg'});
    data.append('CoverImage',{uri: coverImage, name: coverImageName,type:'image/jpeg'});
    console.log('Data ',JSON.stringify(data));
    var InsertApiURL = `http://${mp}/FypApi/api/Student/SaveImage`;
         var headers={
           'Content-Type': 'multipart/form-data',
         };
         fetch(InsertApiURL,
          {
            method:'POST',
            headers:headers,
            body:  data
          }
         )
         .then((response)=>response.json())
         .then((response)=>
         {
            alert(response)
            console.log(response);
         })
         .catch((error)=>{
           let errMsg = "Error :"+error;
           alert(data)
           ToastAndroid.show(errMsg,ToastAndroid.LONG);
           console.log("Error :"+error);
         })
  }}
  const updatePersonalInfo= () => {   
    var Email=email;
    var Contact=contact;
    var Address=address;
    let frontImageName = frontImage.substring(frontImage.lastIndexOf('/') + 1, frontImage.length);
    if(Email.length==0 || Contact.length==0 || Address.length==0){
      alert('Required filed is missing');
    }else{
    const data = new FormData();
    data.append('Email',`${email}`);
    data.append('Gender',`${checked}`);
    data.append('Contact',`${contact}`);
    data.append('Address',`${address}`);
    data.append('FrontImage',{uri: frontImage, name: frontImageName,type:'image/jpeg'});
    console.log('Data ',JSON.stringify(data));
    var InsertApiURL = `http://${mp}/FypApi/api/Student/UpdateImage?pid=${foo}`;
         var headers={
           'Content-Type': 'multipart/form-data',
         };
         fetch(InsertApiURL,
          {
            method:'POST',
            headers:headers,
            body:  data
          }
         )
         .then((response)=>response.json())
         .then((response)=>
         {
            alert(response)
            console.log(response);
         })
         .catch((error)=>{
           let errMsg = "Error :"+error;
           alert(data)
           ToastAndroid.show(errMsg,ToastAndroid.LONG);
           console.log("Error :"+error);
         })
  }}
  const choosePhotoFromGallery=()=>{
    ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
    }).then(image => {
     console.log(image.path);
     setChange(true);
     setFrontImage(image.path);
     }); 
    }
   const takePhotoFromCamera=()=>{
    ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true, 
    }).then(image => {
    console.log(image);
    setChange(true);
    setFrontImage(image.path);
    });
  }
  const renderInner = () => (
    <View style={myStyle.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={myStyle.panelTitle}>Upload Photo</Text>
        <Text style={myStyle.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={myStyle.panelButton} onPress={takePhotoFromCamera}>
        <Text style={myStyle.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={myStyle.panelButton} onPress={choosePhotoFromGallery}>
        <Text style={myStyle.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={myStyle.panelButton}
        onPress={() =>bs.current.snapTo(1)}>
        <Text style={myStyle.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHeader = () => (
    <View style={myStyle.header}>
      <View style={myStyle.panelHeader}>
        <View style={myStyle.panelHandle} />
      </View>
    </View>
  );
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const getData=()=>{
    console.log(email+":"+checked+":"+address+":"+contact+":"+frontImage)
  }
  return (
  <ScrollView style={{flex:1}}>
      <BottomSheet
        ref={bs}
        snapPoints={[520, -5]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
       />
      <View>
      {/* <ImageBackground style={myStyle.backimg} source={{uri:`http://${mp}/FypApi/Photos/${coverImage}`}}></ImageBackground> */}
      <ImageBackground style={myStyle.backimg} source={{uri:`data:${route.params.CoverImageType};base64,${route.params.CoverImage}`}}></ImageBackground>
      </View>
      <View style={myStyle.container}>
      <View style={myStyle.imgview}>
      <TouchableOpacity onPress={()=>bs.current.snapTo(0)}>
      {change==false?
      <Image style={myStyle.img} source={{uri:`http://${mp}/FypApi/Photos/${frontImage}`}}></Image>
      :
      <Image style={myStyle.img} source={{uri:frontImage}}></Image>
      }
      </TouchableOpacity> 
       </View>
       <Text style={myStyle.Welcome} >Edit Profile!</Text>
       <TextInput style={myStyle.input} placeholder="Email" onChangeText={(text)=>setEmail(text)} 
       defaultValue={email}></TextInput>
       <View style={{flexDirection:'row',width:'90%',marginTop:20}}>
       <Text style={{marginTop:8,fontFamily:'fantasy'}}>Select gender</Text>
       <View style={{marginLeft:15,flexDirection:'row'}}>
       <RadioButton
        value="Male" status={ checked === 'Male' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Male')}
       />
       <Text style={{marginTop:8}}>Male</Text>
       </View>
      <View style={{marginLeft:15,flexDirection:'row'}}>
      <RadioButton
        value="Female" status={ checked === 'Female' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Female')}
       />
       <Text style={{marginTop:8}}>Female</Text>
       </View>
       </View>
       <TextInput style={myStyle.input} placeholder="Address" onChangeText={(txt)=>setAddress(txt)}
       defaultValue={address}></TextInput>
       <TextInput maxLength={11} keyboardType={'phone-pad'} style={myStyle.input} 
       placeholder="Phone No." onChangeText={(txt)=>setContact(txt)} defaultValue={contact} />
       <View style={myStyle.btnContainer}>
       <TouchableOpacity style={myStyle.userBtn} onPress={()=>updatePersonalInfo()}>
       <Text style={{textAlign:'center',color:'white',fontSize:18,fontFamily:'fantasy'}}>Update</Text>
       </TouchableOpacity>
       <TouchableOpacity style={myStyle.userBtn2} onPress={()=>navigation.navigate('Experience')}>
       <Text style={myStyle.btnText}>Add Experience</Text>
       </TouchableOpacity>
       <TouchableOpacity style={myStyle.userBtn2} onPress={()=>navigation.navigate('Education')}>
       <Text style={myStyle.btnText}>Add Education</Text>
       </TouchableOpacity>
       </View>
       </View>
  </ScrollView>
  );
}
const myStyle=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:10
  },
  Welcome:{
    fontSize:20,
    textAlign:'center',
    fontWeight:'bold',
    marginTop:-50,
    fontFamily:'fantasy'
  },
  input:{
    width:'90%',
    margin:5,
    padding:7,
    marginBottom:10,
    borderColor:'#fb2525',
    borderBottomWidth:2,
    fontFamily:'fantasy'

  },
  userBtn:{
    backgroundColor:'#fb2525',
    padding:9,
    width:'99%',
    borderRadius:25
  },
    userBtn2:{
    backgroundColor:'white',
    padding:8,
    width:'99%',
    borderRadius:25,
    borderColor:'#08d4c4',
    borderWidth:2,
    marginTop:5
      
  },
  btnContainer:{
    flexDirection:'column',
    width:'95%',
    margin:15,
    justifyContent:'space-between'
  },
    txtContainer:{
    width:'90%',
    marginLeft:15,
    justifyContent:'space-between'
  },
  btnText:{
    fontSize:18,
    textAlign:'center',
    fontFamily:'fantasy'
  },
  img:{
    width:150,
    height:150,
    borderRadius:80,
    resizeMode: "cover",
    borderColor:'black',
    borderWidth:2
  },
    imgview:{
    position:'relative',
    top:-70,
    left:0,
    // justifyContent:'center',
    // alignItems:'center',
  },
    backimg:{
    width:'100%',
    height:180,
    resizeMode: "cover"
  },
  panel: {
    padding: 20,
    backgroundColor: 'black',
    paddingTop: 20,
    width: '100%',
    height:'100%'
  },
  header: {
    backgroundColor: 'black',
    shadowColor: 'white',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 25,
    height: 35,
    color:'white',
    fontFamily:'fantasy'
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
    fontFamily:'fantasy'
  },
  panelButton: {
    padding: 12,
    borderRadius: 40,
    backgroundColor: '#fb2525',
    alignItems: 'center',
    marginVertical: 8,
  },
  panelButtonTitle: {
    fontSize: 17,
    color: 'white',
    fontFamily:'fantasy'
  },

})
