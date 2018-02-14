import React from 'react'
import { KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,} from 'react-native'
import {connect} from 'react-redux'
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import LinearGradient from 'react-native-linear-gradient'
import {colors} from '../../utils/constants'
import Firebase from '../../firebasehelper';
import {
  Container,
  Content,
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
 


class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      receiver_id:this.props.navigation.state.params.uid,
      receiver_name:this.props.navigation.state.params.name,
      receiver_uri:this.props.navigation.state.params.uri
    };

    
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
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
        <Body><Title style={{color: 'white'}}>{navigation.state.params.name}</Title></Body>
        <Right />
      </Header>
      </LinearGradient>
    )
  });
  componentDidMount(){
    let sender_id = this.props.token
    let receiver_id = this.state.receiver_id
    Firebase.getMessages(sender_id,receiver_id,(res)=>{
      let messages =[]
      for(i in res)
      {
        messages.unshift(res[i])
      }
      this.setState({ messages: messages});
      console.log("res=",res)
    })
  }
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });
 // simulating network
  }

  onSend(messages = []) {
    
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, messages),
    //   };
    // });
    let sender_id = this.props.token
    let receiver_id = this.state.receiver_id
    Firebase.sendMessages(sender_id,receiver_id,messages)
    console.log("this.state.messages=",this.state.messages)
    // for demo purpose
    //this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          let text = this.state.receiver_name + 'is typing.'
          return {
            typingText: text
          };
        });
      }
    }  
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: this.state.receiver_id,
          text: text,
          createdAt: new Date(),
          user: {
            _id: this.state.receiver_id,
            name: this.state.receiver_name,
            
          },
        }),
      };
    });
    console.log(this.state.messages)
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: this.props.token, // sent messages should have same user._id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

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
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)