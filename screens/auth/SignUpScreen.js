import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text, ScrollView, ToastAndroid, AsyncStorage} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {screenHeight, screenWidth} from '../../src/utils/screenSize';
import {setLoadingFull} from '../../src/actions/common.actions';
import {updateInfo} from '../../src/actions/createProfile.actions';
import {setAuth} from '../../src/actions/auth.actions';
import {
  userRef,
  countryRef,
  cityRef,
  authRef,
} from '../../src/connectFirebase/firebase.connections';

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

  getData = async () => {
    const {dispatch} = this.props;
    const {navigate} = this.props.navigation;
    try {
      dispatch(setLoadingFull());
      let responseCountry = [];
      let responseCity = [];
      let listCountry = [];
      await countryRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          responseCountry.push(doc.data());
        });
      });
      await cityRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          responseCity.push(doc.data());
        });
      });

      listCountry = responseCountry.map(i => {
        let cities = [];
        responseCity.forEach(ele => {
          if (ele.country === i.countryName) {
            cities.push(ele.cityName);
          }
        });
        return {
          ...i,
          cities,
        };
      });
      dispatch(updateInfo({value: listCountry, type: 'listCountry'}));
      dispatch(updateInfo({value: listCountry[0].cities, type: 'listCity'}));
      dispatch(
        updateInfo({
          value: listCountry[0].countryName,
          type: 'countrySelected',
        }),
      );
      dispatch(
        updateInfo({value: listCountry[0].cities[0], type: 'citySelected'}),
      );
      dispatch(setLoadingFull());
      navigate('CreateProfile');
    } catch (error) {
      dispatch(setLoadingFull());
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
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

  handleSignUp = async () => {
    const {username, email, password, reenterPassword} = this.state;
    const {dispatch} = this.props;
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      reenterPassword === ''
    ) {
      ToastAndroid.show('Fill all text field', ToastAndroid.SHORT);
    } else {
      if (password.length >= 6) {
        if (password === reenterPassword) {
          try {
            dispatch(setLoadingFull());
            await authRef.createUserWithEmailAndPassword(email, password);
            this._storeData(email, password);
            const user = authRef.currentUser;
            await userRef
              .doc(user.uid)
              .set({
                username: username,
              })
              .then(() => {
                dispatch(
                  setAuth({
                    uid: user.uid,
                    email: email,
                  }),
                );
                dispatch(setLoadingFull());
                ToastAndroid.show('Create successfull', ToastAndroid.SHORT);
                this.getData();
              });
          } catch (error) {
            dispatch(setLoadingFull());
            console.log(error);
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show('Password does not match', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          'Password must be longer or equal to 6 characters',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  render() {
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
                placeholder="Type more than 6 character"
                secureTextEntry={true}
                onChangeText={this.handleChangePassword}
              />
              <TextInput
                style={styles.textField}
                value={reenterPassword}
                mode="outlined"
                label="Re-enter password"
                placeholder="Type more than 6 character"
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
  const {createProfile} = state;
  return {
    createProfile,
  };
}

export default connect(mapStateToProps)(SignUpScreen);
