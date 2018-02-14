import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Image, View, TouchableOpacity } from 'react-native'
import {colors} from '../utils/constants'
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

class SingleMessage extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: (
      <LinearGradient colors={[colors.ORANGE, colors.PINK]}>
      <Header style={{backgroundColor: 'transparent'}}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{color: 'white'}} name="arrow-round-back" />
          </Button>
        </Left>
        <Body><Title style={{color: 'white'}}>Person Name</Title></Body>
        <Right />
      </Header>
      </LinearGradient>
    )
  });

  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <Container>
        <Content padder>
          <Text>Single message</Text>
        </Content>
      </Container>
    )
  }
}

export default SingleMessage;