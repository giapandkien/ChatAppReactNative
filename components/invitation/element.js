import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

const styles = EStyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    marginBottom: 5,
  },
  nameBox: {
    flex: 1,
    paddingLeft: 20,
  },
  addIconBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  age: {fontFamily: 'Roboto-Thin'},
});

EStyleSheet.build({});

class InvitationEle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {invitator, acceptFriend} = this.props;
    return invitator.data !== undefined ? (
      <View style={styles.root}>
        <View style={styles.avatarBox}>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: invitator.data.img,
            }}
          />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.name}>{invitator.data.username}</Text>
          <Text style={styles.age}>{invitator.data.age + ' years old'}</Text>
        </View>
        <View style={styles.addIconBox}>
          <Icon
            onPress={() => acceptFriend(invitator.id)}
            name="user-plus"
            type="font-awesome"
            color="#6c5ce7"
          />
        </View>
      </View>
    ) : (
      <View style={styles.root} />
    );
  }
}

export default InvitationEle;
