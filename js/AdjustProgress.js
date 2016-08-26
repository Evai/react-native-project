'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	PanResponder,
	ProgressViewIOS,
} from 'react-native';
let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let AdjustProgress = React.createClass ({
	watcher:null,//成员变量用来保存监视器
	startX:0,
	getInitialState: function() {
		return {
			progress:0,
			leftPoint:1
		};
	},
	componentWillMount:function() {
		this.watcher = PanResponder.create({//建立监视器
			onStartShouldSetPanResponder:()=>true,//这个事件处理函数直接返回true
			onPanResponderGrant:this._onPanResponderGrant,//我们只关心按下和移动两个
			onPanResponderMove:this._onPanResponderMove,//事件，只挂接着两个事件处理函数
			onPanResponderEnd:this._onPanResponderEnd
		})
	},
	_onPanResponderGrant:function(e:Object, gestureState:Object) {
		let touchPointX = gestureState.x0;//获取触摸点的横坐标
		let progress;
		if(touchPointX < 20) progress = 0;//如果按压值超过起点，百分值按0算
		else {
			if(touchPointX > (totalWidth - 40)) progress = 1;//如果按压值超过终点，百分值按1算
			else progress = (touchPointX - 20) / (totalWidth - 40);//计算出对应的百分值
		}
		this.setState({progress});
		this.startX = gestureState.x0;//按住滑块，记录偏移值
	},
	_onPanResponderMove:function(e:Object, gestureState:Object) {
		let touchPointX = gestureState.moveX;
		let progress;
		if(touchPointX < 20) progress = 0;
		else {
			if(touchPointX > (totalWidth - 40)) progress = 1;
			else progress = (touchPointX - 20) / (totalWidth - 40);
		}
		this.setState({progress});
		let leftPoint;
		if(gestureState.moveX < this.startX) leftPoint = 1;//滑块向左偏移到尽头，不继续偏移
		else {
			if (gestureState.moveX > totalWidth - 42 - 48 + this.startX){
				leftPoint = totalWidth - 42 - 48;//需要改变滑块的显示位置
			}else{
				leftPoint = gestureState.moveX - this.startX;//滑块向右偏移到尽头，不继续偏移
				//解锁屏幕，跳转界面
			}
		}
		this.setState({
			leftPoint:leftPoint
		})
		
	},
	_onPanResponderEnd:function(e:Object, gestureState:Object) {
		let leftPoint = 1;
		this.setState({
			leftPoint:leftPoint
		})
	},
	render: function() {
		return (
			<View style={styles.container}>
				<View style={styles.barViewStyle}>
					<View style={[styles.buttonViewStyle,{left:this.state.leftPoint}]}
						{...this.watcher.panHandlers}>
					</View>
				</View>
				<ProgressViewIOS style={styles.progressViewStyle}
								 progress={this.state.progress}/>
				<Text style={styles.textStyle}>你选择了{Math.round(this.state.progress*100)}%</Text>
				<View style={styles.touchViewStyle}
					  {...this.watcher.panHandlers}>
				</View>
			</View>
		)
	}
})
const styles = StyleSheet.create({
	container:{
		flex:1,
		width:totalWidth,
		height:totalHeight,
		backgroundColor:'#FFF'
	},
	progressViewStyle:{
		width:totalWidth - 40,
		left:20,
		top:150
	},
	touchViewStyle:{
		width:totalWidth - 20,
		left:10,
		top:180,
		height:40,
		backgroundColor:'transparent',
		position:'absolute'
	},
	textStyle:{
		fontSize:30,
		left:20,
		top:70
	},
	barViewStyle:{
		width:totalWidth - 40,
		left:20,
		top:50,
		height:50,
		backgroundColor:'grey',
		borderRadius:25,
		flexDirection:'row'
	},
	buttonViewStyle:{
		width:48,
		height:48,
		borderRadius:24,
		backgroundColor:'white',
		left:1,
		top:1
	}
})
module.exports = AdjustProgress;