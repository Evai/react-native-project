'use strict';
import React, { Component } from 'react';
import {
	Image
} from 'react-native';
class ImageEquallyEnlarge extends Component {
	static propTypes = {
	    originalWidth: React.PropTypes.number.isRequired,
	    originalHeight: React.PropTypes.number.isRequired,
	};
	constructor(props){
        super(props);
        console.log(props);
		this.state = {
			style:{}
		}
		this.onImageLayout = this.onImageLayout.bind(this);
	}
	onImageLayout (event) {
		let layout = event.nativeEvent.layout;
		if(layout.width <= this.props.originalWidth) return;
		if(layout.height <= this.props.originalHeight) return;
		let orginalAspectRatio = this.props.originalWidth / this.props.originalHeight;
		let currentAspectRatio = layout.wdith / layout.height;
		if(orginalAspectRatio === currentAspectRatio) return;
		if(orginalAspectRatio < currentAspectRatio) {
			let newHeight = layout.width / orginalAspectRatio;
			this.setState({
				style:{
					height:newHeight
				}
			})
			return;
		}
		let newWidth = layout.height * orginalAspectRatio;
		this.setState({
			style:{
				width:newWidth
			}
		})
	}
	render() {
		return (
			<Image {...this.props}
					style={[this.props.style, this.state.style]}
					onLayout={this.onImageLayout}
			></Image>
		);
	}
}

module.exports = ImageEquallyEnlarge;