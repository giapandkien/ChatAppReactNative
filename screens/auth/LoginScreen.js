import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import firebaseApp from '../../src/connectFirebase/firebase.config';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(
        user ? 'MainTapBottomNavigator' : 'AuthNavigator',
      );
    });
  }

  login = () => {
    const {email, password} = this.state;
    const {navigate} = this.props.navigation;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate('ListFriend'))
      .catch(error => console.log(error));
  };

  signUp = () => {
    const {navigate} = this.props.navigation;
    navigate('SignUp');
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

  render() {
    const {email, password} = this.state;
    return (
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.background} />
          <View style={styles.element}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.loginForm}>
              <TextInput
                style={styles.textField}
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={this.handleChangeEmail}
              />
              <TextInput
                style={styles.textField}
                mode="outlined"
                label="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={this.handleChangePassword}
              />
              <Button mode="contained" color="#6c5ce7" onPress={this.login}>
                Login
              </Button>
              <Button mode="contained" color="#6c5ce7" onPress={this.signUp}>
                Sign Up
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default LoginScreen;
