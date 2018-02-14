import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Image, View, ScrollView } from 'react-native'
import {colors} from '../utils/constants'
import Firebase from '../firebasehelper';
import  {Styles, Colors, Fonts, Metrics}  from '../theme';
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
  Icon
} from 'native-base'

class SingleBrief extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: (
      <LinearGradient colors={[colors.ORANGE, colors.PINK]}>
      <Header style={{backgroundColor: 'transparent'}}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{color: 'white'}} name="arrow-round-back" />
          </Button>
        </Left>
        <Body><Title style={{color: 'white'}}>Brief</Title></Body>
        <Right><Button transparent onPress={() => navigation.navigate("Messages")}><Icon style={{color: 'white'}}name="chatboxes" /></Button></Right>
      </Header>
      </LinearGradient>
    )
  });
  
  constructor(props) {
    super(props)

    this.state={
        brief_id:'',
        job:''      
    }
  }
  componentWillMount(){
    let b_id = this.props.navigation.state.params.brief_id
    Firebase.getSelectedJobData(b_id,(res)=>{
      this.setState({job:res})
    })
    
  }
  render() {
    return (
      <Container>
        <Image source={{uri: 'https://i.ytimg.com/vi/yaqe1qesQ8c/maxresdefault.jpg'}} style={{height: '100%', position: 'absolute', width: '100%', justifyContent: 'center'}} />
        <View style={{backgroundColor: "rgba(0, 0, 0, 0.5)", height: '100%', position:'absolute', width: '100%'}}/> 
        <Content padder>
          <Card>
            <CardItem>
              <Text style={{fontSize:30,backgroundColor:'transparent'}}>{this.state.job.briefTitle}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <ScrollView>
                <Text style={{fontSize:25,backgroundColor:'transparent'}}>Description:{this.state.job.description}</Text>
              </ScrollView>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text style={{fontSize:25,backgroundColor:'transparent'}}>Location:{this.state.job.location}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text style={{fontSize:25,backgroundColor:'transparent'}}>People:{this.state.job.people}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text style={{fontSize:25,backgroundColor:'transparent'}}>Deadline:{this.state.job.deadline}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text style={{fontSize:25,backgroundColor:'transparent'}}>Price:{this.state.job.price}$</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default SingleBrief;