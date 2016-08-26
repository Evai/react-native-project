'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Picker
} from 'react-native';
const Item = Picker.Item;
let PickerSelect = React.createClass ({
	options:['选项一','选项二','选项三','选项四','选项五'],
	getInitialState: function() {
		return {
			choice:''
		};
	},
	componentWillMount:function() {
		
	},
	_onValueChange: function(choice:String, noUse:String) {
		this.setState({choice});
	},
	render: function() {
		return (
			<View style={styles.container}>
				<Picker style={styles.picker}
						mode={Picker.MODE_DIALOG}
						prompt='请选择'
						selectedValue={this.state.choice}
						onValueChange={this._onValueChange}
						itemStyle={styles.pickerItemStyle}>
						{this.options.map((opt) => 
							<Item label={opt}
								value={opt}
								key={opt}/>
						)}
						</Picker>
				<Text style={styles.welcome}>
					{'\r\n\r\n\r\n\r\n\r\n\r\n\r\n'}你选择了:{this.state.choice}
				</Text>
			</View>
		)
//		return (
//			<View style={styles.container}>
//				<ProgressViewIOS style={styles.progressViewStyle}
//								progress={this.state.progress}/>
//				<Text style={styles.textStyle}>你选择了{Math.round(this.state.progress*100)}%</Text>
//				<View style={styles.touchViewStyle}
//					{...this.watcher.panHandlers}>
//				</View>
//			</View>
//		);
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
module.exports = PickerSelect;