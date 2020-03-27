import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import ProgressBar from './src/components/ProgressBar';


const Progressable = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeout = useRef();
  let prog = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(
        prog.current.toFixed(1));
    }, 1500);
    timeout.current = id;
    return () => {
      clearInterval(timeout.current);
    };
  });

  useEffect(() => {
    prog.current = prog.current + 0.1;
    if (progress > 1) {
      clearInterval(timeout.current);
    }
  }, [progress])
  return (
    <View style={styles.container}>
      {visible && (
        <ProgressBar
          progress={progress}
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
Progressable.navigationOptions = {
  title: 'ProgressBar Example',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderRadius: 50,
  },
});
export default Progressable
