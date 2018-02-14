/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import {Root} from "native-base"
import Navigator from './Navigator'
import {colors} from './utils/constants'
import EStyleSheet from 'react-native-extended-stylesheet';
import Firebase from './firebasehelper'
import {save_clientdash,save_allusers} from './Redux/actions/index'
import RNFetchBlob from 'react-native-fetch-blob'

class App extends Component {
  componentWillMount() {
    EStyleSheet.build();
  }
 
  render() {
    return (
      <Root>
        <StatusBar barStyle="light-content" />
        <Navigator />
      </Root>
    );
  }
}
function mapStateToProps(state) {
  
  return {
      briefs: state.briefs,
      users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
      dispatch, 
  }

}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(App); 

