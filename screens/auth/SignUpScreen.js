import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text, ScrollView, Dimensions, ToastAndroid} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import firebaseApp from '../../src/connectFirebase/firebase.config';
import {connect} from 'react-redux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const userRef = firebaseApp.firestore().collection('users');

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    position: 'relative',
    backgroundColor: '#fff',
  },
  background: {
    backgroundColor: '#6c5ce7',
    width: screenWidth,
    height: screenHeight * 0.6,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  element: {
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  loginForm: {
    backgroundColor: '#fff',
    width: '80%',
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 15,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 20,
  },
  textField: {
    fontFamily: 'Roboto-Light',
    width: '90%',
    backgroundColor: '#fff',
    color: '#636e72',
  },
});

EStyleSheet.build({});

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      reenterPassword: '',
    };
  }

  handleChangeUsername = e => {
    this.setState({
      username: e,
    });
  };

  handleChangeEmail = e => {
    this.setState({
      email: e,
    });
  };

  handleChangePassword = e => {
    this.setState({
      password: e,
    });
  };

  handleChangeReenterPassword = e => {
    this.setState({
      reenterPassword: e,
    });
  };

  handleSignUp = async () => {
    const {username, email, password, reenterPassword} = this.state;
    const {navigate} = this.props.navigation;
    if (password === reenterPassword) {
      try {
        await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            userRef
              .add({
                username: username,
                email: email,
              })
              .then(() => {
                ToastAndroid.show('Create successfull', ToastAndroid.SHORT);
                navigate('Step1');
              });
          });
      } catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Password does not match', ToastAndroid.SHORT);
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    console.log(this.props);
    const {username, email, password, reenterPassword} = this.state;
    return (
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.background} />
          <View style={styles.element}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.loginForm}>
              <TextInput
                style={styles.textField}
                value={username}
                mode="outlined"
                label="Username"
                onChangeText={this.handleChangeUsername}
              />
              <TextInput
                style={styles.textField}
                value={email}
                mode="outlined"
                label="Email"
                onChangeText={this.handleChangeEmail}
              />
              <TextInput
                style={styles.textField}
                value={password}
                mode="outlined"
                label="Password"
                secureTextEntry={true}
                onChangeText={this.handleChangePassword}
              />
              <TextInput
                style={styles.textField}
                value={reenterPassword}
                mode="outlined"
                label="Re-enter password"
                secureTextEntry={true}
                onChangeText={this.handleChangeReenterPassword}
              />
              <Button
                mode="contained"
                color="#6c5ce7"
                onPress={this.handleSignUp}>
                Sign Up
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const {signIn} = state;
  return {signIn};
}

export default connect(mapStateToProps)(SignUpScreen);
