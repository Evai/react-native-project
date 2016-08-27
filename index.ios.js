'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    BackAndroid,
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    NavigatorIOS
} from 'react-native';
import RegisterLeaf from './js/RegisterLeaf';
import Home from './js/Home';
import FindPage from './js/FindPage';
import MePage from './js/MePage';
import Page from './js/Page';
import ImageEquallyEnlarge from './js/ImageEquallyEnlarge';
const defaultRoute = {
    name: 'Home'
};
var NaviModule = React.createClass({
    configureScene: function(route) {
        return Navigator.SceneConfigs.PushFromRight;
    },
    _renderScene: function(router, navigator) {
        this._navigator = navigator;
        let Component = router.component;
        if(router.component) {
            return (
                <Component {...router.params} navigator={navigator} />
            );
        }
        switch (router.name) {
            case 'Home':
                return <Home navigator={navigator} />
            case 'FindPage':
                return <FindPage navigator={navigator} />
            case 'MePage':
                return <MePage navigator={navigator} />
            case 'Page':
                return <Page navigator={navigator} />
        }

    },
    _renderNavBar: function() {
        const styles = {
            title: {
                flex: 1, alignItems: 'center', justifyContent: 'center',
            },
            button: {
                flex: 1, width: 50, alignItems: 'center', justifyContent: 'center'
            },
            buttonText: {
                fontSize: 18, color: '#FFFFFF', fontWeight: '400',
            }
        }
        var routeMapper = {
            LeftButton(route, navigator, index, navState) {
                if(index > 0) {
                    return (
                        <TouchableOpacity
                            onPress={() => navigator.pop()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    );
                } else {
                    return null;
                }
            },
            RightButton(route, navigator, index, navState) {
                if(index > 0 && route.rightButton) {
                    return (
                        <TouchableOpacity
                            onPress={() => navigator.pop()}
                            style={styles.button}>
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                    );
                } else {
                    return null;
                }

            },
            Title(route, navigator, index, navState) {
                return (
                    <View style={styles.title}>
                        <Text style={styles.buttonText}>{route.title ? route.title : 'React Native Project'}</Text>
                    </View>
                );
            }
        };

        return (
            <Navigator.NavigationBar
                style={{
                    alignItems: 'center',
                    backgroundColor: '#55ACEE',
                    shadowOffset:{
                        width: 1,
                        height: 0.5,
                    },
                    shadowColor: '#55ACEE',
                    shadowOpacity: 0.8,
                }}
                routeMapper={routeMapper}
            />
        );
    },
    componentDidMount: function() {
        var navigator = this._navigator;
        BackAndroid.addEventListener('NaviModuleListener', () => {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }
            return false;
        })
    },
    componentWillUnmount: function() {
        BackAndroid.removeEventListener('NaviModuleListener');
    },
    render: function() {
        return (
            <Navigator
                initialRoute={defaultRoute}
                renderScene={this._renderScene}
                configureScene={this.configureScene}
                sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 64)}}
                navigationBar={this._renderNavBar()}
            />
        )
//		return (
//			<View style={styles.container}>
//				<ImageEquallyEnlarge style={styles.imageStyle1}
//									source={require('./images/robot.jpg')}
//									originalWidth={120}
//									originalHeight={70}
//				/>
//				<ImageEquallyEnlarge style={styles.imageStyle2}
//									source={require('./images/robot.jpg')}
//									originalWidth={120}
//									originalHeight={70}
//				/>
//			</View>
//		)
    },
//     render: function(){
//         return (
//             <NavigatorIOS
//                 ref='nav'
//                 style={styles.container}
//                 initialRoute={{
//                     title:"Home",
//                     component: defaultRoute,
//                     backButtonTitle: 'back',
//                     shadowHidden: true,
//                 }}
//                 itemWrapperStyle={styles.itemWrapper}
//                 tintColor="#777"
//             />
//         );
//     }
})
var styles = StyleSheet.create({
    container:{
        backgroundColor:'blue'
    },
    itemWrapper:{
        backgroundColor: '#f3f3f3'
    },
    imageStyle1:{
        width:240,
        height:360,
        backgroundColor:'red'
    },
    imageStyle2:{
        width:300,
        height:460,
        backgroundColor:'red'
    },
})
// var NaviModule = React.createClass({
//     _onLayout: function (event) {
//         {//这里使用大括号是为了将let结构复制得到的变量作用域限制
//             //在大括号内,因为接下来还要解构赋值一次
//             //使用解构赋值取得设备放置方式被改变后的宽、高与左上角坐标
//             let {x,y,width,height} = event.nativeEvent.layout;
//             console.log('View wdith:'+width);
//             console.log('View height:'+height);
//             console.log('View x:'+x);
//             console.log('View y:'+y);
//         }
//         let Dimensions = require('Dimensions');
//         let {width,height} = Dimensions.get('window');
//         console.log('Dimensions width:'+width);
//         console.log('Dimensions height:'+height);
//         console.log('\r\n');
//     },
//     _onLayoutText: function (event) {//Text组件的onLayout回调函数
//         let {x,y,width,height} = event.nativeEvent.layout;
//         console.log('Text wdith:'+width);
//         console.log('Text height:'+height);
//         console.log('Text x:'+x);
//         console.log('Text y:'+y);
//         console.log('\r\n');
//     },
//     render: function () {
//         return (
//             <View style={styles.container}
//                     onLayout={this._onLayout}
//             >
//                 <Text style={styles.welcome}
//                       onLayout={this._onLayoutText}
//                 >
//                     Welcome to React Native!
//                 </Text>
//             </View>
//         )
//     }
// })
// var styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor:'#F5FCFF'
//     },
//     welcome:{
//         fontSize:20,
//         textAlign:'center',
//         margin:10
//     }
// })
// class NaviModule extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             _navigator:''
//         }
//     }
//     configureScene(route) {
//         return Navigator.SceneConfigs.FadeAndroid;
//     }
//     _renderScene(router, navigator) {
//         // this._navigator = navigator;
//         // switch (router.name) {
//         //     case 'registrer':
//         //         return <RegisterLeaf navigator={navigator}/>
//         // }
//         let Component = router.component;
//         return (
//             <Component {...router.params} navigator={navigator} />
//         );
//     }
//     renderScene(router, navigator) {
//         this.state._navigator = navigator;
//         switch (router.name) {
//             case 'register':
//                 return <RegisterLeaf navigator={navigator}/>
//             case 'waiting':
//                 return <WaitingLeaf phoneNumber={router.phoneNumber} userPW={router.userPW} navigator={navigator}/>
//         }
//     }
//     componentDidMount() {
//         var navigator = this.state._navigator;
//         BackAndroid.addEventListener('NaviModuleListener', () => {
//             if (navigator && navigator.getCurrentRoutes().length > 1) {
//                 navigator.pop();
//                 return true;
//             }
//             return false;
//         })
//     }
//     componentWillUnmount() {
//         BackAndroid.removeEventListener('NaviModuleListener');
//     }
//     render() {
//         return (
//             <Navigator
//                 initialRoute={{name:'register'}}
//                 renderScene={this.renderScene}
//                 configureScene={this.configureScene} />
//         )
//     }
//
// }

AppRegistry.registerComponent('MyProject', () => NaviModule);