import React,{
  Component
} from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import Welcome from './Welcome';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			age: null,
		}
	}
	_openPage() {
		this.props.navigator.push({
			component: Welcome,
			title: 'Welcome',
			params: {
				name: this.state.name,
				age: this.state.age,
				changeMyAge: (age) => {
					this.setState({ age })
				}
			}
		})
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>Form Page</Text>
				<View style={styles.rightContainer}>
					<TextInput
					value={this.state.name}
					onChangeText={name => this.setState({ name })}
					placeholder={'Enter your name'}
					style={{ height: 40, width: 300 }} />
				</View>
				<View style={styles.viewAge}>
					<Text>My age: {this.state.age ? this.state.age : 'Unknown'}</Text>
				</View>
				<View>
					<TouchableOpacity onPress={this._openPage.bind(this)} style={styles.updateButton}>
					<Text style={{ color: '#FFF' }}>Update my age</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		flexWrap:'wrap'
	},
	rightContainer: {
	    flex: 1,
	},
	viewAge:{
		justifyContent: 'center',
		alignItems: 'center',
	},
	updateButton:{
		backgroundColor:'green',
		width:100,
		height:41,
		borderRadius:10,
		overflow:'hidden',
		justifyContent:'center',
	},
})

export default Login;