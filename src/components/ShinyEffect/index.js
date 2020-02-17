import React from 'react';
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
  constructor(props) {
    super(props);

    this.range = new Value(0);
    //  this.transX = new Animated.Value(0);
    this.transX = runTranslationTiming(
      new Clock(),
      new Value(0),
      new Value(5000),
    );
  }

  componentDidMount() {
    this.range = interpolate(this.transX, {
      inputRange: [0, 5000],
      outputRange: [0, this.props.progress * this.props.width],
    });
  }
  componentDidUpdate() {
    this.range = interpolate(this.transX, {
      inputRange: [0, 5000],
      outputRange: [0, this.props.progress * this.props.width],
    });
  }

  render() {
    return (
      <>
        <Animated.View
          style={{
            height: 50,
            borderRadius: 50,
            position: 'absolute',
            bottom: 0,
            right: 10,
            left: 10,
            marginRight: 10,
            transform: [{translateX: this.range}, {skewX: '20deg'}],
          }}>
          <LinearGradient
            style={{
              width: 50,
              borderRadius: 50,
              height: 50,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#ffffff8f', '#ffffff8f']}></LinearGradient>
        </Animated.View>

        <Animated.View
          style={{
            height: 50,
            borderRadius: 50,
            position: 'absolute',
            bottom: 0,
            right: 60,
            left: 60,
            transform: [{translateX: this.range}, {skewX: '20deg'}],
          }}>
          <LinearGradient
            style={{
              width: 50,
              borderRadius: 50,
              height: 50,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#ffffff8f', '#ffffff8f']}></LinearGradient>
        </Animated.View>
        <Animated.View
          style={{
            height: 50,
            borderRadius: 50,
            position: 'absolute',
            bottom: 0,
            right: 110,
            left: 110,
            transform: [{translateX: this.range}, {skewX: '20deg'}],
          }}>
          <LinearGradient
            style={{
              width: 50,
              borderRadius: 50,
              height: 50,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#ffffff8f', '#ffffff8f']}></LinearGradient>
        </Animated.View>
      </>
    );
  }
}
