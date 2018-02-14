import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import CommonWidgets from '../../components/CommonWidgets';
import  {Styles, Colors, Fonts, Metrics}  from '../../theme';
import Firebase from '../../firebasehelper';

class AccountType extends Component {
  constructor(props) {
    super(props)
  }

 
  render() {
    return (
      <View style={{flex:1}}>
      {/* <NavigationBar
        statusBar={{ style: 'light-content' }}
        style={Styles.nav}
        title={CommonWidgets.renderNavBarHeader('SignUp')}
        tintColor={Colors.ORANGE}            
      /> */}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white'}}>
        <View style={{flex: 1}}>
        </View>
        <View style={{flex: 0.5,flexDirection:'column',paddingBottom:50}}>
            <Text style={{color:'black',fontSize:25}}> Glad to have you</Text>
            <Text style={{color:Colors.textPlaceholder,fontSize:20,paddingTop:10,paddingBottom:10}}>Choose your account type.</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:Colors.textPlaceholder,fontSize:20}}>Will you be hiring?</Text>
              <Text style={{color:Colors.textPlaceholder,fontSize:20}}>Or looking for work?</Text>
            </View>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('PersonInfo', {type: 'hire'})}>
                <Image style={{width: 150,height: 150}} source={require('../../assets/client.png')} />
              </TouchableHighlight>
            </View>
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('PersonInfo', {type: 'work'})}>
              <Image style={{width: 150,height: 150}} source={require('../../assets/photographer.png')} />
              </TouchableHighlight>
            </View>
        </View>
        {/* <View style={{flex:1,flexDirection:'row'}}>
          
            <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={()=>{ this.props.navigation.navigate('Login')}}>
                <Text style={{color:'black',fontSize:30}}>BACK</Text>
            </TouchableOpacity >
          
          <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={()=>{ this.props.navigation.navigate('PersonInfo')}}>
              <Text style={{color:'black',fontSize:30}}>NEXT</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{flex:1}}>
        </View>  
      </View>
      </View>
    )
  }
}

export default AccountType;