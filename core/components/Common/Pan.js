import React from 'react';
import PropTypes from 'prop-types';
import { PanResponder, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default class PanResponderExample extends React.Component {
  static propTypes = {
    onDragBegin: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    initialCoordinates: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
    this.previousLeft = props.initialCoordinates.x || 0;
    this.previousTop = props.initialCoordinates.y || 0;

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
    const { onDragBegin } = this.props;

    if (onDragBegin) {
      onDragBegin();
    }

    this.circleStyles.style.backgroundColor = 'blue';
    this.updateNativeStyles();
  };

  unHighlight = () => {
    const { onDragEnd } = this.props;

    this.circleStyles.style.backgroundColor = 'green';
    this.updateNativeStyles();

    if (onDragEnd) {
      onDragEnd();
    }
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
    const { children } = this.props;

    return (
      <View
        ref={(circle) => { this.circleRef = circle; }}
        style={[styles.circle]}
        {...this.panResponder.panHandlers}
      >
        {children}
      </View>
    );
  }
}
