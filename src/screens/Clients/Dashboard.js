import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Image, View, TouchableOpacity,ScrollView,Platform,StyleSheet,TextInput,FlatList} from 'react-native'
import MultiSelect from 'react-native-multiple-select'
import Modal from 'react-native-modal'
import  {Styles, Colors, Fonts, Metrics}  from '../../theme';
import Ionicon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import {CheckBoxGroup} from './CheckBoxGroup'
import { CheckBox } from 'react-native-elements'
import Firebase from '../../firebasehelper';
import DatePicker from 'react-native-datepicker'
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Icon,
  Left,
  Right,
  Body
} from 'native-base'

import { dashboardStyles } from './styles.js'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.viewBrief = this.viewBrief.bind(this)
    this.state = {
      isModalVisible: false,
      checked: {
        portrait: false,
        lifestyle: false,
        product: false,
        event: false,
        food: false
      },
      brieftitle:'',
      description:'',
      location:'',
      people:'',
      deadline:'',
      price:'' ,
      jobs: [{
        briefTitle: '1',
        date:'',
        deadline:'',
        description:'',
        location:'',
        people:'',
        price:'',
        tags:{
          event:false,
          food:false,
          lifestyle:false,
          portrait:false,
          product:false
        }
     }]
    };
  }
  componentDidMount(){
    //this.getMatchedJobs()
    
  }
  validateNumber = (number) => {
    let re = /^\d+$/ 
      return re.test(number);
  };
  viewBrief(b_id) {
    //alert(b_id)
   this.props.navigation.navigate('Brief',{brief_id:b_id})
  }
  _toggleModal = () => {this.setState({ isModalVisible: !this.state.isModalVisible })}
  _toggle = (tag) => {
    
      let tmp = Object.assign({}, this.state.checked);
      tmp[tag] = !tmp[tag]
      this.setState({ checked: tmp })
    
  }
  _createJob = function (uid){
      let tag = Object.assign({}, this.state.checked);
      let datestring =  new Date().toDateString()
      let data = {
        briefTitle:this.state.brieftitle,
        description:this.state.description,
        uid:uid,
        tags:tag,
        applicants:'',
        location:this.state.location,
        people:this.state.people,
        deadline:this.state.deadline,
        price:this.state.price,
        date:datestring
      }
      let briefs = this.props.briefs
      if(briefs !== null)
        var bid = briefs.length
      else
        var bid = 0
      let newdata = Object.assign({},data,{id:bid})


      Firebase.writeJobData(newdata,bid,(res)=>{
        if(res===null)
        {
          console.log("Client created job")
          this.setState({isModalVisible:false}) 
          //this.getMatchedJobs()
        }
      });
  } 
  getMatchedJobs=()=>{
      let briefs = this.props.briefs
      let uid = this.props.token;
      
      let tmp=[]
        for(i in briefs)
        {
          if(briefs[i].uid===uid)
          {
            tmp.push(briefs[i])
          }
        }
        return tmp
        //this.setState({jobs:tmp})
         //console.log(this.state.jobs)
      
  }
  _renderItem = ({item}) => {
   // console.log("_renderItem");
   // console.log(index, item);
   let bid = item.id
   let applicants = Object.keys(this.props.briefs[bid].applicants).length
    return (
    <Card>
      <CardItem style={dashboardStyles.row}>

          <View style={dashboardStyles.column}>
            <Text>{item.deadline}</Text>
            <Text style={dashboardStyles.note}>Deadline</Text>
          </View>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('CreativeList',{bid:bid})
        }}>
          <View style={dashboardStyles.column}>
            <Text>{applicants}</Text>
            <Text style={dashboardStyles.note}>Applicants</Text>
          </View>
        </TouchableOpacity>
          <View style={dashboardStyles.column}>
            <View style={dashboardStyles.greenCircle} />
            <Text style={dashboardStyles.note}>Status</Text>
          </View>
    
      </CardItem>
      <TouchableOpacity onPress={()=>{
        this.viewBrief(item.id)
        }}>
        <CardItem cardBody>
          
          <Image source={{uri: 'https://i.ytimg.com/vi/yaqe1qesQ8c/maxresdefault.jpg'}} style={{height: 180, width: '100%', justifyContent: 'center'}} />
          <View style={{backgroundColor: "rgba(0, 0, 0, 0.5)", height: 180, position:'absolute', width: '100%'}}/>
          
          <View style={{position: 'absolute', padding: 13, display: 'flex', maxWidth: 360}}>
            
            <View style={dashboardStyles.tagContainer}>
              {item.tags.portrait && <Text style={dashboardStyles.tag}>Portrait</Text>}
              {item.tags.product && <Text style={dashboardStyles.tag}>Product</Text>}
              {item.tags.lifestyle && <Text style={dashboardStyles.tag}>Lifestyle</Text>}
              {item.tags.event && <Text style={dashboardStyles.tag}>Event</Text>}
              {item.tags.food && <Text style={dashboardStyles.tag}>Food&Drink</Text>}
            </View>
            <View>
              <Text style={{backgroundColor: 'transparent', fontSize: 18, color: 'white'}}>{item.briefTitle}</Text>
              <TouchableOpacity>
                <Icon style={{color: 'white', backgroundColor: 'transparent'}} name="barcode" />
              </TouchableOpacity>
            </View> 

          </View>

        </CardItem>
      </TouchableOpacity>
      
    </Card>)
  }

  render() {
    const { selectedItems } = this.state;
    let jobs = this.getMatchedJobs()   
    return (
      <Container>
        <Content padder>
         <FlatList
         renderItem={this._renderItem}
         data={jobs}
         keyExtractor={(item, index) => index}
         />
        </Content>
        <TouchableOpacity style={Styles.overlay} onPress={() => {
                        this._toggleModal()
                  }}>
            <Image style={{width: 50,height: 50}} source={require('../../assets/plus.png')}/>
          </TouchableOpacity>
          <Modal isVisible={this.state.isModalVisible}>
                <View style={{flex:0.8,paddingTop:20,paddingBottom:40,paddingLeft:30,paddingRight:30,backgroundColor:'white' }}>
                    <TouchableOpacity style={{flex:0.2,alignItems:'flex-end'}} onPress={() => {
                        this.setState({ isModalVisible: false })
                  }}>
                        <Ionicon name="ios-close"  size={30} color="#000" />
                    </TouchableOpacity>
                    
                    <ScrollView style={{flex:1}}>
                        <View style={{flex: 1,padding:5}}>
                            <TextInput style={[Styles.textInputStyle,{flex:1,fontSize: 20}]} placeholder="Brief Title"
                            onChangeText={(text) => this.setState({ brieftitle: text })}
                            ></TextInput>
                        </View>
                        <View style={{flex: 1,padding:5}}>
                            <TextInput multiline style={[Styles.textInputStyle,{flex:1,fontSize: 20,height:100}]} placeholder="Description"
                            onChangeText={(text) => this.setState({ description: text })}
                            ></TextInput>
                        </View>
                        <View style={{flex: 1,padding:5}}>
                        <CheckBox
                            title='Portrait'
                            checked={this.state.checked.portrait}
                            onPress={()=>{this._toggle('portrait')}}
                        />
                        <CheckBox
                            title='Lifestyle'
                            checked={this.state.checked.lifestyle}
                            onPress={()=>{this._toggle('lifestyle')}}
                        />
                        <CheckBox
                            title='Product'
                            checked={this.state.checked.product}
                            onPress={()=>{this._toggle('product')}}
                        />
                        <CheckBox
                            title='Event'
                            checked={this.state.checked.event}
                            onPress={()=>{this._toggle('event')}}
                        />
                        <CheckBox
                            title='Food&Drink'
                            checked={this.state.checked.food}
                            onPress={()=>{this._toggle('food')}}
                        />
                          
                        </View>
                        <View style={{flex: 1,padding:5}}>
                            <TextInput style={[Styles.textInputStyle,{flex:1,fontSize: 20}]} placeholder="Location"
                            onChangeText={(text) => this.setState({ location: text })}
                            ></TextInput>
                         </View>
                        <View style={{flex: 1,padding:5}}>
                            <TextInput style={[Styles.textInputStyle,{flex:1,fontSize: 20}]} placeholder="People"
                            onChangeText={(text) => this.setState({ people: text })}
                            ></TextInput>
                        </View>
                        
                                <DatePicker
                                style={{width: 200}}
                                date={this.state.deadline}
                                mode="date"
                                placeholder="select deadline"
                                format="YYYY-MM-DD"
                                minDate="2018-01-01"
                        
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys. 
                                }}
                                onDateChange={(date) => {this.setState({deadline: date})}}
                              />
                       
                        <View style={{flex: 1,padding:5}}>
                            <TextInput style={[Styles.textInputStyle,{flex:1,fontSize: 20}]} placeholder="Price$"
                            onChangeText={(text) => this.setState({ price: text })}
                            ></TextInput>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={{flex:0.1,alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                        if((this.state.brieftitle=='')||(this.state.description=='')||(this.state.location=='')||(this.state.people=='')
                        ||(this.state.deadline=='')||(this.state.price==''))
                          alert('please fill all fields')
                        else
                        {
                          if(!this.validateNumber(this.state.price))
                              alert("price must be digit")  
                          else{
                          //create button click event
                          
                            let uid = this.props.token
                            this._createJob(uid);
                          }
                        }
                      }}>
                        <LinearGradient colors={[Colors.ORANGE, Colors.PINK]}>
                            <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 20}}>Create</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    token: state.token, 
    briefs: state.briefs
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard); 