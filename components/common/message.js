import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text} from 'react-native';

const styles = EStyleSheet.create({
  messRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  mess: {padding: 10, borderRadius: 20},
  myMessRow: {justifyContent: 'flex-end'},
  myMess: {backgroundColor: '#6c5ce7', color: '#fff'},
  yourMess: {backgroundColor: '#dfe6e9'},
});

EStyleSheet.build({});

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {message, isMine} = this.props;
    return (
      <View style={[styles.messRow, isMine && styles.myMessRow]}>
        <Text style={[styles.mess, isMine ? styles.myMess : styles.yourMess]}>
          {message}
        </Text>
      </View>
    );
  }
}

export default Message;
