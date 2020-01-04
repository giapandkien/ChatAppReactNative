import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Avatar, Image} from 'react-native-elements';
import {View, Text, TouchableOpacity} from 'react-native';
import {screenHeight, screenWidth} from '../../src/utils/screenSize';

const styles = EStyleSheet.create({
  root: {
    height: screenHeight * 0.15,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    marginBottom: 5,
  },
  mess: {
    fontFamily: 'Roboto-Thin',
    fontSize: 11,
  },
  nameBox: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
  },
});

EStyleSheet.build({});

class ListChatEle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.root}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: data.img,
          }}
        />
        <View style={styles.nameBox}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.mess}>How are you ?</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ListChatEle;
