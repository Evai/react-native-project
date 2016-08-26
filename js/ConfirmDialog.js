'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	BackAndroid
} from 'react-native';
let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let ConfirmDialog = React.createClass ({
	propTypes:{
		userConfirmed:React.PropTypes.func.isRequired,
		userCanceled:React.PropTypes.func.isRequired,
		amIStillAlive:React.PropTypes.func.isRequired,
		promptToUser: React.PropTypes.string.isRequired
	},
	getDefaultProps: function () {
		return {
			promptToUser:'确认框'
		}
	},
	componentDidMount: function () {
		var amIStillAlive = this.props.amIStillAlive;
		console.log(amIStillAlive())
		BackAndroid.addEventListener('ConfirmDialogListener', () => {
			if (amIStillAlive()) {
				this.props.userCanceled();
				return true;
			}
			return false;
		})
	},
	componentWillUnmount: function () {
		BackAndroid.removeEventListener('ConfirmDialogListener');
	},
	render: function() {
		return (
			<View style={styles.confirmCont}>
				<View style={styles.dialogStyle}>
					<Text style={styles.textPrompt}>
						{'\r\n'}{this.props.promptToUser}
					</Text>
					<Text style={styles.yesButton}
						  onPress={this.props.userConfirmed}
						  numberOfLines={3}
					>
						{'\r\n'}确定
					</Text>
					<Text style={styles.cancelButton}
						  onPress={this.props.userCanceled}
						  numberOfLines={3}
					>
						{'\r\n'}取消
					</Text>
				</View>
			</View>
		);
	}
})
const styles = StyleSheet.create({
	confirmCont:{
		position:'absolute',
		top:0,
		width:totalWidth,
		height:totalHeight,
		backgroundColor:'rgba(52,52,52,.5)'
	},
	dialogStyle:{
		position:'absolute',
		top:totalHeight * 0.4,
		left:totalWidth / 10,
		width:totalWidth * 0.8,
		height:totalHeight * 0.3,
		backgroundColor:'white'
	},
	textPrompt:{
		color:'black',
		fontSize:20,
		textAlign:'center'
	},
	yesButton:{
		position:'absolute',
		bottom:10,
		left:10,
		width:totalWidth * 0.35,
		height:totalHeight * 0.12,
		backgroundColor:'gray',
		fontSize:20,
		color:'white',
		textAlign:'center'
	},
	cancelButton:{
		position:'absolute',
		bottom:10,
		right:10,
		width:totalWidth * 0.35,
		height:totalHeight * 0.12,
		backgroundColor:'gray',
		fontSize:20,
		color:'white',
		textAlign:'center'
	}
})
module.exports = ConfirmDialog;