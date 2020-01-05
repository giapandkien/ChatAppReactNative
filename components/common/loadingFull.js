import React, {Component} from 'react';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Modal, ActivityIndicator} from 'react-native';

const styles = EStyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 9999,
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
    const {loadingFull} = this.props.common;
    return (
      <Modal transparent={true} animationType="fade" visible={loadingFull}>
        <View style={styles.root}>
          <ActivityIndicator size="large" animating={true} color="#6c5ce7" />
        </View>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {common} = state;
  return {common};
}

export default connect(mapStateToProps)(Loading);
