import React from 'react';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Modal, ActivityIndicator} from 'react-native';

const styles = EStyleSheet.create({
  modalBackground: {
    flex: 1,
    position: 'absolute',
    zIndex: 9998,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

EStyleSheet.build({});

class LoadingDialog extends React.Component {
  render() {
    const {loadingDialog} = this.props.common;
    return (
      <Modal transparent={true} animationType="slide" visible={loadingDialog}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={true} color="#6c5ce7" size="large" />
          </View>
        </View>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {common} = state;
  return {common};
}

export default connect(mapStateToProps)(LoadingDialog);
