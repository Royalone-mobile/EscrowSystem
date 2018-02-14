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

class Messages extends Component {
  constructor(props) {
    super(props);
    this.viewMessage = this.viewMessage.bind(this)
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



  viewMessage() {
    this.props.navigation.navigate('SingleMessage')
  }
  
  render() {
    return (
      <Container>
        <Content>
        <FlatList
         listItem={this._renderItem}
         data={jobs}
         keyExtractor={(item, index) => index}
         />
            <ListItem avatar style={{marginLeft: 0, paddingLeft: 10}} onPress={this.viewMessage}>
              <Left>
                <Thumbnail source={{ uri: 'https://www.remoterz.com/static/ryan.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
        
        </Content>
      </Container>
    )
  }
}

export default Messages;