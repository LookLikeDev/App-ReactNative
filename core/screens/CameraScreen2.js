import React from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';

const CIRCLE_SIZE = 80;

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
});

export default class PanResponderExample extends React.Component {
  constructor(props) {
    super(props);

    this.displayName = 'PanResponderExample';
    this.statics = {
      title: 'PanResponder Sample',
      description:
        'Shows the use of PanResponder to provide basic gesture handling.',
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
    this.previousLeft = 20;
    this.previousTop = 84;
    this.circleStyles = {
      style: {
        left: this.previousLeft,
        top: this.previousTop,
        backgroundColor: 'green',
      },
    };
    this.circleRef = null;
  }

  componentDidMount() {
    this.updateNativeStyles();
  }

  highlight = () => {
    this.circleStyles.style.backgroundColor = 'blue';
    this.updateNativeStyles();
  };

  unHighlight = () => {
    this.circleStyles.style.backgroundColor = 'green';
    this.updateNativeStyles();
  };

  updateNativeStyles = () => {
    this.circleRef && this.circleRef.setNativeProps(this.circleStyles);
  };

  handleStartShouldSetPanResponder = (e, gestureState) => true;

  handleMoveShouldSetPanResponder = (e, gestureState) => true;

  handlePanResponderGrant = (e, gestureState) => {
    this.highlight();
  };

  handlePanResponderMove = (e, gestureState) => {
    this.circleStyles.style.left = this.previousLeft + gestureState.dx;
    this.circleStyles.style.top = this.previousTop + gestureState.dy;
    this.updateNativeStyles();
  };

  handlePanResponderEnd = (e, gestureState) => {
    this.unHighlight();
    this.previousLeft += gestureState.dx;
    this.previousTop += gestureState.dy;
  };

  render() {
    return (
      <View
        ref={(circle) => {
          this.circleRef = circle;
        }}
        style={styles.circle}
        {...this.panResponder.panHandlers}
      />
    );
  }
}
