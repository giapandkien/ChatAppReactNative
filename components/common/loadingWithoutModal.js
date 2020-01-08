import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, ActivityIndicator} from 'react-native';

const styles = EStyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'none',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

EStyleSheet.build({});

class LoadingWithoutModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" animating={true} color="#6c5ce7" />
      </View>
    );
  }
}

export default LoadingWithoutModal;
