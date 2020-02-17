import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {screenHeight, screenWidth} from '../../src/utils/screenSize';
import {setLoadingFull} from '../../src/actions/common.actions';
import {setAuth} from '../../src/actions/auth.actions';
import {authRef} from '../../src/connectFirebase/firebase.connections';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    width: screenWidth,
    height: screenHeight - 25,
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
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 15,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 30,
    marginBottom: 15,
  },
  textField: {
    fontFamily: 'Roboto-Light',
    width: '90%',
    backgroundColor: '#fff',
    color: '#636e72',
  },
  btnBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {marginTop: 7},
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

  async componentDidMount() {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      if (email !== null && password !== null) {
        this.login(email, password);
      }
    } catch (error) {
      console.log(error);
    }
  }

  loadData = uid => {
    const {dispatch} = this.props;
    try {
      dispatch(setLoadingFull());
      dispatch(setLoadingFull());
    } catch (error) {
      dispatch(setLoadingFull());
      console.log(error);
    }
  };

  _storeData = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.log(error);
    }
  };

  login = async (email, password) => {
    const {dispatch} = this.props;
    const {navigate} = this.props.navigation;
    try {
      dispatch(setLoadingFull());
      await authRef
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          this._storeData(email, password);
          dispatch(
            setAuth({
              uid: response.user.uid,
              email: response.user.email,
            }),
          );
          ToastAndroid.show('Login succesful!', ToastAndroid.SHORT);
          dispatch(setLoadingFull());
          navigate('MainTapBottomNavigator');
        });
    } catch (error) {
      dispatch(setLoadingFull());
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
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
              <View style={styles.btnBox}>
                <Button
                  mode="contained"
                  color="#6c5ce7"
                  style={styles.btn}
                  onPress={() => this.login(email, password)}>
                  Login
                </Button>
                <Button
                  style={styles.btn}
                  mode="text"
                  color="#6c5ce7"
                  onPress={this.signUp}>
                  Sign Up
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect()(LoginScreen);
