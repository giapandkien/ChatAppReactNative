import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, ToastAndroid, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {userRef, authRef} from '../../src/connectFirebase/firebase.connections';
import {setAuth} from '../../src/actions/auth.actions';
import {setDefault} from '../../src/actions/createProfile.actions';
import {setLoadingFull} from '../../src/actions/common.actions';
import {screenHeight} from '../../src/utils/screenSize';
import LoadingWithoutModal from '../../components/common/loadingWithoutModal';

const styles = EStyleSheet.create({
  root: {flex: 1, position: 'relative', alignItems: 'center'},
  nameBox: {
    position: 'absolute',
    top: 0.54 * screenHeight,
    width: '80%',
    height: 0.15 * screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 3,
    borderRadius: 5,
    elevation: 5,
  },
  age: {
    fontFamily: 'Roboto-Medium',
  },
  name: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    color: '#2d3436',
  },
  description: {fontFamily: 'Roboto-Light', color: '#2d3436', fontSize: 15},
  img: {
    width: '100%',
    height: 0.61 * screenHeight,
    marginBottom: 0.1 * screenHeight,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  icon: {marginRight: 10},
  inforBox: {
    width: '80%',
    elevation: 5,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  inforRow: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
});

EStyleSheet.build({});

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: null,
      city: null,
      country: null,
      description: null,
      img: null,
      sex: null,
      username: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const {uid} = this.props.auth;
    try {
      await userRef
        .doc(uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.setState({
              age: doc.data().age,
              city: doc.data().city,
              sex: doc.data().sex,
              country: doc.data().country,
              description: doc.data().description,
              img: doc.data().img,
              username: doc.data().username,
            });
          }
        });
      this.setState({
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

  logOut = async () => {
    const {dispatch} = this.props;
    const {navigate} = this.props.navigation;
    try {
      dispatch(setLoadingFull());
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      dispatch(
        setAuth({
          uid: '',
          email: '',
        }),
      );
      dispatch(setDefault());
      await authRef.signOut();
      navigate('AuthNavigator');
      dispatch(setLoadingFull());
    } catch (error) {
      dispatch(setLoadingFull());
      console.log(error);
    }
  };

  render() {
    const {
      img,
      username,
      description,
      age,
      city,
      country,
      sex,
      isLoading,
    } = this.state;
    return isLoading ? (
      <LoadingWithoutModal />
    ) : (
      <View style={styles.root}>
        {img !== undefined && <Image style={styles.img} source={{uri: img}} />}
        <View style={styles.nameBox}>
          <View style={styles.nameRow}>
            {sex === 'female' ? (
              <Icon
                name="venus"
                type="font-awesome"
                size={20}
                color="#ff7675"
                containerStyle={styles.icon}
              />
            ) : (
              <Icon
                name="mars"
                type="font-awesome"
                size={20}
                color="#0984e3"
                containerStyle={styles.icon}
              />
            )}
            {username !== undefined && (
              <Text style={styles.name}>{username}</Text>
            )}
          </View>
          {age !== undefined && (
            <Text style={styles.age}>{' (' + age + ' years old)'}</Text>
          )}
          <Text style={styles.description}>
            {description !== undefined && description}
          </Text>
        </View>
        <View style={styles.inforBox}>
          <View style={styles.inforRow}>
            <Icon
              name="map-marker"
              type="font-awesome"
              size={20}
              color="#e74c3c"
              containerStyle={styles.icon}
            />
            {city !== undefined && country !== undefined && (
              <Text style={styles.description}>{city + ', ' + country}</Text>
            )}
          </View>
        </View>
        <Button onPress={this.logOut} mode="text" color="#6c5ce7">
          Sign out
        </Button>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(ProfileScreen);
