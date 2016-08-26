import React,{
  Component
} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image
} from 'react-native';
import Login from './Login';
class Splash extends Component {
	_openPage() {
		this.props.navigator.push({
			title: 'Login',
			component: Login
		})
	}
	onbutton = () => {
		alert('你按下了注册');
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={{textAlign:'center'}}>Splash Page</Text>
				<Text style={{textAlign:'center'}}><Image source={require('../../images/robot.jpg')} style={styles.robot} />
				</Text>
				<View style={styles.button}>
					<TouchableOpacity onPress={this._openPage.bind(this)} style={styles.loginButton}>
						<Text style={styles.textButton}>登录</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onbutton} style={styles.rightButton}>
						<Text style={styles.textButton}>注册</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		flex: 1, 
		backgroundColor: '#FFFFFF',
	},
	robot:{
		width:320,
		height:220,
		margin:20
	},
	button:{
		justifyContent:'space-around',
		flex:1,
		alignItems: 'center',
		flexDirection:'row',
		flexWrap:'nowrap'
	},
	textButton:{
		color: '#FFF',
		textAlign:'center'
	},
	loginButton:{
		backgroundColor:'green',
		width:100,
		height:41,
		borderRadius:10,
		overflow:'hidden',
		justifyContent:'center',
	},
	rightButton:{
		backgroundColor:'blue',
		width:100,
		height:41,
		borderRadius:10,
		overflow:'hidden',
		justifyContent:'center',
	}
})
export default Splash;