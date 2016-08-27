'use strict';
import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	Modal,
	View,
	DatePickerIOS
} from 'react-native';
import Util from './utils';

class DatePicker extends Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			setDate: new Date(),
			timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
			dateTime: this._getTime(new Date())
		}
	}
	_getTime(date) {
		const monthNames = [
			"January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];
		const weekNames = [
			'Sunday','Monday','TuesDay','wednesDay','ThursDay','FriDay','SaturDay'
		]
		const day = date.getDate(),
			monthIndex = date.getMonth(),
			year = date.getFullYear(),
			hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds(),
			week = date.getDay();
		let dateTime =  day + ' ' + monthNames[monthIndex] + ' ' + year + ", "+ ' ' + weekNames[week];
		let timer = (hour<10? "0"+hour:hour)+
			":"+(minute<10? "0"+minute:minute)+
			":"+(second<10? "0"+second:second);
		return (
			<View>
				<Text style={styles.dateText}>{dateTime}</Text>
				<Text style={{fontSize:20,textAlign:'center'}}>{timer}</Text>
			</View>
		);
	}
	_showModal() {
		this.setState({visible:true})
	}
	_hideModal() {
		this.setState({visible:false})
	}
	_SaveTimeAndHideModal() {
		this.setState({
			visible:false,
			dateTime: this._getTime(this.state.setDate)
		})
	}
	_onDateChange(date) {
		this.setState({setDate:date})
	}
	render() {
		return (
			<View style={styles.container}>
				{this.state.dateTime}
				<TouchableHighlight onPress={() => this._showModal()}
									underlayColor="#F3F3F3">
					<Text style={styles.btnText}>change time</Text>
				</TouchableHighlight>
				<Modal animationType={'slide'}
					   transparent={false}
					   visible={this.state.visible}>
					<View style={styles.modalContainer}>
						<View style={styles.modalNav}>
							<TouchableHighlight underlayColor="#fff" onPress={() => this._hideModal()}>
								<Text style={[styles.btnText,{width:75,textAlign:"left"}]}>Back</Text>
							</TouchableHighlight>
							<Text style={styles.navTitle}>choose a time</Text>
							<TouchableHighlight underlayColor="#fff" onPress={() => this._SaveTimeAndHideModal()}>
								<Text style={[styles.btnText,{width:75,textAlign:"right"}]}>Save</Text>
							</TouchableHighlight>
						</View>
						<View style={styles.modalContent}>
							<DatePickerIOS date={this.state.setDate}
										   mode='date'
										   timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
										   onDateChange={(date) => this._onDateChange(date)}/>
							<DatePickerIOS date={this.state.setDate}
										   mode='time'
										   timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
										   onDateChange={(date) => this._onDateChange(date)}/>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		alignItems:"center",
		justifyContent:"center",
		height: Util.size.height,
		width: Util.size.width,
		paddingBottom:60,
		backgroundColor:'#FFF'
	},
	dateText:{
		fontSize:24
	},
	btnText:{
		color:"#4285f4",
		fontSize:16,
		paddingTop:10,
	},
	modalContainer:{
		height: Util.size.height,
		width: Util.size.width,
		backgroundColor:"#f1f1f1"
	},
	modalNav:{
		position:"relative",
		height:60,
		width:Util.size.width,
		backgroundColor:"#fff",
		flexDirection:"row",
		justifyContent:"space-between",
		paddingTop:20,
		paddingLeft:15,
		paddingRight:15
	},
	modalContent:{
		paddingTop:100
	},
	navTitle:{
		paddingTop:8,
		fontWeight:"500",
		color:"#222",
		fontSize:18
	},
});
module.exports = DatePicker;