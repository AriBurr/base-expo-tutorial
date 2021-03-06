/*
	ImageWithAspect.js
	BettermentLabs

	Created by Charles Major on 9/13/17. 
	Copyright © 2017 BettermentLabs. All rights reserved.
*/
import React from 'react';
import { Image } from 'react-native';
import ResolveAssetSource from 'resolveAssetSource';

export default class ImageWithAspect extends React.Component {
	state = {
		width: 0,
		height: 0,
		widthStyle: '100%',
		heightStyle: '100%',
		aspectRatio: 1.0
	}

	componentDidMount() {
        if (this.props.source == null || this.props.source == undefined) {return}
		const imageDims = ResolveAssetSource(this.props.source);

		const aspectRatio = (imageDims.width / imageDims.height);

		var newState = this.state;
		newState.width = imageDims.width;
		newState.height = imageDims.height;
		newState.aspectRatio = aspectRatio;

		if (aspectRatio < 1.0) {
			newState.heightStyle = (1/aspectRatio * 100 + '%');
		} else {
			newState.widthStyle = (aspectRatio * 100 + '%');
		}
		this.setState ({
			newState
		})
	}

	render() {
        const view =
                (this.props.source == null || this.props.source == undefined) ? null :
                    <Image
                        style={{
							width: this.state.widthStyle,
							height: this.state.heightStyle,
							aspectRatio: this.state.aspectRatio,
							alignSelf: 'center',
							}}
                        source={this.props.source}
                        resizeMode='contain'
                    />
		return (view)
	}
}