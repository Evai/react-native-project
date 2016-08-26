'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Alert
} from 'react-native';
let MCV = require('./MCV');
class DiaryWriter extends Component {
	constructor(props) {
		super(props);
		this.diaryTitle = 'test title';
		this.diaryBody = 'test body';
		this.moodCode = 0;
		this.state = {
			moodText:'请选择心情'
		}
		this.returnPressed = this.returnPressed.bind(this);
	}
	returnPressed() {
		Alert.alert(
			'请确认',
			'你确认要退回日记列表吗？',
			[
				{text:'确定', onPress:this.props.returnPressed},
				{text:'取消'}
			]
		);
	}
	selectMood() {
		let tempString;
		if (this.moodCode === 4) this.moodCode = 1;
		else this.moodCode = this.moodCode + 1;
		switch (this.moodCode) {
			case 1:
				tempString = '现在的心情：高兴';
				break;
			case 2:
				tempString = '现在的心情：难过';
				break;
			case 3:
				tempString = '现在的心情：惊讶';
				break;
			case 4:
				tempString = '现在的心情：猥琐';
				break;
		}
		this.setState({
			moodText: tempString
		})
	}
	render() {
		return (
			<View style={MCV.container}>
				<View style={MCV.firstRow}>
					<TouchableOpacity onPress={this.returnPressed}>
						<Text style={MCV.smallButton}>
							返回
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.selectMood.bind(this)}>
						<Text style={MCV.longButton}>
							{this.state.moodText}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.props.saveDiary(this.moodCode,this.diaryBody,this.diaryTitle)}>
						<Text style={MCV.smallButton}>
							保存
						</Text>
					</TouchableOpacity>
				</View>
				<TextInput style={MCV.titleInputStyle}
						placeholder={'写个日记标题吧'}
						onChangeText={(text) => {this.diaryTitle=text}}
				/>
				<TextInput style={MCV.diaryBodyStyle}
						multiline={true}
						placeholder={'日记正文请在此输入'}
						onChangeText={(text) => {this.diaryBody=text}}
				/>
			</View>
		)
	}
}
module.exports = DiaryWriter;