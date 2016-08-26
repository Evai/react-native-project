/**
 * Day 3
 * twitter entrance animation
 */
'use strict';
import React, { Component } from 'react';
import {
	Animated,
	Easing,
	Image,
	RefreshControl,
	ScrollView,
	StyleSheet,
	TabBarIOS,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
  static propTypes = {
    hideThis: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
       transformAnim: new Animated.Value(1),
       opacityAnim: new Animated.Value(1),
     };
  }

  componentDidMount() {
    Animated.timing(         
       this.state.transformAnim,    
       {toValue: 50,
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),
      },          
    ).start();
    Animated.timing(         
       this.state.opacityAnim,    
       {toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay:2200,
      },          
     ).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 2300);
  }

  render () {
    return(
      <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
        <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter"></AnimatedIcon>
      </Animated.View>
    )
  }
}

class TwitterPost extends Component{
  constructor() {
    super();
    this.state = {
      isRefreshing: false
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 1000);
  }
  render() {
    return(
      <ScrollView
      style={styles.twitterPostContainer}
      refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this._onRefresh()}
            tintColor="#ddd"
            title='loading...'/>}>
            <View style={styles.textStyle}>
              <Text style={{fontSize:24}}>This is Home</Text>
            </View>
      </ScrollView>
    )
  }
}

class TwitterContacts extends Component{
  constructor() {
    super();
    this.state = {
      isRefreshing: false
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 1000);
  }
  render() {
    return(
        <ScrollView
            style={styles.twitterPostContainer}
            refreshControl={
              <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={()=>this._onRefresh()}
                  tintColor="#ddd"
                  title='loading...'/>}>
          <View style={styles.textStyle}>
            <Text style={{fontSize:24}}>This is Contacts</Text>
          </View>
        </ScrollView>
    )
  }
}
class TwitterMessage extends Component{
  constructor() {
    super();
    this.state = {
      isRefreshing: false
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 1000);
  }
  render() {
    return(
        <ScrollView
            style={styles.twitterPostContainer}
            refreshControl={
              <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={()=>this._onRefresh()}
                  tintColor="#ddd"
                  title='loading...'/>}>
          <View style={styles.textStyle}>
            <Text style={{fontSize:24}}>This is Message</Text>
          </View>
        </ScrollView>
    )
  }
}
class TwitterMine extends Component{
  constructor() {
    super();
    this.state = {
      isRefreshing: false
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 1000);
  }
  render() {
    return(
        <ScrollView
            style={styles.twitterPostContainer}
            refreshControl={
              <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={()=>this._onRefresh()}
                  tintColor="#ddd"
                  title='loading...'/>}>
          <View style={styles.textStyle}>
            <Text style={{fontSize:24}}>This is Mine</Text>
            <Image source={require('../images/robot.jpg')} style={{width:200, height:150}}></Image>
          </View>

        </ScrollView>
    )
  }
}

class TwitterHome extends Component{
  render() {
    return(
      <View>
        <View style={styles.nav}>
          <View style={styles.navLeft}>
            <Icon name="ios-person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
          </View>
          <View style={styles.navMid}>
            <Icon name="logo-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
          </View>
          <View style={styles.navRight}>
            <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
            <Icon name="ios-create-outline" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
          </View>
        </View>
        <TwitterPost/>
      </View>
    )
  }
}

class TwitterTab extends Component{
  constructor() {
    super();
    this.state = {
      selectedTab:'主页',
    };
  }

  changeTab(tabName) {
      this.setState({
        selectedTab: tabName
      });
  }
  render(){
    return (
      <TabBarIOS
        barTintColor="#FFF"
        tintColor="#1b95e0">
        <Icon.TabBarItem
        title="主页"
        iconName="ios-home-outline"
        selectedIconName="ios-home"
        onPress={ () => this.changeTab('主页') }
        selected={ this.state.selectedTab === '主页' }>
          <TwitterHome/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="联系人"
        iconName="ios-contact-outline"
        selectedIconName="ios-contact"
        onPress={ () => this.changeTab('联系人') }
        selected={ this.state.selectedTab === '联系人'}>
          <TwitterContacts/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="消息"
        iconName="ios-mail-outline"
        selectedIconName="ios-mail"
        onPress={ () => this.changeTab('消息') }
        selected={ this.state.selectedTab === '消息'}>
          <TwitterMessage/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="我"
        iconName="ios-person-outline"
        selectedIconName="ios-person"
        onPress={ () => this.changeTab('我') }
        selected={ this.state.selectedTab === '我'}>
          <TwitterMine/>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

export default class extends Component{
  constructor() {
    super();
    this.state = {
      show:true
    };
  }

  _hideEntrance() {
    this.setState({
      show:false
    })
  }

	render() {
    let entrance = this.state.show ? <Entrance hideThis={()=> this._hideEntrance()}/>:<View></View>
		return(
			<View style={styles.twitterContainer}>
              <TwitterTab/>
              {entrance}
            </View>
		)
	}
}

const styles = StyleSheet.create({
  itemWrapper:{
    backgroundColor: '#fff'
  },
  twitterContainer:{
    flex:1,
    width: Util.size.width,
    height: Util.size.height-67,
  },
  entrance:{
    position: "absolute",
    top:0, left:0,
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#1b95e0",
    alignItems:"center",
    justifyContent:"center"
  },
  twitter:{
    color:"#fff",
    position:"relative",
    top: -20,
    textAlign: "center"
  },
  nav:{
    flexDirection: "row",
    paddingTop: 20,
    borderBottomWidth: Util.pixel,
    borderBottomColor: "#ddd",
    paddingBottom:20,
    backgroundColor:"#fff"
  },
  navLeft:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  navMid:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  navRight:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row"
  },
  twitterPostContainer:{
    flex:1,
    width: Util.size.width,
    height:Util.size.height-138,
    zIndex:99
  },
  textStyle:{
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});
