import React, { Component } from 'react'
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient'
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
import { saveAuth,save_allusers,save_clientdash} from '../../Redux/actions/index';
class Login extends Component {
  constructor(props) {
    super(props)
    this.state={
      email:'jack@hire.com',
      pwd:'123456'
    }
  }
  componentDidMount(){
    
  }
  logIn() {
    let {pwd, email} = this.state;
    let self = this

    Firebase.login(email,pwd,(res)=>{
      if(res==null){ 
        //sucessfuly logged in

        let uid=Firebase.getCurrentUser().uid;
        self.props.dispatch(saveAuth(uid))
        self.setState({uid:uid});
        //Firebase integration

        let promise1 = new Promise(
          function(resolve, reject){
            Firebase.getJobsData((res)=>{ 
              self.props.dispatch(save_clientdash(res))
              resolve(res)
            })
          }
        )

        let promise2 = new Promise(
          function(resolve, reject) {
            Firebase.getUsersData((res)=>{
              self.props.dispatch(save_allusers(res))
              resolve(res)
            })
          }
        )
    
        Promise.all([promise1, promise2]).then(res => {
          console.log('uid=', uid);
          
          //save auth token to redux store
          
          Firebase.getUserData(uid,(res)=>{
            const job = res.job;
            switch(job){
              case "work":
                self.props.navigation.navigate('Creative',{uid : this.state.uid,job:job});
                 break;
              case "hire":
                 self.props.navigation.navigate('Client',{uid : this.state.uid,job:job});
                 break;
            }
          });  
        })        

        alert("Login Successfully.");

        }
      else
        alert(res);
    })
  }
  
  render() {
    return (
      <KeyboardAwareScrollView
      style={{ flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight ,backgroundColor: Colors.brandPrimary}}
      automaticallyAdjustContentInsets={false}
      >
      <View style={{flex: 1,width: Metrics.screenWidth, height:Metrics.screenHeight,  flexDirection: 'column'}}>
        <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'center'}}>
        </View>
        <View style={{flex: 1,flexDirection: 'column'  }}>
            <View style={{flex: 0.5}}>
              <TextInput style={[Styles.textInputStyle,{flex:1,fontSize: 20}]} 
              onChangeText={(text) => this.setState({ email: text })} 
               placeholder="Login"
              ></TextInput>
            </View>
            <View style={{flex: 0.5}}>
              <TextInput style={[Styles.textInputStyle,{flex:1,fontSize: 20}]} secureTextEntry={true}
               placeholder="Password"
               onChangeText={(text) => this.setState({ pwd: text })} 
               ></TextInput>

            </View>
            <View style={{flex: 0.4,margin:20}}>
                <LinearGradient colors={[Colors.ORANGE, Colors.PINK]} style={Styles.linearGradient}>
                <TouchableOpacity onPress={() => {
                   this.logIn();
                }}>
                  <Text style={Styles.buttonText}>
                    SIGN IN
                  </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <View style={{flex: 0.5,flexDirection:'row'}}>
                <Text style={{padding:30}}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('AccountType')}}>
                  <Text style={{padding:30,color:'white'}}>SignUp</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1.5}}>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login); 