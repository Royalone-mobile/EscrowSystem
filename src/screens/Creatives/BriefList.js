import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {connect} from 'react-redux'
import { Image, View, ScrollView, TouchableOpacity } from 'react-native'
import {colors} from '../../utils/constants'
import Firebase from '../../firebasehelper'
import Fonts from '../../theme/Fonts'
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Header,
  Title,
  Icon,
  DeckSwiper
} from 'native-base'


class BriefList extends Component {
  constructor(props) {
    super(props)

    this.state={
      cards:[
        {
          briefTitle: 'Card One',
          date: '',
          deadline: 'One',
          description: 'One',
          location: 'One',
          people: 'One',
          price: 'One',
          tags:{
            event:true,
            food:false,
            lifestyle:false,
            portrait:true,
            product:false
          }
        }
       
      ]
    }
  }
  
  apply_brief(b_id){
    let uid = this.props.token
    //add brief ids to user/applied who has sent applicant
    Firebase.add_brieftoUser(b_id,uid,(res)=>{
      if(res===null)
      {
        alert("You sent applicant to this brief.")
      }
      else
        alert(res)
    })
    //add user ids to client/applied whom users sent applicants to.
    Firebase.add_UsertoClient(b_id,uid,(res)=>{
      if(res!=null)
         alert(res)
    })
    //add user id to job/applicant
    Firebase.updateApplicant(b_id,uid,(res)=>{
      if(res==null)
          console.log("updated applicant")
      else
        alert(res)
    })
    
  }
  render() {
    let tmp=[]
    tmp=this.props.briefs.filter(brief=> Object.keys(brief.applicants).indexOf(this.props.token) === -1)
    console.log("this.props.briefs=",this.props.briefs)
    console.log("this.props.token",this.props.token)
    
    console.log(tmp)
    return (
      <Container>
        <Content padder={true} scrollEnabled={false}> 
          {tmp.length!=0 ? (<DeckSwiper
            onSwipeLeft={(item)=>{}} 
            onSwipeRight={(item)=>{}}
            dataSource={tmp}
            
            renderItem={item =>
              {  
                
                return(  
              <View>

              <Card style={{alignItems: 'center', justifyContent: 'center' }}>
                <CardItem>
                  <Image style={{ height: 300, flex: 1 }} source={{uri: 'https://i.ytimg.com/vi/yaqe1qesQ8c/maxresdefault.jpg'}} />
                </CardItem>
                <CardItem>
                  <Text style={Fonts.style.h1}>{item.briefTitle}</Text>
                </CardItem>
                <CardItem style={{flex: 1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <View style={{flex: 1, flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>
                    {item.tags.portrait && <LinearGradient colors={[colors.ORANGE, colors.PINK]} style={{margin:5}} >
                      <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 15}}>Portrait</Text>
                    </LinearGradient>}
                    {item.tags.lifestyle && <LinearGradient colors={[colors.ORANGE, colors.PINK]} style={{margin:5}} >
                    <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 15}}>Lifestyle</Text>
                    </LinearGradient>}
                    {item.tags.product && <LinearGradient colors={[colors.ORANGE, colors.PINK]}  style={{margin:5}}>
                      <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 15}}>Product</Text>
                    </LinearGradient>}
                    {item.tags.food && <LinearGradient colors={[colors.ORANGE, colors.PINK]} style={{margin:5}}>
                      <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 15}}>Food&Drink</Text>
                    </LinearGradient>}
                    {item.tags.event && <LinearGradient colors={[colors.ORANGE, colors.PINK]} style={{margin:5}}>
                      <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 15}}>Event</Text>
                    </LinearGradient>}
                  </View>
                  <View style={{paddingTop:20}}>
                    <Text note>Posted on {item.date}  {item.location}  {item.price}$</Text>
                  </View>
                </CardItem>
                
                <CardItem>
                  <ScrollView style={{height:50}}>
                      <Text>{item.description}</Text>
                  </ScrollView>
                </CardItem>
              </Card>
              
              <TouchableOpacity onPress={()=>{
                this.apply_brief(item.id)
              }}> 
                <LinearGradient colors={[colors.ORANGE, colors.PINK]} style={{alignItems:'center',justifyContent:'center'}}>
                  <Text style={{alignContent:'center',color:'white',fontSize:25,padding:5}}>Apply</Text>
                </LinearGradient>
              </TouchableOpacity>
              </View>)
            }}
          />) : <View style={{flex:1,alignItems:'center'}}><Text style={{fontSize:40,padding:30}}>No jobs that available to apply.</Text></View>}
        </Content>
      </Container>
    )
  }
}
function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}
function mapStateToProps(state) {
	return {
    token: state.token ,
    briefs: state.briefs,
    users: state.users
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BriefList); 