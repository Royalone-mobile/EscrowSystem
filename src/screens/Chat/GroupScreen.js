import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Image, View, TouchableOpacity,FlatList } from 'react-native'
import {connect} from 'react-redux'
import {colors} from '../../utils/constants'
import {
  Container,
  Content,
  Text,
  Button,
  Left,
  Right,
  Body,
  Header,
  Title,
  Icon,
  Thumbnail,
  List,
  ListItem
} from 'native-base'

class GroupScreen extends Component {
  constructor(props) {
    super(props);
    // this.viewMessage = this.viewMessage.bind(this)
  }
  
  static navigationOptions = ({ navigation }) => ({
    header: (
      <LinearGradient colors={[colors.ORANGE, colors.PINK]}>
      <Header style={{backgroundColor: 'transparent'}}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{color: 'white'}} name="arrow-round-back" />
          </Button>
        </Left>
        <Body><Title style={{color: 'white'}}>Messages</Title></Body>
        <Right />
      </Header>
      </LinearGradient>
    )
  });

  getFriends = () => {
    let users = this.props.users
    let uid = this.props.token;
    
    let tmp=[]
    let friends = Object.assign({},users[uid].friends)
    console.log("friends",friends)
    for(i in friends)
    {
      let data = {uid:friends[i].uid,name:friends[i].name,avatarURL:friends[i].avatarURL}
      tmp.push(data)
    }  
    return tmp
      //this.setState({jobs:tmp})
       //console.log(this.state.jobs)
    
}

_renderItem = ({item}) => {
 // console.log("_renderItem");
 // console.log(index, item);
 let uid = item.uid
 let name =  item.name
 let imageurl = item.avatarURL
 console.log("user",item)
 console.log("imageurl",imageurl)
  return (
    <ListItem avatar style={{marginLeft: 0, paddingLeft: 10}} onPress={() => {
      console.log('onPress');
        this.viewMessage(name,uid,imageurl)
      }}>
        <Left>
          <Thumbnail source={{uri:imageurl }} />
        </Left>
        <Body>
          <Text>{name}</Text>
          <Text note>Doing what you like will always keep you happy . .</Text>
        </Body>
        <Right>
          <Text note>3:43 pm</Text>
        </Right>
      </ListItem>
  )
}
viewMessage = (name,uid,uri) => {
  this.props.navigation.navigate('SingleMessage', { name: name ,uid: uid,uri:uri})
}
  
  render() {
    let friends = this.getFriends() 
    
    return (
      <Container>
        <Content>
          <List>
            <FlatList
            renderItem={this._renderItem}
            data={friends}
            keyExtractor={(item, index) => index}
            />
          </List>
        
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupScreen); 
