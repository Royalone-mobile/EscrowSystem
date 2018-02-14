import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { Image, View, ScrollView, TouchableOpacity } from 'react-native'
import { colors } from '../../utils/constants'
import Firebase from '../../firebasehelper';
import Fonts from '../../theme/Fonts'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
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



class CreativeList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      matched_users : [],
      cards: [
        {
          fullname: '',
          birthday: '',
          address: '',
          phone: '',
          instagram: '',
          tagtype: ''
        },
        {
          fullname: '',
          birthday: '',
          address: '',
          phone: '',
          instagram: '',
          tagtype: ''
        }
      ],
      bid:0
    }
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
        <Body><Title style={{color: 'white'}}>Creatives</Title></Body>
        <Right />
      </Header>
      </LinearGradient>
    )
  });
  componentDidMount() {
    let b_id = this.props.navigation.state.params.bid
    console.log(b_id)
    this.setState({ bid: b_id }, () => {
      this.getMatchedUsers(this.props)
    })
     
  }
  getMatchedUsers = (nextProps) => {
    let bid =  this.state.bid  
    console.log("getMatchedUsers")
    console.log(bid)
    let uid = this.props.token
    let tmp = []

    tmp= Object.keys(nextProps.briefs[bid].applicants).filter(id=>nextProps.briefs[bid].applicants[id]===' ')
    console.log("tmp=",tmp)
    let promises = []
    tmp.forEach(function(element) {
      promises.push(new Promise(
        function (resolve, reject) {
          Firebase.getUserData(element, (res) => {
            //newdata.push(data)
            resolve(res);
          })
        })) 
      })
    Promise.all(promises).then(result => {
      this.setState({matched_users: result})
      this.forceUpdate();
      return result
    })
      
    
  }
  
  componentWillReceiveProps(nextProps) {
    //this.props = nextProps
    console.log("componentWillReceiveProps")
    this.getMatchedUsers(nextProps)
  }

  addorremoveChat= function(uid,method){
    let brief_id =  this.state.bid
    let client_id =  this.props.token
    
    switch(method)
    {
      case 'add':
        Firebase.addtoChat(client_id,brief_id,uid,(res)=>{
          if(res==null)
          {
            let text = "I Like him."
            alert(text)
          }
          else
            alert(res)
        });
        break;
      case 'remove':
        Firebase.removefromChat(client_id,brief_id,uid,(res)=>{
          if(res==null)
          {
            let text = "I dislike him."
            alert(text)
          }
          else
            alert(res)
        });
        break;
    }
  }


  render() {
   const cards = this.state.matched_users;
    return (
      <Container>
        <Content padder={true} scrollEnabled={false}>
          { cards.length!=0 ? (<DeckSwiper
            dataSource={cards}
            renderItem={item => {
              return (
                <View>
                  <Card style={{ elevation: 3 }}>
                    <CardItem>
                      <Image style={{ height: 300, flex: 1 }} source={{ uri: 'https://i.ytimg.com/vi/yaqe1qesQ8c/maxresdefault.jpg' }} />
                    </CardItem>
                    <CardItem>
                      <Text style={Fonts.style.h1}>{item.fullname}</Text>
                    </CardItem>

                    <CardItem>
                      <Body>
                        <LinearGradient colors={[colors.ORANGE, colors.PINK]}>

                          <Text style={{ backgroundColor: 'transparent', padding: 3, paddingLeft: 5, paddingRight: 5, color: 'white', fontSize: 20 }}>{item.tagtype}</Text>
                        </LinearGradient>
                        <Text>birthday: {item.birthday}</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Text>{item.phone}        {item.address}</Text>
                    </CardItem>
                  </Card>
                  <View style={{flex:1,flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1,padding:10}} onPress={()=>{
                      
                      this.addorremoveChat(item.uid,'remove')
                    }}>
                      <LinearGradient colors={[colors.ORANGE, colors.PINK]} style={{alignItems:'center'}}>
                          <SimpleLineIcons name="dislike"  size={30} color="#fff" />
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,padding:10}} onPress={()=>{
                         console.log("token",this.props.token)
                        this.addorremoveChat(item.uid,'add')
                    }}>
                      <LinearGradient colors={[colors.ORANGE, colors.PINK]} style={{alignItems:'center'}}>
                          <SimpleLineIcons name="like"  size={30} color="#fff" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
            }
          />) : <View style={{flex:1,alignItems:'center'}}><Text style={{fontSize:40,padding:30}}>No Creatives applied.</Text></View>}
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
  console.log("STATE=", state)
  return {
    token: state.token,
    users: state.users,
    briefs: state.briefs,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreativeList); 