import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker'
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'
import  {Styles, Colors, Fonts, Metrics}  from '../../theme';
import CommonWidgets from '../../components/CommonWidgets';
import RNFetchBlob from 'react-native-fetch-blob';
import CameraRollPicker from 'react-native-camera-roll-picker';
import ImagePicker from 'react-native-image-picker';
import Firebase from '../../firebasehelper';
import ImageResizer from 'react-native-image-resizer';
class PersonInfo extends Component {
  constructor(props) {
    super(props)
    this.state={
        fullname: '',
        address: '',
        birthday: '',
        phone: '',
        instagram: '',
        tagType: '',
        avatarSource:'https://firebasestorage.googleapis.com/v0/b/monarch-5fa63.appspot.com/o/avatar.jpg?alt=media&token=9a0c8e92-38f1-4c5c-8775-cbbc46beed2d',
        jobType: props.navigation.state.params.type,
        isModalVisible: false
    }

  }
  validateName = (name) => {
    let re = /^[a-zA-Z ]+$/ 
      return re.test(name);
  };
  validateNumber = (number) => {
    let re = /^\d+$/ 
      return re.test(number);
  };
  _toggleModal = () => {this.setState({ isModalVisible: !this.state.isModalVisible })}
  
  render() {
    console.log(this.props)
    return (
      <KeyboardAwareScrollView
      style={{ flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight ,backgroundColor:'white'}}
      automaticallyAdjustContentInsets={false}
      >
      
      <View style={{flex: 1,width: Metrics.screenWidth, height:Metrics.screenHeight,  flexDirection: 'column',alignContent:'center',justifyContent:'center'}}>
            <View style={{flex: 0.5}}>
            </View>
            <View style={{flex: 1,padding:50,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'black',fontSize:20}}> A little about you</Text>
                <Text style={{color:Colors.textPlaceholder,fontSize:20,paddingTop:10,paddingBottom:10}}>Let us get to know you</Text>
            </View>
            <View style={[styles.header,{flex : 3,marginBottom:30}]}>
                <View style={styles.profilepicWrap}>
                    <Image style={styles.profilepic} source={{uri:this.state.avatarSource}}/>
                </View>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginTop:20}} onPress={()=>{
                    let options ={
                        title: 'Select Avatar',
                    }
                    ImagePicker.showImagePicker(options,(response)=>{
                        console.log('Response = ', response);

                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        }
                        else if (response.error) {
                          console.log('ImagePicker Error: ', response.error);
                        }
                        else {
                          let source = { uri: response.uri };
                          // You can also display the image using data:
                          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                      
                          this.setState({
                            avatarSource: response.uri
                          });
                        }
                    })
                }}>
                    <Text style={{color:'blue',fontSize:20}}>Pick Photo</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 2,marginTop:20}}>
              <TextInput style={[Styles.personInfotextInputStyle,{flex:1,fontSize: 20}]} placeholder="Full Name"
              onChangeText={(text) => this.setState({ fullname: text })}
              ></TextInput>
            </View>
            <View style={{flex: 2,padding:5}}>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.birthday}
                        mode="date"
                        placeholder="select your birtday"
                        format="YYYY-MM-DD"
                        
                        maxDate="2018-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys. 
                        }}
                        onDateChange={(date) => {this.setState({birthday: date})}}
            />

            </View>
            <View style={{flex: 2,padding:5}}>
              <TextInput style={[Styles.personInfotextInputStyle,{flex:1,fontSize: 20}]} placeholder="Address"
              onChangeText={(text) => this.setState({ address: text })}
              ></TextInput>
            </View>
            <View style={{flex: 2,padding:5}}>
              <TextInput style={[Styles.personInfotextInputStyle,{flex:1,fontSize: 20}]} placeholder="Phone"
              onChangeText={(text) => this.setState({ phone: text })}
              ></TextInput>
            </View>
            <View style={{flex: 2,padding:5}}>
              <TextInput style={[Styles.personInfotextInputStyle,{flex:1,fontSize: 20}]} placeholder="Instagram"
              onChangeText={(text) => this.setState({ instagram: text })}
              ></TextInput>
            </View>
            {
                this.state.jobType==='work' &&
                <View style={{flex: 2,flexDirection: 'row'}}>
                    <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                        this._toggleModal()
                        this.setState({ tagType: 'portrait' })
                    }}>
                        <LinearGradient colors={[Colors.ORANGE, Colors.PINK]} style={{height:40,borderRadius:10}}>
                            <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 20}}>Portrait</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                        this._toggleModal()
                        this.setState({ tagType: 'lifestyle' })
                    }}>
                        <LinearGradient colors={[Colors.ORANGE, Colors.PINK]} style={{height:40,borderRadius:10}}>
                            <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 20}}>Lifestyle</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                        this._toggleModal()
                        this.setState({ tagType: 'product' })
                    }}>
                        <LinearGradient colors={[Colors.ORANGE, Colors.PINK]} style={{height:40,borderRadius:10}}>
                            <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 20}}>Product</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                        this._toggleModal()
                        this.setState({ tagType: 'event' })
                    }}>
                        <LinearGradient colors={[Colors.ORANGE, Colors.PINK]} style={{height:40,borderRadius:10}}>
                            <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 20}}>Event</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            }
            {
                this.state.jobType==='work' &&
                <View style={{flex: 2,marginTop:10}}>
                
                    <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                        this._toggleModal()
                        this.setState({ tagType: 'food' })
                        }}>
                        <LinearGradient colors={[Colors.ORANGE, Colors.PINK]} style={{height:40,borderRadius:10}}>
                            <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 20}}>Food&Drink</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            }
            
            <View style={{ flex: 1 }}>
                {/* <TouchableOpacity onPress={this._toggleModal}>
                    <Text>Show Modal</Text>
                </TouchableOpacity> */}
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{flex:0.8,paddingTop:20,paddingBottom:40,paddingLeft:30,paddingRight:30,backgroundColor:'white' }}>
                        <TouchableOpacity style={{flex:0.2,alignItems:'flex-end'}} onPress={() => {
                            this.setState({ isModalVisible: false })
                     }}>
                            <Ionicon name="ios-close"  size={30} color="#000" />
                        </TouchableOpacity>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:40}}>Upload Images</Text>
                        </View>
                        <ScrollView style={{flex:10}}>
                        </ScrollView>
                        <TouchableOpacity style={{flex:0.5,alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                            let tagType=this.state.tagType;
                            alert(tagType)
                            //upload button click event
                         }}>
                            <LinearGradient colors={[Colors.ORANGE, Colors.PINK]}>
                                <Text style={{backgroundColor: 'transparent', padding: 3, color: 'white', fontSize: 20}}>Upload</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
                <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={()=>{ this.props.navigation.goBack()}}>
                    <Text style={{color:'black',fontSize:30}}>BACK</Text>
                </TouchableOpacity >
          
                <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={()=>{ 
                    if((this.state.fullname=='')||(this.state.birthday=='')||(this.state.address=='')||(this.state.phone=='')
                        ||(this.state.instagram=='')||((this.state.tagType=='')&&(this.state.jobType==='work')))
                         alert('Please fill all input!');
                    else
                        {
                            if(this.validateName(this.state.fullname)&&this.validateNumber(this.state.phone))
                            {
                                this.props.navigation.navigate('SignUp',{info : this.state});
                                
                            }
                            else
                                alert("Your fullname or phone number is not valid")
                            
                        }
                    }
                    }>
                    <Text style={{color:'black',fontSize:30}}>NEXT</Text>
                </TouchableOpacity>
            </View>
        
      </View>
      </KeyboardAwareScrollView>
      )
  }
}

export default PersonInfo;
const styles =  StyleSheet.create({
    headerBackground: {
        flex: 1,
        width: null,
        alignSelf: 'stretch'
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    profilepicWrap:{
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 10,

    },
    profilepic: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 65,
        borderColor: '#fff',
        borderWidth: 4
    }
})