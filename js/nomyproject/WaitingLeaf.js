'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import Home from './Home';
let WaitingLeaf = React.createClass ({
	_goback: function() {
		this.props.navigator.pop();
	},
	_onNaviBarPress: function () {
		this.props.navigator.push({
			component: Home,
			title: 'Home',
		})
	},
	render: function() {
		return (
			<View style={styles.container}>
				<Text style={styles.textPromptStyle}>
					注册使用手机号:{this.props.phoneNumber}
				</Text>
				<Text style={styles.textPromptStyle}>
					注册使用密码:{this.props.userPW}
				</Text>
				<Text style={styles.bigTextPrompt}
					  onPress={this._onNaviBarPress}
				>
					进入首页
				</Text>
			</View>
		);
	}
})
const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#F5FCFF'
	},
	textPrompt:{
		fontSize:20
	},
	bigTextPrompt:{
		width:300,
		backgroundColor:'gray',
		color:'white',
		textAlign:'center',
		fontSize:30
	}
})
module.exports = WaitingLeaf;