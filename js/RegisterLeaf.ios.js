'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  BackAndroid,
  Alert
} from 'react-native';
import ConfirmDialog from './ConfirmDialog';
import WaitingLeaf from './WaitingLeaf';
let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let leftStartPoint = totalWidth * 0.1;
let componentWidth = totalWidth * 0.8;
let RegisterLeaf = React.createClass ({
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     inputedNum: '',
  //     inputedPW: '',
  //   }
  // }
  getInitialState: function(){
    return {
      inputedNum:'',
      inputedPW:'',
      needToConfirm:false
    }
  },
  userAlertConfirm: function () {
    // this.setState((state) => {
    //   return {
    //     needToConfirm:true
    //   }
    // })
    Alert.alert(
        '确认框',
        '确认要使用'+this.state.inputedNum+'号码登录吗?',
        [
            {text:'cancel',onPress:this.usercanceled},
            {text:'ok',onPress:this.userConfirmed}
        ]
    );
  },
  usercanceled: function () {
    this.setState((state) => {
      return {
        needToConfirm:false
      }
    })
  },
  userConfirmed: function () {
    this.setState((state) => {
      return {
        needToConfirm:false
      }
    })
    this.props.toRoute({
      component:WaitingLeaf,
      name:'WaitingLeaf',
    })
  },
  updateNum: function(newText) {
    this.setState((oldstate) => {
      // for(var aName in oldstate){
      //   console.log(aName);
      //   console.log(oldstate[aName]);
      // }
      return {
        inputedNum: newText,
        aBrandnewStateVariable: 'I am a new variable.'
      }
    });
  },
  // changeNumDone() {
  //   console.log('React Native has changed inputed Num');
  // }
  //判断是否渲染
  // shouldComponentUpdate() {
  //   if(this.state.inputedNum.length < 3) return false;
  //   return true;
  // }
  updatePW: function(newText) {
    this.setState(() => {
      return {
        inputedPW: newText
      }
    })
  },
  tellConfirmDialogStatus: function () {
    return this.state.needToConfirm;
  },
  renderWithDialog: function () {
    return (
        <View style={styles.container}>
          <TextInput
              style={styles.numberInput}
              placeholder={'请输入手机号'}
              onChangeText={(newText) => this.updateNum(newText)} />
          <Text style={styles.textPrompt}>
            您输入的手机号:{this.state.inputedNum}
          </Text>
          <TextInput
              style={styles.passwordInput}
              placeholder={'请输入密码'}
              password={true}
              onChangeText={(newText) => this.updatePW(newText)} />
          <Text style={styles.bigTextPrompt}
                onPress={this.userAlertConfirm}
          >确定</Text>
          <ConfirmDialog userConfirmed={this.userConfirmed}
              userCanceled={this.usercanceled}
              promptToUser={'使用'+this.state.inputedNum+'手机号码登录?'}
              amIStillAlive={this.tellConfirmDialogStatus}/>
        </View>
    );
  },
  render: function() {
    if(this.state.needToConfirm) return this.renderWithDialog();
    return (
        <View style={styles.container}>
          <TextInput
              style={styles.numberInput}
              placeholder={'请输入手机号'}
              onChangeText={(newText) => this.updateNum(newText)} />
          <Text style={styles.textPrompt}>
            您输入的手机号:{this.state.inputedNum}
          </Text>
          <TextInput
              style={styles.passwordInput}
              placeholder={'请输入密码'}
              password={true}
              onChangeText={(newText) => this.updatePW(newText)} />
          <Text style={styles.bigTextPrompt}
                onPress={this.userAlertConfirm}
          >确定</Text>
        </View>
    );
  }
})
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  numberInput:{
    top:20,
    left:leftStartPoint,
    width:componentWidth,
    backgroundColor:'gray',
    fontSize:20,
    height:40
  },
  textPrompt:{
    top:30,
    left:leftStartPoint,
    width:componentWidth,
    fontSize:20,
    height:40
  },
  passwordInput:{
    top:50,
    left:leftStartPoint,
    width:componentWidth,
    backgroundColor:'gray',
    fontSize:20,
    height:40
  },
  bigTextPrompt:{
    top:70,
    left:leftStartPoint,
    width:componentWidth,
    backgroundColor:'gray',
    fontSize:30,
    color:'white',
    textAlign:'center'
  },
})
module.exports = RegisterLeaf;