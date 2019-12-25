import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text} from 'react-native';

const styles = EStyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fff',
  },
  background: {
    backgroundColor: '#6c5ce7',
    width: '100%',
    height: '60%',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  element: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  loginForm: {
    backgroundColor: '#fff',
    width: '70%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 15,
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#636e72',
  },
});

EStyleSheet.build({});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.background} />
        <View style={styles.element}>
          <View style={styles.loginForm}>
            <Text style={styles.text}>Login</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
