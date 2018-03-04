/*
	BLoadingCircle.js
	BettermentLabs

	Created by Charles Major on 1/12/18. 
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

Component BLoadingCircle.js
  Description:  loading/progress circle
*/

import React from 'react';
import {Animated, View} from 'react-native';

import Svg, { Path, Rect } from 'react-native-svg';

let AnimatedCircle = Animated.createAnimatedComponent(Path);

const timer = require('react-native-timer');

let msPerFrameDefault = 25;
let circleSegments = 60;
let anglePerFrame = 360/(circleSegments);

const defaultCircStrokeWidth = 15;

export default class BLoadingCircle extends React.Component {
    state = {
        msPerFrame: msPerFrameDefault,
        layouts: {
	        width: 100,
	        height: 100,
	        circDia: 100
		},
        circleAngle: 0,
        circStrokeWidth: defaultCircStrokeWidth,
        circMargin: 5,
        circBoxViewBox: "-60 -60 120 120",
    }

    componentDidMount() {
        this.setState({
            msPerFrame: (this.props.fullCircuitTime ? (this.props.fullCircuitTime/circleSegments) : msPerFrameDefault),
            circStrokeWidth: (this.props.circStrokeWidth || defaultCircStrokeWidth)
        }, this.startProgressCircle())
    }

    componentWillUnmount() {
        this.resetProgressCircle();
    }

    setLayoutState = (event) => {
		const width = event.nativeEvent.layout.width;
		const height = event.nativeEvent.layout.height;

		var newState = this.state;

		newState.layouts.width = width;
		newState.layouts.height = height;

		newState.layouts.circDia = Math.min(width, height);

		const circBoxSide = newState.layouts.circDia + this.state.circStrokeWidth + this.state.circMargin;

		newState.circBoxViewBox = -circBoxSide/2 + ' ' + -circBoxSide/2 + ' ' + circBoxSide + ' ' + circBoxSide;
		this.setState({
			newState
		})
	}

    polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        };
      }
  
      myCircleSegment = (x, y, radius, startAngle, endAngle) => {
          let start = this.polarToCartesian(x, y, radius, endAngle);
          let end = this.polarToCartesian(x, y, radius, startAngle);
  
          if ((endAngle - startAngle) > 180) {
              console.log("past 180");
              let endFirstSeg = this.polarToCartesian(x, y, radius, (startAngle+180));
  
              let line = [
                  "M", start.x, start.y, 
                  "A", radius, radius, 0, 0, 0, endFirstSeg.x, endFirstSeg.y,
                  "A", radius, radius, 0, 0, 0, end.x, end.y
                  ].join(" ");
  
              return(line);
          } else {
              let line = [
                  "M", start.x, start.y, 
                  "A", radius, radius, 0, 0, 0, end.x, end.y
              ].join(" ");
              return(line);       
          }
      }
  
      myCircleSegmentOldAndWorking = (x, y, radius, startAngle, endAngle) => {
          var start = this.polarToCartesian(x, y, radius, endAngle);
          var end = this.polarToCartesian(x, y, radius, startAngle);
  
          var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
          var d = [
              "M", start.x, start.y, 
              "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
          ].join(" ");
          return d;       
      }
  
      getMyCurrentCircle = (currentAngle) => {
          return this.myCircleSegment(0,0, this.state.layouts.circDia/2, 180, 180+currentAngle)
      }
  
      advanceProgressCircle = () => {
          var newState = this.state;
          if (newState.circleAngle > (360-anglePerFrame)) {
              newState.circleAngle = 0;
            //   this.resetProgressCircle();
              (this.props.progressCircleMadeFullLoop && this.props.progressCircleMadeFullLoop())
            //   this.buttonPressedLong();
          } else {
              if (this.props.isAnimating) {
                newState.circleAngle = newState.circleAngle + anglePerFrame;
                }
              this.setState({
                  newState
              })
          }
      }
  
      resetProgressCircle = () => {
          var newState = this.state;
          newState.circleAngle = 0;
          newState.progressCircleInProgress = false;
          this.setState({
              newState
          })
          timer.clearInterval(this, 'progressCircleAnimationTimer');
          timer.clearTimeout(this, 'progressCircleStopTimer');
      }
  
      startProgressCircle = () => {
          this.setState({
              progressCircleInProgress: true
              }, () => {
                  timer.setInterval(this, 'progressCircleAnimationTimer', this.advanceProgressCircle, this.state.msPerFrame);
                  // timer.setTimeout(this, 'progressCircleStopTimer', this.resetProgressCircle, sendLockDownMessageTimer);
              })
      }
  
    render() {
        return(
            <View
                style={{
                    width:'100%',
                    height:'100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onLayout={(event) => {this.setLayoutState(event)}}
            >
        { (this.state.circleAngle != 0) && 
            <Svg
                pointerEvents="none"
                height={this.state.layouts.circDia}
                width={this.state.layouts.circDia}
                viewBox={this.state.circBoxViewBox}
              >
              <AnimatedCircle
                ref={ ref => this._myCircle = ref }
                d={this.getMyCurrentCircle(this.state.circleAngle)}
                stroke="#FCD50B"
                strokeWidth={this.state.circStrokeWidth}
                fill="none" 
                strokeLinecap="round"
                />
            </Svg>
        }
        </View>
        )
    }
}