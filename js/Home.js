'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	StatusBar,
	TouchableHighlight,
	NetInfo,
	ScrollView,
	Image
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import Stopwatch from './Stopwatch';
import TabBarIos from './TabBarIOS';
import AdjustProgress from './AdjustProgress';
import Picker from './Picker';
import GetLocation from './GetLocation';
class Home extends Component{
	constructor() {
    	super();
		this.state = {
		  days:[{
			  key:0,
			  title:"Stopwatch",
			  component: Stopwatch,
			  isFA: false,
			  icon: "ios-stopwatch",
			  size: 48,
			  color: "#FF856C",
			  hideNav: false
		  },{
			  key:1,
			  title:"TabBarIOS",
			  component: TabBarIos,
			  isFA: false,
			  icon: "logo-twitter",
			  size:50,
			  color:"#2AA2EF",
			  hideNav: true,
		  },{
			  key:2,
			  title:"AdjustProgress",
			  component: AdjustProgress,
			  isFA: true,
			  icon: "adjust",
			  size:50,
			  color:"#FF856C",
			  hideNav: true,
		  },{
			  key:3,
			  title:"Picker",
			  component: Picker,
			  isFA: true,
			  icon: "crosshairs",
			  size:50,
			  color:"#2AA2EF",
			  hideNav: true,
		  },{
			  key:4,
			  title:"GetLocation",
			  component: GetLocation,
			  isFA: false,
			  icon: "md-navigate",
			  size:50,
			  color:"#FF856C",
			  hideNav: true,
		  }]
		}
  	}
	componentWillMount() {
		NetInfo.fetch().done((reach) => {
		  console.log('Initial: ' + reach);
		});
	}
	_jumpToDay(index){
    this.props.navigator.push({
      title: this.state.days[index].title,
      component: this.state.days[index].component,
      navigationBarHidden: this.state.days[index].hideNav,
    })
  }
	render() {
		var that = this;
	    var boxs = this.state.days.map(function(elem, index) {
	      return(
	        <TouchableHighlight key={elem.key}
	        					style={[styles.touchBox, index%3==2?styles.touchBox2:styles.touchBox1]}
	        					underlayColor="#eee"
	        					onPress={()=> that._jumpToDay(index)}>
	          <View style={styles.boxContainer}>
	            <Text style={styles.boxText}>{elem.title}</Text>
	            {elem.isFA? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>:
	              <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>}
	          </View>
	        </TouchableHighlight>
	      );
	    })
	    return(
	      <ScrollView>
	        <Swiper height={150} showsButtons={false} autoplay={true} autoplayTimeout={3}
	          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
	          <TouchableHighlight>
	            <View style={styles.slide}>
	              <Image style={styles.image} source={{uri:'https://www.filepicker.io/api/file/eZfHVHHRj6x3hKY7XgTr'}}></Image>
	              <Text style={styles.slideText}>Day12: Charts</Text>
	            </View>
	          </TouchableHighlight>
	          <TouchableHighlight>
	            <View style={styles.slide}>
	              <Image style={styles.image} source={{uri:'http://insights.ubuntu.com/wp-content/uploads/8063/react-native-logo.jpg'}}></Image>
	              <Text style={styles.slideText}>Day11: OpenGL</Text>
	            </View>
	          </TouchableHighlight>
	        </Swiper>
	        <View style={styles.touchBoxContainer}>
	          {boxs}
	        </View>
	      </ScrollView>
	      
	    );
//		return (
//			<View style={styles.container}>
//				<View style={styles.whatLeft}>
//					<TouchableOpacity onPress={this._goDay1}
//									style={styles.progressButton}>
//						<Text style={styles.textButton}>Day1</Text>
//					</TouchableOpacity>
//				</View>
//				<NativeBar onNaviBarPress={this._onNaviBarPress}
//							naviBarStatus={naviSatus}
//				/>
//			</View>
//		);
	}
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  itemWrapper:{
    backgroundColor: '#f3f3f3'
  },
  touchBox:{
    width: Util.size.width/3-0.33334,
    height:Util.size.width/3,
    backgroundColor:"#fff",
  },
  touchBoxContainer:{
    flexDirection: "row", 
    flexWrap:"wrap",
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox1:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox2:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
  },
  boxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: Util.size.width/3,
    height:Util.size.width/3,
  },
  boxIcon:{
    position:"relative",
    top:-10
  },
  boxText:{
    position:"absolute",
    bottom:15,
    width:Util.size.width/3,
    textAlign:"center",
    left: 0,
    backgroundColor:"transparent"
  },
  slide: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText:{
    position:"absolute",
    bottom: 0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign:"center",
    fontSize: 12
  },
  image:{
    width: Util.size.width,
    flex: 1,
    alignSelf: 'stretch',
  }
})
module.exports = Home;