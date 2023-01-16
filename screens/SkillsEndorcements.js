import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,StatusBar,ScrollView,TextInput,Pressable,FlatList,TouchableOpacity,ToastAndroid,Modal,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RadioButtonRN from 'radio-buttons-react-native';
import { ActivityIndicator } from 'react-native-paper';
 function SkillsEndorcements({route,navigation}) {
    const [checked, setChecked] = React.useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [type, setType]=useState('');
    const[reason,setReason]=useState('');
    const [answer,setAnswer]=useState('');
    const[nextbtn,setNextBtn]=useState(false);
    const[submitbtn,setSubmitBtn]=useState(false);
    const[skId,setSkId]=useState("");
    const[exp,setExp]=useState([]);
    const[loading,setLoading]=useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const endorceName=route.params.Name;
    const StudentId=route.params.StudentId;
    const dataForRadio = [
      {
        label: 'Worked together on same project'
       },
       {
        label: `Managed ${endorceName} directly`
       },
       {
        label: `Heared about ${endorceName} skills?`
       },
       {
        label: 'None of the above'
       },
      ];
  const saveEndorcement=()=>{
      var Answer=answer;
      var Reason=reason;
      if(Answer.length==0)
      {
        alert('please select one skill feedback')
        return;
      }
      if(Reason.length==0)
      {
        alert('please select any reason')
        return;
      }
      var InsertApiURL = `http://${mp}/FypApi/api/Student/AddEndorcement`;
      var headers={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
      var Data={
        Answer:Answer,
        StudentId:StudentId,
        FriendId:foo,
        SkillId:skId,
        Reason:reason
      }
      fetch(InsertApiURL,
       {
         method:'POST',
         headers:headers,
         body:  JSON.stringify(Data)
       }
      )
      .then((response)=>response.json())
      .then((response)=>
      {
        let msg=response.toString();
        if(msg=="true"){
          ToastAndroid.show("Endorce skill successfully",ToastAndroid.SHORT);
        }else{
          alert('Response not saved');
        }
      })
      .catch((error)=>{
        alert("Error :"+error);
      })
  }
  const getEndorcement=()=>{
    const url = `http://${mp}/FypApi/api/Student/GetEndorcement2?sid=${StudentId}&fid=${foo}`;
    fetch(url,{
        method:'GET',
    }).then((response)=>response.json())
    .then((response)=>{
      response.forEach(element => {
        console.log('-----------------------------------')
        console.log("getting response is : "+response);
        console.log('-----------------------------------')
        setExp(data=>[...data,
            {
              ExperienceId:element.ExperienceId,
              Company:element.Company,
              Description:element.Description,
              Location:element.Location,
              Skill:element.Skill,
              Found:element.Found,
              Count:element.Count
            }
          ]);
        });
        setLoading(false);
      }).catch((error)=>{alert(error)})

  }
  const [data, setData] = useState([
      {Id:1,Name: 'English',Status:'Yes',Total:12},
      {Id:2,Name: 'Research',Status:'No',Total:54},
      {Id:3,Name: 'Marketing',Status:'No',Total:20},
   ]);
   useEffect(()=>{getEndorcement()},[]);
  const getData=()=>{
    console.log(answer+":"+foo+":"+StudentId+":"+reason+":"+skId);
  }
  return (
    <ScrollView style={myStyle.container}>
    {loading==true?
     <ActivityIndicator color={"red"} />
     :
     <ScrollView style={myStyle.container}>
    <StatusBar backgroundColor="black" />
    <Text  style={{fontSize:20,margin:15,fontFamily:'fantasy'}}>Skills & Endorcements</Text>
    <FlatList
      data={exp}
      keyExtractor={(item,index)=> index}
       renderItem={({item,index})=>{ 
           return <View style={{margin:9,flexDirection:'row',alignContent:'space-between'}}>
           {foo!=1002?
           <Icon.Button  onPress={() =>{item.Found==false?(
            setModalVisible(true),setType(item.Skill),setSkId(item.ExperienceId)
           ):alert('skill already endorce')}}  name="md-add-circle-outline" size={40} color={'black'} 
           backgroundColor={'white'}>
           </Icon.Button>
           :
           <Icon.Button  onPress={() =>alert('Guest can only view skills endorcement')}  name="md-add-circle-outline" size={40} color={'black'} 
           backgroundColor={'white'}>
           </Icon.Button>
           }
           <Text style={{fontSize:18,margin:15,marginLeft:10,fontFamily:'fantasy'}}>{`${item.Skill} `}</Text>
           </View>
         }}
    />
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          ToastAndroid.show("discard changes.",ToastAndroid.SHORT);
          setModalVisible(!modalVisible);
        }}
      >
        <View style={myStyle.centeredView}>
            <View style={myStyle.modalView}>
            <Text style={myStyle.modalText}>{`Thanks for endorsing ${endorceName}`}</Text>
            <Text style={myStyle.modalText2}>{`Helps us identify relevent opportunities and content for ${endorceName}`}</Text>
            <View style={myStyle.modalBtnSeprator}></View>
            <Text style={myStyle.modalText}>{`How good is ${endorceName} at ${type}?`}</Text>
            <View style={{flexDirection:'row'}}>
            <Pressable style={[myStyle.modalButton, myStyle.modalButtonClose]} 
            onPress={() =>{setAnswer('Good')}}>
            <Text style={myStyle.modalBtnTextStyle}>Good</Text>
            </Pressable>
            <Pressable style={[myStyle.modalButton, myStyle.modalButtonClose]}
             onPress={() =>{setAnswer('Very Good')}}>
            <Text style={myStyle.modalBtnTextStyle}>V good</Text>
            </Pressable>
            <Pressable style={[myStyle.modalButton, myStyle.modalButtonClose]} 
            onPress={() =>{setAnswer('Highly Skilled')}}>
            <Text style={myStyle.modalBtnTextStyle}>Skilled</Text>
            </Pressable>
            </View>
            <Text style={myStyle.modalText2}>{`Your response will not be shared with ${endorceName} or other Linkedin members.`}</Text>
            <Pressable disabled={answer==""?true:false} style={[myStyle.modalButton2, myStyle.modalButtonClose2]} 
            onPress={() =>{ setModalVisible(!modalVisible) ,setModalVisible2(!modalVisible2)}}>
            <Text style={myStyle.modalTextStyle}>Next</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          ToastAndroid.show("discard changes.",ToastAndroid.SHORT);
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={myStyle.centeredView}>
            <View style={myStyle.modalView2}>
            <Text style={myStyle.modalText}>{`Thanks for endorsing ${endorceName}`}</Text>
            <Text style={myStyle.modalText2}>{`Helps us identify relevent opportunities and content for ${endorceName}`}</Text>
            <View style={myStyle.modalBtnSeprator}></View>
            <Text style={myStyle.modalText}>{`How do you know about ${endorceName}' skills ${type}?`}</Text>
            <RadioButtonRN
            box={true}
            boxActiveBgColor={'#F2F5CA'}
            data={dataForRadio}
            // textStyle={{fontFamily:'fantasy',fontSize:20,margin:10}}
            deactiveColor={"red"}
            activeColor={"#08d4c4"}
            textColor={'red'}
            selectedBtn={(e) =>{setReason(e.label),console.log(e.reason)}} 
            />
            {/* <Text style={myStyle.modalText2}>{`Your response will not be shared with ${endorceName} or other Linkedin members.`}</Text> */}
            <Pressable disabled={reason==""?true:false} style={[myStyle.modalButton2, myStyle.modalButtonClose2]} 
            onPress={() =>{saveEndorcement(),setModalVisible2(!modalVisible2)}}>
            <Text style={myStyle.modalTextStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </ScrollView>
      }
    </ScrollView>
  );
}
export default SkillsEndorcements;
const myStyle=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    centeredView:{
      flex: 1,
      justifyContent: "center", 
      alignItems: "center"
    },
    Welcome:{
      fontSize:20,
      textAlign:'center',
      margin:10,
      color:'black'
    },
    input:{
      width:'90%',
      margin:10,
      padding:7,
      color:'white',
      borderColor:'white',
      borderBottomWidth:2,
    },
    userBtn:{
      backgroundColor:'#fb2525',
      padding:9,
      width:'99%',
      borderRadius:25
  
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
      color:'white'
    },
    img:{
      width:100,
      height:100,
      borderRadius:60,
      resizeMode: "cover",
      alignSelf:'center'
    },
    card:{
      borderRadius:10,
      padding:6,
      margin:8,
      backgroundColor:'#dee0e3',
      shadowColor: "black",
      shadowOffset: {
         width: 0,
         height: 12,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10.00,
      elevation: 2,
     },
     text:{
       fontSize:15,
       color:'#000',
       flex:1
     },
      btnTouchable:{
           width:"95%",
           height:30,
           alignSelf:'center',
           alignItems:'center',
           justifyContent:'center',
           borderRadius:10,
           marginTop:20,
           marginRight:10,
           marginLeft:5
   
       },
  //---------------------------------------------modal1 design----------------------------------
    modalView: {
    margin: 10,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
    width:'97%',
    height:'62%',
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
  //----------------------------------modal2 design-----------------------------------------
  modalView2: {
    margin: 10,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
    width:'97%',
    height:'92%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  })