'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	Platform,
	ListView
} from 'react-native';
let happy = require('../images/happy.jpg');
let MCV = require('./MCV');
class DiaryList extends Component {
	constructor(props) {
		super(props);
		this.updateSearchKeywords = this.updateSearchKeywords.bind(this);
		this.renderListItem = this.renderListItem.bind(this);
		this.state = {
			buttonText: '点击搜索日记列表'
		}
		this.keyword = '';
	}
	updateSearchKeywords(newWord) {//将用户输入的搜索关键字交给上层组件，由上层组件对日记列表进行处理，只显示日记
		this.keyword = newWord;//标题中包含日记的关键字
	}
	getTimeString(aTime) {
		let week = ['日','一','二','三','四','五','六'];
		let cTime = new Date(aTime);
		return '' + cTime.getFullYear() + '年' + (cTime.getMonth() + 1) + '月' 
		+ cTime.getDate() + '日  星期' + week[cTime.getDay()] + '  ' + cTime.getHours() + ':' 
		+cTime.getMinutes();
	}
	renderListItem(rowData: string, sectionID:number, rowID:number, highlightRow: (sectionID: number, rowID: number) => void) {
		//log代表当前列的相应数据，由开发者通过dataSource提供
		//sectionID代表当前列表的分段号
		//rowID代表当前行在整个列表中的行号
		return (
			//按下事件上报时会带上本行在列表中的行号
			<TouchableOpacity onPress={() => this.props.selectListisItem(rowID)}>
				<View style={MCV.secondRow}>
				{
					(rowData.mood === 0)?(
						<Image style={MCV.moodStyle}
							source={happy}
						/>
					):(
						<Image style={MCV.moodStyle}
							source={rowData.mood}
						/>
					)
				}
					<View style={MCV.subViewInReader}>
						<Text style={MCV.textInReader}>
							{rowData.title}
						</Text>
						<Text style={MCV.textInReader}>
							{this.getTimeString(rowData.time)}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
	_renderSectionHeader(sectionData:object, sectionID:string) {
		console.log(sectionData)
		console.log(1)
		return (
			<View style={MCV.section}>
				<Text style={MCV.sectionText}>{sectionID}</Text>	
			</View>
		)
	}
	_renderSeparator() {
		return (
			<View style={MCV.section}>
				<Text style={MCV.sectionText}>我是Separator</Text>	
			</View>
		)
	}
	_renderHeader() {
		console.log(2)
		return (
			<View style={MCV.section}>
				<Text style={MCV.sectionText}>我是Header</Text>	
			</View>
		)
	}
	_renderFooter() {
		console.log(3)
		return (
			<View style={MCV.section}>
				<Text style={MCV.sectionText}>我是Footer</Text>	
			</View>
		)
	}
	render() {
		return (
			<View style={MCV.container}>
				<View style={MCV.firstRow}>
					{
						(Platform.OS === 'android')?
						(
							<View style={{borderWidth:1}}>
								<TextInput autoCapitalize='none'
										placeholder='输入搜索关键词'
										clearButoonMode='while-editing'
										onChangeText={this.updateSearchKeywords}
										style={MCV.searchBarTextInput}
								/>
							</View>
						):(
							<TextInput autoCapitalize='none'
										placeholder='输入搜索关键词'
										clearButoonMode='while-editing'
										onChangeText={this.updateSearchKeywords}
										style={MCV.searchBarTextInput}
								/>
						)
					}
					<TouchableOpacity onPress={this.props.writeDiary}>
						<Text style={MCV.middleButton}>
							写日记
						</Text>
					</TouchableOpacity>
				</View>
				<ListView dataSource={this.props.diaryListDataSource}
						renderRow={this.renderListItem}>
						renderSectionHeader={this._renderSectionHeader}
						renderSeparator={this._renderSeparator}
						renderHeader={this._renderHeader}
						renderFooter={this._renderFooter}
				</ListView>
			</View>
		)
		//datasource描述列表的数据，它来源于上层组件
		//renderRow描述如何渲染列表中的每一行，它挂接renderListItem函数
	}
}
module.exports = DiaryList;

//<View style={MCV.diaryAbstrctList}>
//					<View style={MCV.secondRow}>
//						<Image style={MCV.moodStyle}
//								source={happy}
//						/>
//						<View style={MCV.subViewInReader}>
//							<TouchableOpacity onPress={this.props.selectListisItem}>
//								<Text style={MCV.textInReader}>
//									某变量记录假日记列表标题
//								</Text>
//							</TouchableOpacity>
//							<Text style={MCV.textInReader}>
//								某变量记录假日记列表标时间
//							</Text>
//						</View>
//					</View>
//				</View>