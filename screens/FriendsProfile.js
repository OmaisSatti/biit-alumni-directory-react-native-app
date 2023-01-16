import React,{useEffect,useState} from 'react'
import { StyleSheet,View,Text,Image,ScrollView,SectionList,LogBox,TouchableOpacity, FlatList,ActivityIndicator,Modal,Pressable} from 'react-native'; 
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
export default function FriendsProfile({route,navigation}){
      const[exp,setExp]=useState([]);
      const[edu,setEdu]=useState([]);
      const[prsnl,setPrsnl]=useState([]);
      const[data,setData]=useState([])
      const[loading,setLoading]=useState(true);
      const[myAddress,setMyAddress]=useState('');
      const[myContact,setMyContact]=useState('');
      const[myEmail,setMyEmail]=useState('');
      const[frontImage,setFrontImage]=useState('');
      const[frontImageType,setFrontImageType]=useState('');
      const[coverImage,setCoverImage]=useState('');
      const[frontImageName,setFrontImageName]=useState('');
      const[coverImageName,setCoverImageName]=useState('');
      const [isEnabled, setIsEnabled] = useState(false);
      const [modalVisible, setModalVisible] = useState(false);
      const[coverImageType,setCoverImageType]=useState('');
      const[ses,setSes]=useState('');
      const[dg,setDg]=useState('');
      const getAllData=()=>{
      const url = `http://${mp}/FypApi/api/Student/SelectAllData?sid=${route.params.StudentId}`;
      fetch(url,{
          method:'GET',
      }).then((response)=>response.json())
      .then((response)=>{
        response.forEach(element => {
          setData(data=>[...data,
              {
                StudentId:element.StudentId,
                AridNo:element.AridNo,
                Name:element.Name,
                Address:element.Address,
                Contact:element.Contact,
                Email:element.Email,
                WorkTitle:element.WorkTitle,
                Degree:element.Degree,
                Institute:element.Institute,
                EducationId:element.EducationId,
                ExperienceId:element.ExperienceId,
                Skill:element.Skill,
                Company:element.Company,
                WorkTitle:element.WorkTitle,
                Location:element.WorkTitle
              }
            ]);
          });
        }).catch((error)=>{alert(error)})
      }
      const getExpInfo=()=>{
      const url = `http://${mp}/FypApi/api/Student/GetExperienceInfo?exid=${route.params.StudentId}`;
      fetch(url,{
          method:'GET',
      }).then((response)=>response.json())
      .then((response)=>{
        response.forEach(element => {
          setExp(data=>[...data,
              {
                ExperienceId:element.ExperienceId,
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
        const url = `http://${mp}/FypApi/api/Student/GetEducationInfo?edid=${route.params.StudentId}`;
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
          const url = `http://${mp}/FypApi/api/Student/GetPersonalInfo?perid=${route.params.StudentId}`;
          fetch(url,{
              method:'GET',
          }).then((response)=>response.json())
          .then((response)=>{
           response.forEach(element => {
              setPrsnl(data=>[...data,
                  {
                    MyAddress:element.Address,
                    Address:element.Address,
                    Contact:element.Contact,
                    Email:element.Email,
                    Gender:element.Gender,
                    FrontImage:element.FrontImage,
                    FrontImageType:element.FrontImageType,
                    FrontImageName:element.FrontImageName,
                    CoverImage:element.CoverImage,
                    CoverImageType:element.CoverImageType,
                    CoverImageName:element.CoverImageName
                  }
                ]);
                setMyAddress(element.Address);
                setMyContact(element.Contact);
                setMyEmail(element.Email);
                setFrontImage(element.FrontImage);
                setFrontImageType(element.FrontImageType);
                setFrontImageName(element.FrontImageName);
                setCoverImage(element.CoverImage);
                setCoverImageType(element.CoverImageType);
                setCoverImageName(element.coverImageName);
              });
            setLoading(false);
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
     console.log(lSes+":"+ses);
     useEffect(()=>{getExpInfo();getEduInfo();getPersonalInfo();},[]);  
     useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);}, [])
      return (
      <ScrollView>
      {loading==false ?
      <ScrollView> 
      {coverImage=='' ?
      <Image style={myStyle.backimg} source={require('../assets/emptycover.jpg')}></Image>
      :
      <Image style={myStyle.backimg} source={{uri:`data:${coverImageType};base64,${coverImage}`}}></Image>
     // <Image style={myStyle.backimg} source={{uri:`http://192.168.43.186/FypApi/Photos/${coverImageName}`}}></Image>
      }
      <View style={myStyle.container}>
      <View style={myStyle.imgview}>
      {frontImage=='' ?
      <Image style={myStyle.img} source={require('../assets/emptyprofile.jpg')}></Image>
      :
      //<Image style={myStyle.img} source={{uri:`data:${frontImageType};base64,${frontImage}`}}></Image>
      <Image style={myStyle.img} source={{uri:`http://${mp}/FypApi/Photos/${frontImageName}`}}></Image>
      }
      </View>                                         
      <Text style={myStyle.Welcome} >{route.params==null? gName :route.params.Name}</Text>
      <View style={{flexDirection:'column'}}>
      <View style={{flexDirection:"row",marginTop:15,marginLeft:12}}>
      <Feather style={{marginTop:5}} name="phone-call" />
      <Text style={{fontWeight:'bold',fontSize:15,marginBottom:5,marginLeft:10}}>{myContact==''?'Not set yet':myContact}</Text>
      </View>
      <View style={{flexDirection:"row",marginTop:5,marginLeft:12}}>
      <Entypo style={{marginTop:5}} name="location" />
      <Text  style={{fontSize:15,marginLeft:10}}>{myAddress==''?'Not set yet':myAddress}</Text>
      </View>
      <View style={{flexDirection:"row",marginTop:10,marginLeft:12}}>
      <Feather style={{marginTop:5}} name="mail" />
      <Text  style={{fontSize:15,marginLeft:10}}>{myEmail==''?'Not set yet':myEmail}</Text>
      </View>
       </View> 
       </View>

       <View style={myStyle.userBtn}>
       <Text style={myStyle.btnText}>Personal Information</Text>
       </View>
       <FlatList style={{backgroundColor:'#fff',padding:6}}
        data={prsnl}
        keyExtractor={(item,index)=> index}
        renderItem={({item,index})=>{ 
           return <View style={myStyle.card}>
           <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Email </Text>
            <Text style={myStyle.text}> {item.Email} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}> Address</Text>
            <Text style={myStyle.text}> {item.Address} </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold',marginTop:5}}>Contact</Text>
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
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Degree Name</Text>
            <Text style={myStyle.text}> {item.Degree.trim()} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Institute Name</Text>
            <Text style={myStyle.text}> {item.Institute.trim()} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>PassedYear</Text>
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
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Company Name</Text>
            <Text style={myStyle.text}> {item.Company} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Work Title</Text>
            <Text style={myStyle.text}> {item.WorkTitle} </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:15,color:'#000',flex:1,fontWeight:'bold'}}>Skills</Text>
            <Text style={myStyle.text}> {item.Skill} </Text>
            </View>
            </View>
         }}/>
        {lSes>=ses?
        <View></View>
        :
       <Pressable style={myStyle.userBtn} onPress={()=>navigation.navigate('SkillsEndorcements',{Name:route.params.Name,
        StudentId:route.params.StudentId,Experience:exp})}>
       <Text style={myStyle.btnText}>Skills and Endorcements</Text>
       </Pressable>
       }
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
  text:{
    fontSize:15,
    color:'#000',
    textAlign:'right',
    marginTop:5,
    flex:1
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
    marginTop:-50
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
} ,
//------------------------modal design code----------------------------- 
modalView: {
margin: 10,
backgroundColor: "black",
borderRadius: 20,
padding: 20,
width:'97%',
height:'55%',
shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 2
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5
},
modalButton: {
borderRadius:8,
padding: 8,
},
modalButton2: {
borderRadius: 20,
padding:10,
elevation: 2
},
buttonOpen: {
backgroundColor: "#F194FF",
},
modalButtonClose: {
backgroundColor:'#fff',
borderColor:'#fb2525',
borderWidth:2,
marginTop:10,
marginRight:2,
width:'35%'
},
modalButtonClose2: {
 backgroundColor:'#fb2525',
 marginTop:20,
 width:'100%'
},
modalTextStyle: {
color: "white",
fontWeight: "bold",
textAlign: "center"
},
modalBtnTextStyle: {
color: "black",
fontWeight: "bold",
textAlign: "center"
},
modalText: {
textAlign: "center",
fontSize:15,
fontWeight:'bold',
fontFamily:'fantasy',
marginTop:10,
color:"#fff"
},
modalText2: {
textAlign: "center",
fontSize:13,
marginTop:10,
fontFamily:'fantasy',
color:"#666"
},
modalBtnSeprator:{
width: '100%',
borderWidth: 1,
borderColor: '#666',
marginTop:10,
},
centeredView:{
  flex: 1,
  justifyContent: "center", 
  alignItems: "center"
},
})