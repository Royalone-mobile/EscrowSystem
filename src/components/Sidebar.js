import React, { Component } from 'react'
import {DrawerItems} from 'react-navigation'
import { AppRegistry, TouchableOpacity, Text, View, FlatList } from 'react-native'
import Firebase from '../firebasehelper';
const creativemenuItems = ['Dashboard', 'Briefs', 'Settings', 'Logout'];
const clientmenuItems = ['Dashboard', 'Settings','Logout'];
class Sidebar extends Component {
  constructor (props) {
    super(props)
  }

  _renderItem = (item, index) => {
    return <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => {
      if(index==3){
          Firebase.logout((res)=>{
            if(res==null)
            {
                alert("Signout Successfully");
                this.props.navigation.navigate('Login');
            }
          });
      }
      this.props.navigation.navigate(item);
    }}>
      <Text>{item}</Text>
    </TouchableOpacity>
  }


  render () {
    return (
      <View style={{ padding: 20 }}>
      { this.props.navigation.state.params.job==='work' &&
        <FlatList
          data={creativemenuItems}
          renderItem={({item, index}) => this._renderItem(item, index)}
          keyExtractor={item => item}
        >
        </FlatList>
      }
      { this.props.navigation.state.params.job==='hire' &&
        <FlatList
          data={clientmenuItems}
          renderItem={({item, index}) => this._renderItem(item, index)}
          keyExtractor={item => item}
        >
        </FlatList>
      }
      </View>
    )
  }
}

export default Sidebar
