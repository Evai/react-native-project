'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	Slider,
	TouchableOpacity,
	CameraRoll,
	ScrollView,
	Picker
} from 'react-native';
//var RCTCameraRollManager = require('NativeModules').CameraRollManager;
import NativeBar from './NativeBar';
let MePage = React.createClass ({
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
				return;
			case 3:
				this.props.navigator.replace({
					name: 'Page',
					title:'Page'
				})
				return;
		}
		
	},
	fetchParams:{
		first:25,
	},
	getInitialState: function() {
		return {
			images:[]
		}
	},
	componentWillMount: function() {
		CameraRoll.getPhotos(this.fetchParams).then((data) => {
			console.log(data)
			var assets = data.edges;//将获得的图片文件数据都保存阿紫data.edges中
			const images = assets.map((asset) => asset.node.image); 
			this.setState({images})
		}).catch((error) => {
			console.log('error:'+error);
		});
	},
	logError: function(error) {
		console.log('error:'+error);
	},
	getPhotosResult: function(data:Object) {
		var assets = data.edges;//将获得的图片文件数据都保存阿紫data.edges中
		const images = assets.map((asset) => asset.node.image); 
		this.setState({images});
//		let len = assets.length;
//		for(let i=0;i<len;i++){
//			asset = assets[i].node;//asset中保存着一个图片文件的各项数据，对其进行处理
//		}
		if(!data.page_info.has_next_page){//图片已全部获取完毕
			return;
		}
		this.fetchParams.after = data.page_info.end_cursor;//更改获取图片参数中的after
		CameraRoll.getPhotos(this.fetchParams).then(this.getPhotosResult, this.logError);//继续获取下50个图片
		
	},
	storeImages: function() {
		var assets = data.edges;
		const images = assets.map((asset) => asset.node.image); 
		this.setState({images});
	},
	render: function() {
		var naviSatus = [0, 0, 1, 0];
		return (
			<View style={styles.containers}>
			<ScrollView style={styles.container}>
				<View style={styles.imageGrid}>
					{this.state.images.map(
						(image) =>
						<Image style={styles.image}
							source={{uri:image.uri}}
							key={image.uri}/>
					)}
				</View>
			</ScrollView>
			<Picker
			  selectedValue={this.state.language}
			  onValueChange={(lang) => this.setState({language: lang})}>
			  <Picker.Item label="Java" value="java" />
			  <Picker.Item label="JavaScript" value="js" />
			</Picker>
			<NativeBar onNaviBarPress={this._onNaviBarPress}
					naviBarStatus={naviSatus}
			/>
			</View>
		);
//		return (
//			<View style={styles.container}>
//				<View style={styles.whatLeft}>
//				<Image style={styles.imageStyle}
//						source={this.state.image}/>
//				</View>
//				<NativeBar onNaviBarPress={this._onNaviBarPress}
//							naviBarStatus={naviSatus}
//				/>
//			</View>
//		);
	}
})
const styles = StyleSheet.create({
	containers:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	container:{
		flex:1,
		backgroundColor:'#F5FCFF'
	},
	imageGrid:{
		flex:1,
		flexDirection:'row',
		flexWrap:'wrap',
		justifyContent:'center'
	},
	image:{
		width:100,
		height:100,
		margin:10
	},
	whatLeft:{
		flex:1,
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center'
	},
	textInputStyle:{
		width:200,
		fontSize:24,
		alignItems:'center',
		justifyContent:'center'
	},
	imageStyle:{
		width:200,
		height:200
	}
})
module.exports = MePage;