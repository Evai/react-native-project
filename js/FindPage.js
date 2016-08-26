'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	WebView,
	TouchableOpacity,
	TextInput
} from 'react-native';
import NativeBar from './NativeBar';
let FindPage = React.createClass ({
	inputURL:'',//成员变量，用来记录用户输入的网址
	getInitialState: function() {
		return {
			source:{
				uri:'http://news.sina.com.cn'//打开网址
			},
			status:'no page loaded',//默认状态栏文字
			backButtonEnabled:false,//后退按钮是否可按
			forwardButtonEnabled:false//前进按钮是否可按
		}
	},
	componentWillMount: function() {
		
	},
	_onChangeText: function(newText) {
//		console.log(newText)
		this.inputURL = newText;
	},
	_onNavigationStateChange: function(navState) {
		//可以通过navState.url获取当前加载的网页元素
		//可以通过navState.loading获取加载是否完成
			this.setState({
				backButtnavonEnabled:navState.canGoBack,
				forwardButtonEnabled:navState.canGoForward,
				status:navState.title,
				uri:navState.url
			})
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
				return;
			case 2:
				this.props.navigator.replace({
					name: 'MePage',
					title:'MePage'
				})
				return;
			case 3:
				this.props.navigator.replace({
					name: 'Page',
					title:'Page'
				})
				return;
		}
		
	},
	goBack: function() {
		this.refs.webViewRef.goBack();
	},
	goForward: function() {
		this.refs.webViewRef.goForward();
	},
	pressGoButton:function() {//打开用户输入的网址
		var uri = this.inputURL.toLowerCase();
		if(uri == this.state.source.uri) {
			this.refs.webViewRef.reload();
		}else{
			let source = {};
			source.uri = uri;
			this.setState({source});
		}
	},
	_renderError: function() {
		return (
			<View style={styles.container}>
				<Text>出错啦</Text>
			</View>
		)
	},
	render: function() {
		var naviSatus = [0, 1, 0, 0];
		return (
			<View style={styles.container}>
				<StatusBar hidden={false}/>
				<View style={styles.addressBarRow}>
					<TouchableOpacity onPress={this.goBack}
							style={this.state.backButtnavonEnabled ? styles.naviButton : styles.disableButton}>
						<Text>{'<'}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.goFoward}
							style={this.state.forwardButtonEnabled ? styles.naviButton : styles.disableButton}>
						<Text>{'>'}</Text>
					</TouchableOpacity>
					<TextInput ref='urlInputRef'
							autoCapitalize='none'
							defaultValue={this.state.uri}
							onSubmitEditing={this.goPressButton}
							onChangeText={this._onChangeText}
							clearButtonMode='while-editing'
							style={styles.addressBarTextInput}/>
					<TouchableOpacity onPress={this.pressGoButton}>
						<View>
							<Text>Go!</Text>
						</View>
					</TouchableOpacity>
				</View>
				<WebView ref='webViewRef'
						automaticallyAdjustContentInsets={true}
						style={styles.webView}
						source={this.state.source}
						javaScriptEnable={true}
						domStorageEnable={false}
						onNavigationStateChange={this._onNavigationStateChange}
						startInLoadingState={true}
						renderError={this._renderError}/>
				<View style={styles.statusBar}>
					<Text style={styles.statusBarText}>{this.state.status}</Text>
				</View>
				<NativeBar onNaviBarPress={this._onNaviBarPress}
							naviBarStatus={naviSatus}
				/>
			</View>
		);
//		return (
//			<View style={styles.container}>
//				<Text>
//					Welcome to FindPage!
//				</Text>
//				<View style={styles.whatLeft}></View>
//				<NativeBar onNaviBarPress={this._onNaviBarPress}
//							naviBarStatus={naviSatus}
//				/>
//			</View>
//		);
	}
})
const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'blue'
	},
	addressBarRow:{
		flexDirection:'row',
		padding:8
	},
	webView:{
		backgroundColor:'white',
		height:350
	},
	addressBarTextInput:{
		backgroundColor:'white',
		borderColor:'transparent',
		borderRadius:3,
		borderWidth:1,
		height:24,
		paddingLeft:10,
		paddingTop:3,
		paddingBottom:3,
		flex:1,
		fontSize:14
	},
	naviButton:{
		width:20,
		padding:3,
		marginRight:3,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'white',
		borderColor:'transparent',
		borderRadius:3
	},
	disableButton:{
		width:20,
		padding:3,
		marginRight:3,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'grey',
		borderColor:'transparent',
		borderRadius:3
	},
	goButton:{
		height:24,
		padding:3,
		marginLeft:8,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'white',
		borderColor:'transparent',
		borderRadius:3,
		alignSelf:'stretch'
	},
	statusBar:{
		flexDirection:'row',
		alignItems:'center',
		paddingLeft:5,
		height:22
	},
	statusBarText:{
		color:'white',
		fontSize:13
	}
})
module.exports = FindPage;