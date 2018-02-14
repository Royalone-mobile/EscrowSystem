import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {colors} from '../utils/constants'

import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Icon,
  Left,
  Right,
  Title,
  Header
} from 'native-base'

class Navbar extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ...props 
    }
  }

  render() {
    const signString=["AccountType","PersonInfo","SignUp"];
    if(signString.indexOf(this.state.state.routeName)>-1)
    {
      return (
        <LinearGradient colors={[colors.ORANGE, colors.PINK]}>
       
        <Header style={{backgroundColor: 'transparent'}}>
          <Left>
            <Button transparent onPress={()=>{ this.props.goBack()}}>
              <Icon style={{color: 'white'}} name="arrow-round-back" />
            </Button>
          </Left>
          <Body><Title style={{color: 'white'}}>{this.state.state.routeName}</Title></Body>
          <Right/>
        </Header>
        
        </LinearGradient>
      )
    }
    else if(this.state.state.routeName=='Splash' || this.state.state.routeName=='Creative'||this.state.state.routeName=='Client'||this.state.state.routeName=='Login')
      return null;
    else
    {
      return (
        <LinearGradient colors={[colors.ORANGE, colors.PINK]}>
        <Header style={{backgroundColor: 'transparent'}}>
          <Left><Button transparent onPress={() => this.props.navigate("DrawerOpen")}><Icon style={{color: 'white'}}name="menu" /></Button></Left>
          <Body><Title style={{color: 'white'}}>{this.state.state.routeName}</Title></Body>
          <Right><Button transparent onPress={() => this.props.navigate("MessageList")}><Icon style={{color: 'white'}}name="chatboxes" /></Button></Right>
        </Header>
        </LinearGradient>
      )
    }
  }
}


export default Navbar