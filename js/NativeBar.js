'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text
} from 'react-native';
import Dimensions from 'Dimensions';
let totalWidth = Dimensions.get('window').width;
let naviButtonWidth = totalWidth / 4;
let naviButtonHeight = naviButtonWidth * 0.75;
let NativeBar = React.createClass ({
  propTypes: {
    naviBarStatus: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    onNaviBarPress: React.PropTypes.func.isRequired,
  },
  _onNaviBarPress0: function () {
      this.props.onNaviBarPress(0);
  },
  _onNaviBarPress1: function () {
      this.props.onNaviBarPress(1);
  },
  _onNaviBarPress2: function () {
      this.props.onNaviBarPress(2);
  },
  _onNaviBarPress3: function () {
      this.props.onNaviBarPress(3);
  },
  render: function() {
    var buttonColors = this.props.naviBarStatus.map(function(aNumber){
        if(aNumber == 0) return 'white';
        return 'gray';
    })
    return (
        <View style={styles.naviRow}>
          <TouchableHighlight style={styles.button} onPress={this._onNaviBarPress0}>
            <View style={[styles.button,{backgroundColor:buttonColors[0]}]}>
              <Text style={styles.textStyle}>栏目一</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onNaviBarPress1}>
            <View style={[styles.button,{backgroundColor:buttonColors[1]}]}>
              <Text style={styles.textStyle}>栏目二</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onNaviBarPress2}>
            <View style={[styles.button,{backgroundColor:buttonColors[2]}]}>
              <Text style={styles.textStyle}>栏目三</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onNaviBarPress3}>
            <View style={[styles.button,{backgroundColor:buttonColors[3]}]}>
              <Text style={styles.textStyle}>栏目四</Text>
            </View>
          </TouchableHighlight>
        </View>
    );
  }
})
const styles = StyleSheet.create({
  naviRow: {
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  button: {
    width:naviButtonWidth,
    height:naviButtonHeight,
    justifyContent:'center',
    alignItems:'center'
  },
  textStyle: {
    fontSize:20,
    textAlign:'center'
  }
})
module.exports = NativeBar;