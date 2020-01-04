import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {updateInfoAction} from '../../../../src/actions/signIn.actions';

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '#FFF',
  },
  title: {
    fontFamily: 'Roboto-Bold',
  },
});

EStyleSheet.build({});

class Step1 extends Component {
  constructor(props) {
    super(props);
  }

  handleChangeDescription = e => {
    console.log(e);
    const {dispatch} = this.props;
    // dispatch(updateInfoAction());
  };

  render() {
    const {signIn} = this.props;
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Type something about you:</Text>
        <TextInput
          label="Description"
          onChangeText={this.handleChangeDescription}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {signIn} = state;
  return {signIn};
}

export default connect(mapStateToProps)(Step1);
