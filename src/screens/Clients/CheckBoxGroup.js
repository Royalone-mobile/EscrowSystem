import React, { Component } from 'react'
import { CheckBox } from 'react-native-elements'
import { Image, View, ScrollView } from 'react-native'

class CheckBoxGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
          };
      }
    _toggle=() => {this.setState({ checked: !this.state.checked })}
    render(){
        return(
            <View style={{flex :1}}>
            <CheckBox
                title='Portrait'
                checked={this.state.checked}
                onPress={()=>{this._toggle()}}
             />
             <CheckBox
                title='Lifestyle'
                checked={this.state.checked}
                onPress={()=>{this._toggle()}}
             />
             <CheckBox
                title='Product'
                checked={this.state.checked}
                onPress={()=>{this._toggle()}}
             />
             </View>
        )
    }
}
export default CheckBoxGroup