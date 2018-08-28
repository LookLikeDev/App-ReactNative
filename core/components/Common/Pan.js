import React from 'react';
import PropTypes from 'prop-types';
import {
  PanResponder, StyleSheet, View, Dimensions, Text,
} from 'react-native';

const dimensions = Dimensions.get('window');
const wrapHeight = Math.round((dimensions.width * 4) / 3);
const wrapWidth = dimensions.width;

const styles = StyleSheet.create({
  pan: {
    position: 'absolute',
    zIndex: 4,
  },
  LTR: {
    marginLeft: -18,
    marginTop: -18,
    left: 0,
    top: 0,
  },
  RTL: {
    marginRight: -18,
    marginTop: -18,
    right: 0,
    top: 0,
  },
});

export default class PanResponderExample extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    updateThing: PropTypes.func.isRequired,
    onDragBegin: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    initialCoordinates: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    renderRTL: PropTypes.bool,
  };

  static defaultProps = {
    renderRTL: false,
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

    this.circleRef = null;

    this.previousLeft = props.initialCoordinates.x;
    this.previousTop = props.initialCoordinates.y;

    if (props.renderRTL) {
      this.circleStyles = {
        style: {
          right: (wrapWidth - this.previousLeft),
          top: this.previousTop,
        },
      };
    } else {
      this.circleStyles = {
        style: {
          left: this.previousLeft,
          top: this.previousTop,
        },
      };
    }
  }

  componentDidMount() {
    this.updateNativeStyles();
  }

  updateNativeStyles = () => {
    this.circleRef && this.circleRef.setNativeProps(this.circleStyles);
  };

  handleStartShouldSetPanResponder = (e, gestureState) => true;

  handleMoveShouldSetPanResponder = (e, gestureState) => true;

  // DRAG START
  handlePanResponderGrant = (e, gestureState) => {
    const { onDragBegin } = this.props;

    if (onDragBegin) {
      onDragBegin();
    }

    this.updateNativeStyles();
  };

  handlePanResponderMove = (e, gestureState) => {
    const { renderRTL } = this.props;

    if (renderRTL) {
      this.circleStyles.style.right = (wrapWidth - (this.previousLeft + gestureState.dx));
      this.circleStyles.style.top = this.previousTop + gestureState.dy;
    } else {
      this.circleStyles.style.left = this.previousLeft + gestureState.dx;
      this.circleStyles.style.top = this.previousTop + gestureState.dy;
    }

    this.updateNativeStyles();
  };

  // DRAG END
  handlePanResponderEnd = (e, gestureState) => {
    const { onDragEnd, updateThing, id } = this.props;

    this.updateNativeStyles();
    this.previousLeft += gestureState.dx;
    this.previousTop += gestureState.dy;

    if (onDragEnd) {
      const x = Math.round(this.previousLeft / (wrapWidth / 100));
      const y = Math.round(this.previousTop / (wrapHeight / 100));

      onDragEnd();
      updateThing(id, { x, y });
    }
  };

  render() {
    const { children } = this.props;

    return (
      <View
        ref={(circle) => { this.circleRef = circle; }}
        {...this.panResponder.panHandlers}
        style={[styles.pan, this.previousLeft < (wrapWidth / 2) ? styles.LTR : styles.RTL]}
      >
        {children}
      </View>
    );
  }
}
