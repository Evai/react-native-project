/**
 * Created by Evai on 16/8/25.
 */
'use strict';

import React, { Component } from 'react';
import {
    Animated,
    Easing,
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
            <View>
            <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
                <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter"></AnimatedIcon>
            </Animated.View>
                </View>
        )
    }
}

class TwitterTab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '主页',
            notifCount: 0,
            isRefreshing: false,
        }
    }
    _onRefresh() {
        this.setState({
            isRefreshing: true,
        });
        setTimeout(() => {
            this.setState({
                isRefreshing: false,
            });
        }, 1000);
    }
    changeTab(tabName) {
        this.setState({
            selectedTab: tabName,
            notifCount: this.state.notifCount + 1
        });
    }
    _renderContent(color: string, pageText: string, num: number) {
        return (
            <ScrollView
                style={styles.twitterPostContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={()=>this._onRefresh()}
                        tintColor="#ddd"
                        title='loading...'/>}>
                <View style={[styles.tabContent, {backgroundColor: color}]}>
                    <Text style={styles.tabText}>{pageText}</Text>
                    {
                        pageText == '消息' ? <Text style={styles.tabText}>{num} message of {pageText}</Text>:
                            <Text style={styles.tabText}>This is {pageText}</Text>
                    }
                </View>
            </ScrollView>
        );
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
                    {this._renderContent('#414A8C', '主页')}
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="联系人"
                    iconName="ios-contact-outline"
                    selectedIconName="ios-contact"
                    onPress={ () => this.changeTab('联系人') }
                    selected={ this.state.selectedTab === '联系人'}>
                    {this._renderContent('#783E33', '联系人')}
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="消息"
                    iconName="ios-mail-outline"
                    selectedIconName="ios-mail"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    onPress={ () => this.changeTab('消息') }
                    selected={ this.state.selectedTab === '消息'}>
                    {this._renderContent('#21551C', '消息', this.state.notifCount)}
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="我"
                    iconName="ios-person-outline"
                    selectedIconName="ios-person"
                    onPress={ () => this.changeTab('我') }
                    selected={ this.state.selectedTab === '我'}>
                    {this._renderContent('#000', '我',)}
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

class TabBarExample extends Component {
    constructor() {
        super();
        this.state = {
            show:true,
            twitterStyle:{

            }
        };
    }

    _hideEntrance() {
        this.setState({
            show:false,
            twitterStyle:{
                flex:1
            }
        })
    }
    render() {
        let entrance = this.state.show ? <Entrance hideThis={()=> this._hideEntrance()}/>:<View></View>
        return (
            <View style={this.state.twitterStyle}>
                <TwitterTab/>
                {entrance}
            </View>
        );
    }

};

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
        width: Util.size.width,
        height:Util.size.height
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    twitterPostContainer:{
        flex:1,
    },
    entrance:{
        position: "absolute",
        top:0,
        left:0,
        height: Util.size.height,
        width: Util.size.width,
        backgroundColor:"#1b95e0",
        alignItems:"center",
        justifyContent:"center",
    },
    twitter:{
        color:"#fff",
        position:"relative",
        top: -20,
        textAlign: "center"
    },
});

module.exports = TabBarExample;