'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
} from 'react-native';
let happy = require('../images/happy.jpg');
let MCV = require('./MCV');
class DiaryReader extends Component {
	render() {
		return (
			<View style={MCV.container}>
				<View style={MCV.firstRow}>
					<TouchableOpacity onPress={this.props.returnPressed}>
						<Text style={MCV.middleButton}>
							返回
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.props.readingPreviousPressed}>
						<Text style={MCV.middleButton}>
							上一篇
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.props.readingNextPressed}>
						<Text style={MCV.middleButton}>
							下一篇
						</Text>
					</TouchableOpacity>
				</View>
				<View style={MCV.secondRow}>
					<Image style={MCV.moodStyle}
							source={this.props.diaryMood}/>
					<View style={MCV.subViewInReader}>
						<TouchableOpacity onPress={this.props.selectListisItem}>
							<Text style={MCV.textInReader}>
								标题: {this.props.diaryTitle}
							</Text>
						</TouchableOpacity>
						<Text style={MCV.textInReader}>
							时间: {this.props.diaryTime}
						</Text>
					</View>
				</View>
				<View style={MCV.diaryReaderStyle}>
				<Text style={MCV.textInReader,{color:'black'}}>
					{this.props.diaryBody}
				</Text>
				</View>
			</View>
		)
	}
}

module.exports = DiaryReader;