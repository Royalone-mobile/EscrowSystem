import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
console.log(width)
class Splash extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		setTimeout(() => {
			this.props.navigation.navigate('Login');
		}, 1500);
	}

	render() {
		return <Image style={{width: width,height: height}} source={require('../assets/Loading.png')} />;
	}
}

export default Splash;