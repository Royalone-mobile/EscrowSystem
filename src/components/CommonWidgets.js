import React from 'react';
import { Platform, View, Text, StatusBar, Image, Animated, Linking, Alert, TouchableOpacity } from 'react-native';
import { Metrics, Styles, Icons, Colors, Fonts, Images } from '../theme';

const CommonWidgets = {
	renderNavBarHeader(headerText) {
		return (
			<View style={[Styles.center,{backgroundColor:Colors.ORANGE}]}>
				<Text
					style={[
						Fonts.style.h4,
						{
							textAlign: 'center',
							width: Metrics.screenWidth * 0.7,
							color: Colors.textPrimary
						}
					]}
					numberOfLines={1}
				>
					{headerText}
				</Text>
			</View>
		);
	},
	renderNavBarLeftButton(onPress, icon = 'chevron-left') {
		let iconName = icon;
		if (icon === 'close') iconName = 'times';
		if (icon == 'menu') iconName = 'bars';
		return (
			<TouchableOpacity style={{ paddingBottom: Platform.OS === 'android' ? 5 : 5 }} onPress={onPress}>
				<Icon name={iconName} size={30} color={Colors.textPrimary} />
			</TouchableOpacity>
		);
	},
};

export default CommonWidgets;
