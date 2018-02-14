import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Image, View, TouchableOpacity,FlatList } from 'react-native'
import Firebase from '../../firebasehelper';
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
    this.state={
      
    }
  }
  componentDidMount(){
    
  }
  viewBrief(b_id) {
   this.props.navigation.navigate('Brief',{brief_id:b_id})
  }
  
  getMatchedBriefs = ()=>{
    let uid=this.props.token
    if(this.props.users[uid].applied!="")
      { 
        var briefs=Object.assign({},this.props.users[uid].applied)
        var tmp=[]
        var res = this.props.briefs
          //console.log("getBriefs",briefs)
        for(i in briefs)
        {
          //console.log("matched=",i)
          tmp.push(res[i])
        }
        return tmp
      }
    else
      return []
  }
  _renderItem=({item}) => {
   
    let bid = item.id
    console.log(this.props.briefs[bid].applicants)
    let applicants = Object.keys(this.props.briefs[bid].applicants).length
   // console.log(applicants)
    return (
      <Card>
      <CardItem style={dashboardStyles.row}>

          <View style={dashboardStyles.column}>
            <Text>{item.deadline}</Text>
            <Text style={dashboardStyles.note}>Deadline</Text>
          </View>

          <View style={dashboardStyles.column}>
            <Text>{applicants}</Text>
            <Text style={dashboardStyles.note}>Applicants</Text>
          </View>

          <View style={dashboardStyles.column}>
            <View style={dashboardStyles.greenCircle} />
            <Text style={dashboardStyles.note}>Status</Text>
          </View>
    
      </CardItem>
      <TouchableOpacity onPress={()=>{
        this.viewBrief(item.id)
        }
        }>
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
      
    </Card>
    )
  }
  render() {
    let jobs = this.getMatchedBriefs()  
    console.log("render",this.props.users) 
    return (
      <Container>
        <Content padder>
        <FlatList
         renderItem={this._renderItem}
         data={jobs}
         keyExtractor={(item, index) => index}
         />
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
    token: state.token, 
    briefs: state.briefs,
    users: state.users
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard); 