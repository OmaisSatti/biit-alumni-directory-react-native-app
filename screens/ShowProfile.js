import React,{useEffect,useState} from 'react'
import { StyleSheet,View,Text,Image,ScrollView,SectionList,LogBox,TouchableOpacity} from 'react-native'; 
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function ShowProfile({route,navigation}){
      const[exp,setExp]=useState([]);
      const[edu,setEdu]=useState([]);
      const[prsnl,setPrsnl]=useState([]);
      const getAllData=()=>{
      const url = "http://192.168.43.186/FypApi/api/Student/GetAllData?sid=9";
      fetch(url,{
          method:'GET',
      }).then((response)=>response.json())
      .then((response)=>{
        console.log(response);
        }).catch((error)=>{alert(error)})
      }
      const getExpInfo=()=>{
      const url = "http://192.168.43.186/FypApi/api/Student/GetExperienceInfo?exid=9";
      fetch(url,{
          method:'GET',
      }).then((response)=>response.json())
      .then((response)=>{
        response.forEach(element => {
          setExp(data=>[...data,
              {
                Company:element.Company,
                Description:element.Description,
                Location:element.Location,
                Skill:element.Skill,
                WorkTitle:element.WorkTitle
              }
            ]);
          });
        console.log(exp);
        }).catch((error)=>{alert(error)})
        
      }
      const getEduInfo=()=>{
        const url = "http://192.168.43.186/FypApi/api/Student/GetEducationInfo?edid=9";
        fetch(url,{
            method:'GET',
        }).then((response)=>response.json())
        .then((response)=>{
          response.forEach(element => {
            setEdu(data=>[...data,
                {
                  Degree:element.Degree,
                  Grade:element.Grade,
                  PassedYear:element.PassedYear,
                  Institute:element.Institute,
                }
              ]);
            });
          console.log(edu);
          }).catch((error)=>{alert(error)})
          
      }
      const getPersonalInfo=()=>{
          const url = "http://192.168.43.186/FypApi/api/Student/GetPersonalInfo?perid=9";
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
                  }
                ]);
              });
            console.log(prsnl);
            }).catch((error)=>{alert(error)})
            
      }
      const getLoginId = async () => {
        try {
          var LoginId = await AsyncStorage.getItem('LoginId')
          if(LoginId !==null) {
            console.warn("Login student id is : "+LoginId);
          }
       } catch(e) {
       }
     }
     const renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "red",  
                }}  
            />  
        );  
     };  
     const DATA = [
      {
        title: "Personal Information",
        data: [
          "Name: Muhammad Omais",
          "Email: Omaissatti42@gmail.com",
          "Contact: 03408149083",
          "Address: Bharia Kahute",
          "Gender: Male"
        ]
      },
      {
        title: "Education Information",
        data: ["Degree: Mcs", "PassedYear: 2021", "Grade: A","Activities: Study and cricket"],
      },
      {
        title: "Experience Information",
        data: ["Company: Pandas pvt ltd", "Job: Developer", "Languages: Python,Java,C#","Skill: Data Analysis"]
      },
    ];
     useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);}, [])
      return (
      <ScrollView>
      <Image style={myStyle.backimg} source={require('../assets/pic1.jpg')}></Image>
      <View style={myStyle.container}>
      <View style={myStyle.imgview}>
      <Image style={myStyle.img} source={require('../assets/users/messi.jpg')}></Image>
      </View>                                                   
      <Text style={myStyle.Welcome} >{route.params==null?'Muhammad Omais':route.params}</Text>
      <View style={{flexDirection:'column'}}>
      <View style={{flexDirection:"row",marginTop:15,marginLeft:12}}>
      <Feather style={{marginTop:5}} name="phone-call" />
      <Text style={{fontWeight:'bold',fontSize:15,marginBottom:10,marginLeft:10}}>0340 8149083</Text>
      </View>
      <View style={{flexDirection:"row",marginTop:10,marginLeft:12}}>
      <Entypo style={{marginTop:5}} name="location" />
      <Text  style={{fontSize:15,marginLeft:10}}>Islamabad Pakistan</Text>
      </View>
      <View style={{flexDirection:"row",marginTop:10,marginLeft:12}}>
      <Feather style={{marginTop:5}} name="mail" />
      <Text  style={{fontSize:15,marginLeft:10}}>Omaissatti42@gmail.com</Text>
      </View>
       </View>
       </View>
       <TouchableOpacity style={myStyle.userBtn3} onPress={()=>navigation.navigate('ProfileScreen',{Contact:'03408149083',
          Address:'Islambad Pakistan','Email':'Omaissatti42@gmail.com'})}>
       <Text style={myStyle.btnText}>Edit Profile +</Text>
       </TouchableOpacity>
       <SectionList  
      sections={DATA}  
      renderItem={({item}) => <Text style={myStyle.item}>{item}</Text>}  
      renderSectionHeader={({section}) => <Text style={myStyle.sectionHeader}>{section.title}</Text>}  
      keyExtractor={(item, index) => index}  
      />
       </ScrollView>
      );
    }
       {/* {route.params ==null ?
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
       <TouchableOpacity style={myStyle.userBtn2} onPress={()=>navigation.navigate('ProfileScreen')}>
       <Text style={myStyle.btnText}>Edit</Text>
       </TouchableOpacity>
       <TouchableOpacity style={myStyle.userBtn2} onPress={()=>navigation.navigate('Login')}>
       <Text style={myStyle.btnText}>Logout</Text>
       </TouchableOpacity>
       </View>
       :
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
       <TouchableOpacity style={myStyle.userBtn2} onPress={()=>alert('You are now follower')}>
       <Text style={myStyle.btnText}>Follow</Text>
       </TouchableOpacity>
       <TouchableOpacity style={myStyle.userBtn2} onPress={()=>alert('you can not chat now')}>
       <Text style={myStyle.btnText}>Message</Text>
       </TouchableOpacity>
       </View>
        } */}
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
    marginTop:-50
  },
  input:{
    width:'90%',
    margin:5,
    padding:7,
    marginBottom:10,
    borderColor:'#fb2525',
    borderBottomWidth:2,

  },
  userBtn:{
    backgroundColor:'#fb2525',
    padding:5,
    width:'95%',
    borderRadius:10,
    alignSelf:'center',
    margin:5
  },
    userBtn2:{
    backgroundColor:'white',
    padding:5,
    width:'35%',
    borderRadius:10,
    borderColor:'blue',
    borderWidth:2,
    marginTop:5,
    margin:5
  },
  userBtn3:{
    backgroundColor:'white',
    padding:5,
    width:'95%',
    borderRadius:10,
    borderColor:'#00FAFA',
    borderWidth:2,
    alignSelf:'center',
    margin:5
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
  btnText:{
    fontSize:18,
    textAlign:'center',
    color:'black'
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
  sectionHeader: {  
    padding:5,
    fontSize: 22,  
    fontWeight: 'bold',  
    color: "#fff",
    margin:5,
    borderRadius:10,  
    backgroundColor: 'red',  
    textAlign:'center'
},  
item: {  
    padding: 10,  
    fontSize: 20,  
    height: 46, 
    backgroundColor:'#00FAFA',
    marginLeft:8,
    marginRight:8,
    color:'black'
} 
})