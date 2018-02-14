import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Text,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import CameraRollPicker from 'react-native-camera-roll-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import ImagePicker from 'react-native-image-picker';
import Firebase from '../../firebasehelper';
import ImageResizer from 'react-native-image-resizer';
export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this._image = '';
    this.state = {
      modalVisible: false,
    };
    this.onActionsPress = this.onActionsPress.bind(this);
    this.getSelectedImages = this.getSelectedImages.bind(this);
  }
   
  getSelectedImages = (selectedImages, currentImage) => {
    
    const image = currentImage.uri
    this._image = image
    console.log("uri",image)
  }
  uploadImage(uri,imageName){
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    const uploadUri = Platform.OS === 'ios'
    ? uri.replace('file://', '')
    : uri
    let mime = 'image/jpg'
    let uploadBlob = null
    const imageRef = Firebase.storage().ref('posts').child(`${imageName}.jpg`)
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

    // let mime = 'application/octet-stream'
    // return fs.readFile(uri, 'base64')
    //   .then((data) => {
    //     return Blob.build(data, { type: `${mime};BASE64` })
    // })
    // .then((blob) => {
    //     uploadBlob = blob
    //     return imageRef.put(blob, { contentType: mime })
    //   })
    //   .then(() => {
    //     uploadBlob.close()
    //     return imageRef.getDownloadURL()
    //   })
  }

  setModalVisible(visible = false) {
    this.setState({modalVisible: visible});
  }

  onActionsPress = () => {
    const options = ['Choose From Library', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      const options = {
        quality: 1.0,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      }
      switch (buttonIndex) {
        case 0:
          ImagePicker.launchImageLibrary(options,(response)=>{
            console.log("uri",response.uri)
            ImageResizer.createResizedImage(response.uri,400,300,'JPEG',80)
            .then((resizedImageUri)=>{
                let date = new Date().toString()
                this.uploadImage(resizedImageUri.uri, date).then((url)=>{
                console.log("url",url)
                this.props.onSend({
                  image: url
                });
                //this.props.onSend(url);
              })
            })
            .catch((error)=>{
              console.log(error)
            })
            
          })
          break;
        case 1:
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.props.onSend({
                location: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
          break;
        default:
      }
    });

  }

  

  renderNavBar() {
    return (
      <NavBar style={{
        statusBar: {
          backgroundColor: '#FFF',
        },
        navBar: {
          backgroundColor: '#FFF',
        },
      }}>
        <NavButton onPress={() => {
          this.setModalVisible(false);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Cancel'}
          </NavButtonText>
        </NavButton>
        <NavTitle style={{
          color: '#000',
        }}>
          {'Camera Roll'}
        </NavTitle>
        <NavButton onPress={() => {
          this.setModalVisible(false);
      
          let imageName = new Date().toString()
          // uploadImage(images[0],imageName).then((url)=>{
          //   this.props.onSend(url);
          // }) 
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Send'}
          </NavButtonText>
        </NavButton>
      </NavBar>
    );
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View
        style={[styles.wrapper, this.props.wrapperStyle]}
      >
        <Text
          style={[styles.iconText, this.props.iconTextStyle]}
        >
          +
        </Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
      {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  icon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};
