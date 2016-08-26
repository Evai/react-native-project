'use strict';
import React, { Component } from 'react';
import {
	StyleSheet
} from 'react-native';
let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let textSize = totalWidth / 18;
let readingUITitleHeight = textSize * 6;
let diaryBodyLine = totalHeight / textSize - 6;
let returnButtonHeight = textSize * 5;
const MCV = StyleSheet.create({
	container:{
		top:2,
		flex:1,
		alignItems:'center',
		backgroundColor:'#F5FCFF',
		borderColor:'black',
		borderWidth:1
	},
	firstRow:{
		height:textSize * 1.4 + 2,
		flexDirection:'row',
		width:totalWidth - 4,
		justifyContent:'space-around',
		margin:2
	},
	longButton:{
		height:textSize * 1.4,
		backgroundColor:'gray',
		width:textSize * 10,
		borderRadius:8,
		textAlign:'center',
		fontSize:textSize
	},
	middleButton:{
		height:textSize * 1.4,
		backgroundColor:'gray',
		width:textSize * 5,
		borderRadius:8,
		textAlign:'center',
		fontSize:textSize
	},
	diaryAbstractList:{
		flex:1,
		margin:4,
		width:totalWidth - 4,
		justifyContent:'center',
		backgroundColor:'grey'
	},
	diaryBodyStyle:{
		flex:1,
		margin:4,
		width:totalWidth - 8,
		backgroundColor:'grey',
		fontSize:textSize
	},
	smallButton:{
		height:textSize * 1.4,
		backgroundColor:'gray',
		width:textSize * 3,
		borderRadius:8,
		textAlign:'center',
		fontSize:textSize
	},
	moodStyle:{
		height:textSize * 3.2,
		width:textSize * 3.2,
		borderRadius:textSize * 1.6
	},
	subViewInReader:{
		width:totalWidth - 5 - textSize * 3.2
	},
	textInReader:{
		height:textSize * 1.4,
		fontSize:16,
		backgroundColor:'grey',
		margin:2
	},
	secondRow:{
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'grey',
		borderRadius:4,
		margin:1
	},
	titleInputStyle:{
		height:textSize * 2.4,
		fontSize:textSize,
		margin:4,
		color:'black',
		borderWidth:2,
		borderColor:'black',
		width:totalWidth - 8
	},
	searchBarTextInput:{
		backgroundColor:'white',
		borderColor:'black',
		borderWidth:1,
		height:textSize * 1.4,
		width:textSize * 10,
		paddingTop:0,
		paddingBottom:0,
		top:1,
		left:1,
		fontSize:14
	}
})
module.exports = MCV;