import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import  {Styles, Colors, Fonts, Metrics}  from '../../theme';
import CommonWidgets from '../../components/CommonWidgets';
import Firebase from '../../firebasehelper';
import {save_allusers} from '../../Redux/actions/index'
import RNFetchBlob from 'react-native-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state={
      Info:props.navigation.state.params.info
    }
    
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };
  uploadAvatar(uri,imageName){
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    const uploadUri = Platform.OS === 'ios'
    ? uri.replace('file://', '')
    : uri
    let mime = 'image/jpg'
    let uploadBlob = null
    const imageRef = Firebase.storage().ref('avatars').child(`${imageName}.jpg`)
    console.log("imageRef=",imageRef)
    return fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mime};BASE64`})
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, {contentType: mime})
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
  }
  signUp() {
    let {pwd, pwdconfirm, email} = this.state;
    if (!this.validateEmail(email)) {
      // not a valid email
      alert("email is invalid")
      return;
    } 
    if(( pwd == pwdconfirm)&&(pwd.length>=6)) {
      Firebase.signup(email, pwd,(res)=>{
        if(res==null){ 
          //sucessfuly signed up
          let uid=Firebase.getCurrentUser().uid;
          let userdata={
            fullname:this.state.Info.fullname,
            job:this.state.Info.jobType,
            birthday:this.state.Info.birthday,
            address:this.state.Info.address,
            phone:this.state.Info.phone,
            instagram:this.state.Info.instagram,
            tagtype:this.state.Info.tagType,
            applied:'',
            friends:[],
            uid: uid
          }
          //write user data
          
          //upload avatar image
          let Uri = this.state.Info.avatarSource
          ImageResizer.createResizedImage(Uri,300,300,'JPEG',80)
            .then((resizedImageUri)=>{
                this.uploadAvatar(resizedImageUri.uri, uid.toString()).then((url)=>{
                  userdata['avatarURL']=url
                  Firebase.writeUserdata(uid,userdata);
                //this.props.onSend(url);
                  alert("SignUp Successfully.",userdata);
                  this.props.navigation.navigate('Login',{uid : this.state.uid});
                  Firebase.getUsersData((res)=>{
                    this.props.dispatch(save_allusers(res))
                  })
              })
            })
            .catch((error)=>{
              console.log(error)
            })

          
        }
        else alert(res)
      })
    }
    else if(pwd.length<6)
    {
      alert("password must be more than 6 letters!");
    }
    else
      alert('Password unmatched');
  }

  
  render() {
    console.log(this.props)
    return (
      <KeyboardAwareScrollView
      style={{ flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight ,backgroundColor: 'white'}}
      automaticallyAdjustContentInsets={false}
      >
      {/* <NavigationBar
        statusBar={{ style: 'light-content' }}
        style={Styles.nav}
        title={CommonWidgets.renderNavBarHeader('SignUp')}
        tintColor={Colors.ORANGE}            
      /> */}
      <View style={{flex: 1,width: Metrics.screenWidth, height:Metrics.screenHeight,  flexDirection: 'column'}}>
            <View style={{flex: 0.5}}>
            </View>
            <View style={{flex: 0.5,padding:30}}>
                <Text style={{color:'black',fontSize:20}}> One last thing</Text>
                <Text style={{color:Colors.textPlaceholder,fontSize:20,paddingTop:10,paddingBottom:10}}>We will need this so you can log in again</Text>
            </View>
            <View style={{flex: 0.3,padding:10}}>
              <TextInput style={[Styles.personInfotextInputStyle,{flex:1,fontSize: 20}]}
              onChangeText={(text) => this.setState({ email: text })} 
              placeholder="Type your Email here"></TextInput>
            </View>
            <View style={{flex: 0.3,padding:10}}>
              <TextInput style={[Styles.personInfotextInputStyle,{flex:1,fontSize: 20}]} secureTextEntry={true}
              onChangeText={(text) => this.setState({ pwd: text })} 
              placeholder="Type your password "></TextInput>
            </View>
            <View style={{flex: 0.3,padding:10}}>
              <TextInput style={[Styles.personInfotextInputStyle,{flex:1,fontSize: 20}]} secureTextEntry={true}
              onChangeText={(text) => this.setState({ pwdconfirm: text })}
               placeholder="Confirm your password"></TextInput>
            </View>
            
            <View style={{flex:0.2,margin:20}}>
                <LinearGradient colors={[Colors.ORANGE, Colors.PINK]} style={Styles.linearGradient}>
                <TouchableOpacity onPress={() => {
                    this.signUp();
                }}>
                    <Text style={Styles.buttonText}>
                      SIGN UP
                    </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <View style={{flex:1}}>
            </View>
      </View>
      </KeyboardAwareScrollView>
      )
  }
}
function mapStateToProps(state) {
  
  return {
      token: state.token,
      briefs: state.briefs,
      users: state.users
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return {
      dispatch, 
  }
 // return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SignUp); 