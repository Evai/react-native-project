'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
let GetLocation = React.createClass ({
	watchID:null,
	getPositionResult: function(pos) {
		console.log(pos);
	},
	logError: function(error) {
		console.log(error);
	},
	componentDidMount: function() {
		let para = {
			enableHighAccuracy:true,//允许高精度定位
			timeout:10000,//10秒没得到位置信息停止获取
			maximumAge:1000//定位结果缓存1秒
		}
		//请求获取地理位置信息，结果视情况异步交给两个毁掉函数中的一个
		navigator.geolocation.getCurrentPosition(
			this.getPositionResult, this.logError, para
		);
		//启动地理位置变化监听器
		this.watchID = navigator.geolocation.watchPosition(this.getPositionResult);
	},
	componentWillUnmount: function() {
		//应用推出前，关闭地理位置变化监听器
		navigator.geolocation.clearWatch(this.watchID);
	},
	render: function() {
		return null;
	}
})
const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#F5FCFF'
	},
	welcome:{
		fontSize:24,
		margin:10,
		textAlign:'center'
	},
	picker:{
		width:200,
		height:600
	},
	pickerItemStyle:{
		width:100,
		height:600
	}
})
module.exports = GetLocation;