import React,{Component} from 'react'
import { StyleSheet,View,TouchableOpacity,TextInput,Text,Image,ScrollView } from 'react-native'; 
export default class ExperienceInfoScreen extends Component {
  constructor(){
    super();
    this.state={
      company:'',
      workTitle:'',
      location:'',
      skill:'',
      description:''
    }
  }
  InsertExperience=(navigation)=>{
    var Company =this.state.company;
    var WorkTitle =this.state.workTitle;
    var Location =this.state.location;
    var Skill=this.state.skill;
    var Description=this.state.description;
    if(Company.length==0 || WorkTitle.length==0 || Location.length==0 || Skill.length==0 || Description.length==0){
      alert("Required Field is missing!");
      }else{
      var InsertApiURL = `http://${mp}/FypApi/api/Student/AddExperienceInfo`;
      var headers={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
      var Data={
        Company:Company,
        WorkTitle:WorkTitle,
        Location:Location,
        Skill:Skill,
        Description:Description,
        PersonalId:foo,
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
        if(msg=="Data saved successfully"){
          alert(msg);
          this.setState({company:'',workTitle:'',location:'',skill:"",description:''});
        }else{
          alert('Data not saved');
        }
      })
      .catch((error)=>{
        alert("Error :"+error);
      })
      }
   }
  getData(){
    //alert(this.state.company+":"+this.state.workTitle+":"+this.state.location+":"+this.state.skill+":"+this.state.description+":");
   // alert(foo);
    // this.setState={company:'',workTitle:'',location:'',skill:"",description:''}
  }
    render(){
        return (
       <ScrollView contentContainerStyle={{backgroundColor:'white'}}>
       <Image style={myStyle.img} source={require('../assets/skill1.png')}></Image>
       <Text style={myStyle.Welcome} >Add Experience!</Text>
       <TextInput style={myStyle.input} placeholder="Comapny name" placeholderTextColor="#666" 
       onChangeText={(text)=>this.setState({company:text})} value={this.state.company}/>
      <TextInput style={myStyle.input} placeholder="Work title"  placeholderTextColor="#666" 
      onChangeText={(text)=>this.setState({workTitle:text})} value={this.state.workTitle} />
       <TextInput style={myStyle.input} placeholder="Location (optional)" placeholderTextColor="#666"
       onChangeText={(text)=>this.setState({location:text})} value={this.state.location} />
       <TextInput style={myStyle.input} placeholder="Skill(e.g Data Analysis)"  placeholderTextColor="#666" 
       onChangeText={(text)=>this.setState({skill:text})} value={this.state.skill} />
      <TextInput style={myStyle.input} placeholder="Description (optional)"  placeholderTextColor="#666"
      onChangeText={(text)=>this.setState({description:text})} value={this.state.description}/>
       <TouchableOpacity style={myStyle.userBtn} onPress={()=>this.InsertExperience()}>
       <Text style={myStyle.btnText}>Save Data</Text>
       </TouchableOpacity>
       </ScrollView>
        );
    }
}
const myStyle=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  Welcome:{
    fontSize:18,
    textAlign:'center',
    margin:10,
    color:'#08d4c4',
    fontWeight:'bold',
    fontFamily:'fantasy'
  },
  input:{
    width:'93%',
    margin:10,
    padding:7,
    color:'black',
    borderColor:'#08d4c4',
    borderBottomWidth:2,
    alignSelf:'center',
    fontFamily:'fantasy'

  },
  userBtn:{
    backgroundColor:'#08d4c4',
    margin:10,
    marginTop:15,
    padding:10,
    alignSelf:'center',
    width:'97%',
    borderRadius:20
  },
  btnText:{
    fontSize:18,
    textAlign:'center',
    fontFamily:'fantasy'
  },
  img:{
    width:70,
    height:70,
    borderRadius:50,
    resizeMode: "stretch",
    alignSelf:'center'
  },
})