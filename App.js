import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import ProgressBar from './src/components/ProgressBar';

export default class Progressable extends Component {
  static navigationOptions = {
    title: 'ProgressBar Example',
  };
  state = {
    progress: 0,
    visible: true,
  };

  componentDidMount() {
    let progress = 0;
    this.timeout = setInterval(() => {
      this.setState(
        {
          progress: progress.toFixed(1),
        },
        () => {
          progress = progress + 0.1;
          //progress = progress;

          if (progress > 1) {
            clearInterval(this.timeout);
          }
        },
      );
    }, 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.visible && (
          <ProgressBar
            progress={this.state.progress}
            style={{
              margin: 20,
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 50,
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderRadius: 50,
  },
});
