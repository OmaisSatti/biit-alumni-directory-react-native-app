import React,{useEffect,useState,useContext} from 'react'
import { StyleSheet,View,Text,Image,ScrollView,SectionList,LogBox,TouchableOpacity, FlatList,ActivityIndicator,RefreshControl,Pressable} from 'react-native'; 
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../Component/context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function SeeProfile({route,navigation}){
     const {signOut}=useContext(AuthContext);
      const[exp,setExp]=useState([]);
      const[edu,setEdu]=useState([]);
      const[prsnl,setPrsnl]=useState([]);
      const[loading,setLoading]=useState(true);
      const[myAddress,setMyAddress]=useState('Not set yet');
      const[myContact,setMyContact]=useState('Not set yet');
      const[myEmail,setMyEmail]=useState('Not set yet');
      const[myGender,setMyGender]=useState('Male');
      const[myName,setMyName]=useState('');
      const[myPersonalId,setMyPersonalId]=useState(-1);
      const[frontImage,setFrontImage]=useState('');
      const[frontImageType,setFrontImageType]=useState('');
      const[coverImage,setCoverImage]=useState('');
      const[coverImageType,setCoverImageType]=useState('');
      const[frontImageName,setFrontImageName]=useState('');
      const[coverImageName,setCoverImageName]=useState('');
      const [refreshing, setRefreshing] = React.useState(false);
      const[ses,setSes]=useState('');
      const[dg,setDg]=useState('');
      useEffect(()=>{getExpInfo();getEduInfo();getPersonalInfo();},[]);
      const getExpInfo=()=>{
      const url = `http://${mp}/FypApi/api/Student/GetExperienceInfo?exid=${foo}`;
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
        }).catch((error)=>{alert(error)})
        
      }
      const getEduInfo=()=>{
        const url = `http://${mp}/FypApi/api/Student/GetEducationInfo?edid=${foo}`;
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
              if(element.Degree.trim().toString()=="MCS" || element.Degree.trim().toString()=="BSCS" || element.Degree.trim().toString()=="MIT" || element.Degree.trim().toString()=="BSIT")
              {
               setSes(element.PassedYear.trim().toString());
               setDg(element.Degree.trim().toString());
              }
            });
          }).catch((error)=>{alert(error)})
          
      }
      const getPersonalInfo=()=>{
          const url = `http://${mp}/FypApi/api/Student/GetPersonalInfo?perid=${foo}`;
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
                    FrontImageName:element.FrontImageName,
                    CoverImage:element.CoverImage,
                    CoverImageType:element.CoverImageType,
                    CoverImageName:element.CoverIamgeName
                  }
                ]);
                setMyAddress(element.Address);
                setMyContact(element.Contact);
                setMyEmail(element.Email);
                setMyGender(element.Gender);
                setMyPersonalId(element.PersonalId)
                setFrontImage(element.FrontImage);
                setFrontImageType(element.FrontImageType);
                setFrontImageName(element.FrontImageName);
                setCoverImage(element.CoverImage);
                setCoverImageType(element.CoverImageType);
                setCoverImageName(element.CoverIamgeName);
              });
              setLoading(false);
              //console.log('yeh omais ki personal info aaa')
            }).catch((error)=>{alert(error)})     
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
     global.lSes=ses;
     global.lDg=dg; 
     console.log(lSes);
     const handleRefresh=()=>{
       setExp('');
       setEdu('');
       setLoading(false);
       setPrsnl('');
       getPersonalInfo();
       getEduInfo();
       getExpInfo();
     }
     useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);}, [])
      return (
      <ScrollView     
        refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={()=>handleRefresh()}
        />}
      >
      {loading==false ?
      <ScrollView>
      {coverImage=='' ?
      <Image style={myStyle.backimg} source={require('../assets/emptycover.jpg')}></Image>
      :
      <Image style={myStyle.backimg} source={{uri:`data:${coverImageType};base64,${coverImage}`}}></Image>
     // <Image style={myStyle.backimg} source={{uri:`http://${mp}/FypApi/Photos/${coverImageName}`}}></Image>
      }
      <View style={myStyle.container}>
      <View style={myStyle.imgview}>
      {frontImage=='' ?
      <Image style={myStyle.img} source={require('../assets/emptyprofile.jpg')}></Image>
      :
      <Image style={myStyle.img} source={{uri:`http://${mp}/FypApi/Photos/${frontImageName}`}}></Image>
      }
      </View>                                                   
      <Text style={myStyle.Welcome} >{gName.trim().toString()}</Text>
      <View style={{flexDirection:'column'}}>
      <View style={{flexDirection:"row",marginTop:15,marginLeft:12}}>
      <Feather style={{marginTop:5}} name="phone-call" size={20}/>
      <Text style={{fontWeight:'bold',fontSize:15,marginBottom:5,marginLeft:10,fontFamily:'fantasy'}}>{myContact}</Text>
      </View>
      <View style={{flexDirection:"row",marginTop:5,marginLeft:12}}>
      <Entypo style={{marginTop:5}} name="location" size={20} />
      <Text  style={{fontSize:15,marginLeft:10,fontFamily:'fantasy'}}>{myAddress}</Text>
      </View>
      <View style={{flexDirection:"row",marginTop:10,marginLeft:12}}>
      <Feather style={{marginTop:5}} name="mail" size={20} />
      <Text  style={{fontSize:15,marginLeft:10,fontFamily:'fantasy'}}>{myEmail}</Text>
      </View>
       </View>
       </View>
       {foo!=1002?
       <TouchableOpacity style={myStyle.userBtn3} onPress={()=>navigation.navigate('EditProfile',{Email:myEmail,Contact:myContact,Address:myAddress,Gender:myGender,PersonalId:myPersonalId,FrontImage:frontImage,FrontImageType:frontImageType,   
       FrontImageName:frontImageName,CoverImage:coverImage,CoverImageType:coverImageType,CoverImageName:coverImageName})}>
       <Text style={myStyle.btnText2}>Edit Profile +</Text>
       </TouchableOpacity>
       :
       <View></View> 
       }
       <View style={myStyle.userBtn}>
       <Text style={myStyle.btnText}>Personal Information</Text>
       </View>
       <FlatList style={{backgroundColor:'#fff',padding:6}}
        data={prsnl}
        keyExtractor={(item,index)=> index}
        renderItem={({item,index})=>{ 
           return <View style={myStyle.card}>
           <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',fontFamily:'fantasy'}}>Email </Text>
            <Text style={myStyle.text}> {item.Email} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',fontFamily:'fantasy'}}> Address</Text>
            <Text style={myStyle.text}> {item.Address} </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',marginTop:5,fontFamily:'fantasy'}}>Contact</Text>
            <Text style={myStyle.text}> {item.Contact} </Text>
            </View>
            </View>
         }}/>

       <View style={myStyle.userBtn}>
       <Text style={myStyle.btnText}>Education Information</Text>
       </View>
       <FlatList style={{backgroundColor:'#fff',padding:6}}
        data={edu}
        keyExtractor={(item,index)=> index}
        renderItem={({item,index})=>{ 
           return <View style={myStyle.card}>
           <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',fontFamily:'fantasy'}}>Degree Name</Text>
            <Text style={myStyle.text}> {item.Degree.trim()} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',fontFamily:'fantasy'}}>Institute Name</Text>
            <Text style={myStyle.text}> {item.Institute.trim()} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',fontFamily:'fantasy'}}>PassedYear</Text>
            <Text style={myStyle.text}> {item.PassedYear.trim()} </Text>
            </View>
            </View>
         }}/>


       <View style={myStyle.userBtn}>
       <Text style={myStyle.btnText}>Experience Information</Text>
       </View>
       <FlatList style={{backgroundColor:'#fff',padding:6}}
        data={exp}
        keyExtractor={(item,index)=> index}
        renderItem={({item,index})=>{ 
           return <View style={myStyle.card}>
           <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',fontFamily:'fantasy'}}>Company Name</Text>
            <Text style={myStyle.text}> {item.Company} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',fontFamily:'fantasy'}}>Work Title</Text>
            <Text style={myStyle.text}> {item.WorkTitle} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',fontFamily:'fantasy'}}>Skills</Text>
            <Text style={myStyle.text}> {item.Skill} </Text>
            </View>
            </View>
         }}/>
         </ScrollView>
         :
        <View><ActivityIndicator size={'large'} color="red"/></View>
        }
       </ScrollView>
      );
    }
const myStyle=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:10
  },
  btnSeprator:{
    width: '95%',
    borderWidth: 2,
    borderColor: '#666',
    alignSelf:'center',
    marginTop:10,
    },
  text:{
    fontSize:15,
    color:'#000',
    textAlign:'right',
    marginTop:5,
    flex:1,
    fontFamily:'fantasy'
  },
  card:{
    borderRadius:10,
    padding:15,
    margin:2,
    backgroundColor:'#dee0e3',
    shadowColor: "black",
    shadowOffset: {
       width: 0,
       height: 16,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.00,
    elevation: 2,
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

  },
  userBtn:{
    backgroundColor:'white',
    padding:8,
    width:'97%',
    borderRadius:15,
    alignSelf:'center',
    borderBottomWidth:3,
    borderTopWidth:3,
    borderColor:'#fb2525',
    marginTop:5
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
    borderRadius:15,
    borderColor:'#08d4c4',
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
    fontSize:20,
    color:'black',
    fontFamily:'fantasy'
  },
  btnText2:{
    fontSize:20,
    color:'black',
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
  sectionHeader: {  
    padding:5,
    fontSize: 22,  
    fontWeight: 'bold',  
    color: "#fff",
    margin:5,
    borderRadius:15,  
    backgroundColor: '#fb2525',  
    textAlign:'center'
},  
item: {  
    padding: 10,  
    fontSize: 20,  
    height: 46, 
    backgroundColor:'#dee0e3',
    marginLeft:8,
    marginRight:8,
    color:'black',
} 
})