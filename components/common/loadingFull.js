import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Modal, ActivityIndicator} from 'react-native';

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

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {visible} = this.props;
    return (
      <Modal transparent={true} animationType="fade" visible={visible}>
        <View style={styles.root}>
          <ActivityIndicator size="large" animating={true} color="#6c5ce7" />
        </View>
      </Modal>
    );
  }
}

export default Loading;
