import React, { Component } from 'react'

import ChatScreen from './Component'




class ChatScreenContainer extends Component {

  static navigationOptions = {
    title: translations.t('chat'),
  }

  render() {
    return (
      <ChatScreen />
    )
  }
}

export default ChatScreenContainer
