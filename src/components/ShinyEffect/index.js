import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Animated, {Easing} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  concat,
  interpolate,
} = Animated;

function runTranslationTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.linear,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
    ]),
    state.position,
  ]);
}

export default class ShinyEffect extends React.Component {
  static defaultProps = {
    height: 4,
    bottomRowWidth: 0,
  };
  constructor(props) {
    super(props);
    this.progress = new Value(0);
    this.animation = new Value(0);
    this.range = new Value(0);
    //  this.transX = new Animated.Value(0);
    this.transX = runTranslationTiming(
      new Clock(),
      new Value(0),
      new Value(3600),
    );
  }

  componentDidMount() {
    this.range = interpolate(this.transX, {
      inputRange: [0, 3000],
      outputRange: [
        0,
        this.props.progress *
          (this.props.width - (this.props.progress * 100) / 2),
      ],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
  }
  componentDidUpdate() {
    this.range = interpolate(this.transX, {
      inputRange: [0, 3000],
      outputRange: [
        0,
        this.props.progress *
          (this.props.width - (this.props.progress * 100) / 2),
      ],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
  }

  render() {
    return (
      <Animated.View
        style={{
          height: 50,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          width: (this.props.progress * 100) / 2,
          transform: [{translateX: this.range}],
        }}>
        <LinearGradient
          style={{
            width: (this.props.progress * 100) / 2,
            height: 50,

            bottom: 0,
            right: 0,
            left: 0,
          }}
          useAngle={true}
          angle={45}
          angleCenter={{x: 0.5, y: 0.5}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[
            '#ffffff00',
            '#ffffff20',
            '#ffffffB3',
            '#ffffff26',
            '#ffffff00',
          ]}></LinearGradient>
      </Animated.View>
    );
  }
}
