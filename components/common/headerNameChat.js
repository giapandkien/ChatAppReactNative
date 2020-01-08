import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Roboto-Black',
    marginLeft: 10,
    fontSize: 17,
  },
});

EStyleSheet.build({});

class HeaderNameChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {img, name} = this.props;
    return (
      <View style={styles.root}>
        <Avatar
          rounded
          size="small"
          source={{
            uri: img,
          }}
        />
        <Text style={styles.headerText}>{name}</Text>
      </View>
    );
  }
}

export default HeaderNameChat;
