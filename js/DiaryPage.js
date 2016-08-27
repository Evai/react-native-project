'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	AsyncStorage,
	ListView
} from 'react-native';
import NativeBar from './NativeBar';
let DiaryList = require('./DiaryList');
let DiaryWriter = require('./DiaryWriter');
let DiaryReader = require('./DiaryReader');
let happy = require('../images/happy.jpg');
let sorry = require('../images/sorry.jpg');
let surprise = require('../images/surprise.jpg');
let weisuo = require('../images/weisuo.jpg');
let ProgressBar = require('ActivityIndicator');
let TimerMixin = require('react-timer-mixin');
let Page = React.createClass ({
	realDiaryList: null,
	listIndex: 0,
	mixins: [TimerMixin],
	week: ['日','一','二','三','四','五','六'],
	bubleSortDiaryList: function() {
		let tempObj;
		let len1 = this.realDiaryList.length;
		let len2 = len1 - 1;
		for(let i = 0;i < len1.length;i++){
			for(let j = 0;j < len2 - i;j++){
				if(this.realDiaryList[j].index > this.realDiaryList[j + 1].index) {
					tempObj = this.realDiaryList[j];
					this.realDiaryList[j] = this.realDiaryList[j + 1];
					this.realDiaryList[j + 1] = tempObj;
				}
			}
		}
	},
	getInitialState: function() {
		AsyncStorage.getAllKeys().then(//获取存储中的所有key
			(keys) => {
				AsyncStorage.multiGet(keys).then(//通过keys获取存储中的所有数据
					(results) => {
						let resultsLength = results.length;
						this.realDiaryList = Array();
//						console.log(this.realDiaryList)
//						for(let i = 0;i < j;i++){//取得数据并利用JSON类的parse方法生成对象，插入日记列表
//							this.realDiaryList[i] = JSON.parse(results[i][1]);
//						}
						for (let count = 0;count < resultsLength;count++) {
							this.realDiaryList[count] = JSON.parse(results[count][1]);
						}
						this.bubleSortDiaryList();
						if(resultsLength > 0){
							resultsLength--;
							this.listIndex = resultsLength;
							let newMoodIcon;
							switch (this.realDiaryList[resultsLength].mood) {
								case 1:
									newMoodIcon = happy;
									break;
								case 2:
									newMoodIcon = sorry;
									break;
								case 3:
									newMoodIcon = surprise;
									break;
								default:
									newMoodIcon = weisuo;
							}
							let newtitle = this.realDiaryList[resultsLength].title;
							let newbody = this.realDiaryList[resultsLength].body;
							//利用Date的构造函数，从字符串中得到Date类型数据
							let cTime = new Date(this.realDiaryList[resultsLength].time);
							let timeString = '' + cTime.getFullYear() + '年' + (cTime.getMonth() + 1) + '月' 
							+ cTime.getDate() + '日  星期' + this.week[cTime.getDay()] + '  ' + cTime.getHours() + ':' 
							+cTime.getMinutes();
							let newListWithSection = [];
							let sec1 = '分区一';
							let sec2 = '分区二';
							let sec3 = '分区三';
							newListWithSection[sec1] = this.realDiaryList;
							newListWithSection[sec2] = this.realDiaryList;
							newListWithSection[sec3] = this.realDiaryList;
							let fakeSections = [sec1, sec2, sec3];
								this.setTimeout(function(){
									this.setState({//将最后一条数据写入状态机变量
									diaryMood: newMoodIcon,
									diaryTime: timeString,
									diaryTitle: newtitle,
									diaryBody: newbody,
									progress:true,
									diaryListDataSource:this.state.diaryListDataSource.cloneWithRows(this.realDiaryList),
	//								diaryListDataSource:this.state.diaryListDataSource.cloneWithRowsAndSections(newListWithSection,fakeSections)
								});
							},2000)
						}else{
							this.setState({
								diaryTime: '没有历史日记',
								diaryTitle: '没有历史日记',
								diaryBody: '',
								progress:true,
							});
						}
					},
					(errors) => {
						console.log('1st error:'+errors[0].message);
					}
				).catch((error) => {
					console.log('then error:' + error);
				});
			}, (error) => {
				console.log('getAllKeys error:' + error.message);
			}
		);
		console.log('getInitialState return reading.');
		return {//上面的读取数据操作是异步操作，不会马上得到数据，在这里给状态机变量赋初始值
			uiCode: 1,
			diaryListDataSource:new ListView.DataSource({
				rowHasChanged:(oldRow, newRow) => oldRow !== newRow,
				sectionHeaderHasChanged:(oldSH, newSH) => oldSH !== newSH
			}),
			diaryMood: happy,
			diaryTime: '读取中...',
			diaryTitle: '读取中...',
			diaryBody: '读取中...',
			progress:false
		}
	},
	readingPreviousPressed: function () {
		if(this.listIndex == 0) return;
		this.listIndex--;
		let j = this.listIndex;
		let newMoodIcon;
		switch (this.realDiaryList[j].mood) {
			case 1:
				newMoodIcon = happy;
				break;
			case 2:
				newMoodIcon = sorry;
				break;
			case 3:
				newMoodIcon = surprise;
				break;
			default:
				newMoodIcon = weisuo;
		}
		let newtitle = this.realDiaryList[j].title;
		let newbody = this.realDiaryList[j].body;
		let cTime = new Date(this.realDiaryList[j].time);
		let timeString = '' + cTime.getFullYear() + '年' + (cTime.getMonth() + 1) + '月' 
		+ cTime.getDate() + '日  星期' + this.week[cTime.getDay()] + '  ' + cTime.getHours() + ':' 
		+cTime.getMinutes();
		this.setState({//将最后一条数据写入状态机变量
			diaryMood: newMoodIcon,
			diaryTime: timeString,
			diaryTitle: newtitle,
			diaryBody: newbody
		});
	},
	readingNextPressed: function () {
		if(this.realDiaryList.length == 0) return;
		if(this.listIndex == (this.realDiaryList.length - 1)) return;
		this.listIndex++;
		let j = this.listIndex;
		let newMoodIcon;
		switch (this.realDiaryList[j].mood) {
			case 1:
				newMoodIcon = happy;
				break;
			case 2:
				newMoodIcon = sorry;
				break;
			case 3:
				newMoodIcon = surprise;
				break;
			default:
				newMoodIcon = weisuo;
		}
		let newtitle = this.realDiaryList[j].title;
		let newbody = this.realDiaryList[j].body;
		let cTime = new Date(this.realDiaryList[j].time);
		let timeString = '' + cTime.getFullYear() + '年' + (cTime.getMonth() + 1) + '月' 
		+ cTime.getDate() + '日  星期' + this.week[cTime.getDay()] + '  ' + cTime.getHours() + ':' 
		+cTime.getMinutes();
		this.setState({//将最后一条数据写入状态机变量
			diaryMood: newMoodIcon,
			diaryTime: timeString,
			diaryTitle: newtitle,
			diaryBody: newbody
		});
	},
	returnPressed: function() {//阅读日记界面，写日记界面返回日记列表界面的处理函数
		this.setState({
			uiCode: 1
		});
	},
	saveDiaryAndReturn: function(newDiaryMood,newDiaryBody,newDiaryTitle) {//写日记保存并但会日记列表
		let cTime = new Date();
		let timeString = '' + cTime.getFullYear() + '年' + (cTime.getMonth() + 1) + '月' 
		+ cTime.getDate() + '日  星期' + this.week[cTime.getDay()] + '  ' + cTime.getHours() + ':' 
		+cTime.getMinutes();
		let newMoodIcon;
		switch (newDiaryMood) {
			case 1:
				newMoodIcon = happy;
				break;
			case 2:
				newMoodIcon = sorry;
				break;
			case 3:
				newMoodIcon = surprise;
				break;
			default:
				newMoodIcon = weisuo;
		}
		let aDiary = Object();
		aDiary.title = newDiaryTitle;
		aDiary.body = newDiaryBody;
		aDiary.mood = newDiaryMood;
		aDiary.time = cTime;
		aDiary.sectionID = '' + cTime.getFullYear() + '年' + (cTime.getMonth() + 1) + '月';
		aDiary.index = Date.parse(cTime);
		AsyncStorage.setItem('' + aDiary.index, JSON.stringify(aDiary)).then(
			() => {//将新的日记存储在本地存储中
				console.log('saving success!');
			},(error) => {
				console.log('saving error:' + error.message);
			}
		);
		let totalLength = this.realDiaryList.length;
		this.realDiaryList[totalLength] = aDiary;//将新的日记加入内存中的日记列表
		this.listIndex = totalLength;
		this.setState({//更新状态机变量
			uiCode: 1,
			diaryMood: newMoodIcon,
			diaryTime: timeString,
			diaryTitle: newDiaryTitle,
			diaryBody: newDiaryBody,
			diaryListDataSource:this.state.diaryListDataSource.cloneWithRows(this.realDiaryList)
		});
	},
	writeDiary: function() {//写日记按钮被按下时的处理函数
		this.setState(() => {
			return {
				uiCode: 3
			}
		})
	},
	searchKeyword: function() {//搜索按钮被按下时的处理函数
		console.log('search button pressed, the keyword is :' + keyword);	
	},
	selectListisItem: function(aIndex) {
		this.listIndex = aIndex;
		let newDiaryTitle = this.realDiaryList[aIndex].title;
		let newDiaryBody = this.realDiaryList[aIndex].body;
		let newMoodIcon;
		switch (this.realDiaryList[aIndex].mood) {
			case 1:
				newMoodIcon = happy;
				break;
			case 2:
				newMoodIcon = sorry;
				break;
			case 3:
				newMoodIcon = surprise;
				break;
			default:
				newMoodIcon = weisuo;
		}
		let currentTime = new Date(this.realDiaryList[aIndex].time);
		let timeString = '' + currentTime.getFullYear() + '年' + (currentTime.getMonth() + 1) + '月' 
		+ currentTime.getDate() + '日  星期' + this.week[currentTime.getDay()] + '  ' + currentTime.getHours() + ':' 
		+ currentTime.getMinutes();
		this.setState({//日记列表中某条记录被选中时的处理函数
			uiCode: 2,
			diaryTime:timeString,
			diaryTitle:newDiaryTitle,
			diaryBody:newDiaryBody,
			diaryMood:newMoodIcon
		})
	},
	showDiaryList: function() {//注意，如何将状态机常量作为属性向下层react native 组件
		var naviSatus = [0, 0, 0, 1];
		if(!this.state.progress) {
			return (
				<View style={styles.container}>
					<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
						<ProgressBar progress={this.state.progress}
									styleAttr="Large"/>
					</View>
				</View>
			)	
		}
		return (//注意，如何将上层组件的某些函数作为回调函数利用属性向下层传递
			<View style={styles.container}>
				<DiaryList fakeListTitle = {this.state.diaryTitle}
					fakeListTime = {this.state.diaryTime}
					fakeListMood = {this.state.diaryMood}
					selectListisItem = {this.selectListisItem}
					searchKeyword = {this.searchKeyword}
					writeDiary = {this.writeDiary}
					diaryListDataSource={this.state.diaryListDataSource}
			/>
			</View>
			
		)
	},
	showDiaryWriter: function() {
		return (
			<DiaryWriter returnPressed={this.returnPressed}
						saveDiary={this.saveDiaryAndReturn}/>
		)
	},
	showDiaryReader: function() {//注意，如何将状态机常量作为属性向下层react native 组件
		return (//注意，如何将上层组件的某些函数作为回调函数利用属性向下层传递
			<DiaryReader returnToDiaryList={this.returnToDiaryList}
					diaryTitle = {this.state.diaryTitle}
					diaryTime = {this.state.diaryTime}
					diaryMood = {this.state.diaryMood}
					readingPreviousPressed={this.readingPreviousPressed}
					returnPressed={this.returnPressed}
					readingNextPressed={this.readingNextPressed}
					diaryBody={this.state.diaryBody}
			/>
		)
	},
	componentWillMount:function(){
//		if(StatusBarIOS != null) StatusBarIOS.setHidden(true);//隐藏ios状态栏	
	},
	updateProgress: function() {
		var progress = this.state.progress++;
		 this.setState({progress: progress});
	},
	_onNaviBarPress: function (aNumber) {
		switch (aNumber) {
			case 0:
				this.props.navigator.replace({
					name: 'Home',
					title:'Home'
				})
				return;
			case 1:
				this.props.navigator.replace({
					name: 'FindPage',
					title:'FindPage'
				})
				return;
			case 2:
				this.props.navigator.replace({
					name: 'MePage',
					title:'MePage'
				})
				return;
			case 3:
				return;
		}
		
	},
	render: function() {
		if(this.state.uiCode === 1) return this.showDiaryList();
		if(this.state.uiCode === 2) return this.showDiaryReader();
		if(this.state.uiCode === 3) return this.showDiaryWriter();
//		return (
//			<View style={styles.container}>
//				<Text>
//					Welcome to Page!
//				</Text>
//				<NativeBar onNaviBarPress={this._onNaviBarPress}
//							naviBarStatus={naviSatus}
//				/>
//				<View style={styles.whatLeft}>
//				</View>
//			</View>
//		);
	}
})
const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	whatLeft:{
		flex:1,
		borderTopWidth:1,
		borderColor:'black'
	}
})
module.exports = Page;