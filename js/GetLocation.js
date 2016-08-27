'use strict';
import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	MapView
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
// import MapView from 'react-native-maps';
export default class Map extends Component{
	static propTypes = {
		mapType: React.PropTypes.oneOf(['standard', 'satellite','hybrid'])
	};

	constructor() {
		super();
		this.state = {
			isFirstLoad: true,
			mapRegion: undefined,
			annotations: [],
			showsUserLocation:false,
			followUserLocation:false,
			mapType: 'standard'
		};
	}

	_getAnnotations(region) {
		return [{
			longitude: region.longitude,
			latitude: region.latitude,
			title: 'You Are Here',
		}];
	}

	_onRegionChangeComplete(region) {
		if (this.state.isFirstLoad) {
			this.setState({
				annotations: this._getAnnotations(region),
				isFirstLoad: false,
			});
		}
	}
	_getLocation() {
		this.setState({
			showsUserLocation: true,
			followUserLocation:true
		})
	}
	render() {
		return(
			<View style={styles.container}>
				<MapView
					style={styles.map}
					mapType = {this.state.mapType}
					showsUserLocation={this.state.showsUserLocation}
					followUserLocation={this.state.followUserLocation}
					onRegionChangeComplete={(region) => this._onRegionChangeComplete(region)}
					initialRegion={this.state.mapRegion}
					annotations={this.state.annotations}/>
				<TouchableHighlight underlayColor="#00bd03"
									style={styles.btn}
									onPress={() => this._getLocation()}>
					<Text style={styles.btnText}>
						<Icon size={18} name="md-navigate"> </Icon>
						Find my location
					</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems: "center",
	},
	map:{
		width: Util.size.width,
		height: Util.size.height-120
	},
	btn:{
		backgroundColor:"#00a803",
		width: Util.size.width-80,
		height: 40,
		borderWidth:Util.pixel,
		borderColor: "#009302",
		borderRadius: 4,
		justifyContent:"center",
		marginTop:10,
	},
	btnText:{
		textAlign:"center",
		fontSize:18,
		color:"#fff"
	},
});