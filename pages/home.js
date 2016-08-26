'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    ScrollView,
    TouchableHighlight,
    Dimensions
} from 'react-native';

var Css = require('../style/css');
//var App = require('../service/core.app');
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
var Button = require('react-native-button');
//var Web = require('./web');
//var Percent = require('./percent');
var PageButton = require('./button');
//var Icons = require('./icons');
//var GetData = require('./getdata');
//var LongText = require('./longtext');
var Grid = require('./grid');
//var NavBar = require('./navbar');
//var FullScreen = require('./fullscreen');
// need tabs view github https://github.com/aksonov/react-native-tabs


var styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    width: (Dimensions.get('window').width - 30) / 3,
    height: 110,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  thumb: {
    width: 65,
    height: 65
  },
  text:{
    fontSize:13,
  },
  btn: {
    flex: 1,
    marginTop: 10,
    padding:5,
    width:70,
    backgroundColor: '#5cafec',
    color: '#fff', 
    fontSize: 13,
    borderRadius:2,
  },
  
});

class Home extends Component {
    constructor(props) {
        super(props);
        this._pressRow = this._pressRow.bind(this);
        this._openButton = this._openButton.bind(this);
        this._openGrid = this._openGrid.bind(this);
    }
    
    render() {
        return ( 
            <View style ={styles.container}>
            
                <ScrollView style={[Css.main,{backgroundColor:'#fff'}]}>
                    <View style={styles.list}>
                    
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={require('../images/button-ios.png')} />               
                        <Text numberOfLines={1} style={styles.text}>Button</Text>  
                        <Button onPress={this._openButton} numberOfLines={1} style={styles.btn}>
                          打开
                        </Button>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={require('../images/book-list.png')} />               
                        <Text numberOfLines={1} style={styles.text}>Grid</Text>  
                        <Button onPress={this._openGrid} numberOfLines={1} style={styles.btn}>
                          打开
                        </Button>
                    </View>
                    
                    </View>
                    <View style={Css.bottomSpace}></View>
                </ScrollView>    
                        
            </View>
        );
    }
    
    _handleType(idx) {
        this.setState({
            idx: idx
        });    
    }
    
    _openButton() {
        this. _pressRow('Button',PageButton);    
    }
    _openGrid() {
        this. _pressRow('Grid',Grid);    
    }

    
    _pressRow(title,componentname) {

        this.props.toRoute({
          name: title,
          component: componentname,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#5cafec',  
          },
        
          data:{
            
          },    
          titleStyle:{
            color: '#fff',
          }
               
        });
    }

    

    openWebview(title,url) {
        
        this.props.toRoute({
          name: title,
          component: Web,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#5cafec',  
          },
          data:{
            url: url,
            title: '打开webview' 
          },    
          titleStyle:{
            color: '#fff',
          }
               
        });
    }
}

module.exports = Home;