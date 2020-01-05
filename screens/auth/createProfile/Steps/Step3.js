import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text, ToastAndroid, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {setLoadingFull} from '../../../../src/actions/common.actions';
import {updateInfo} from '../../../../src/actions/createProfile.actions';
import ImagePicker from 'react-native-image-picker';
import {screenHeight, screenWidth} from '../../../../src/utils/screenSize';
import {
  userRef,
  storageRef,
} from '../../../../src/connectFirebase/firebase.connections';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 10,
  },
  chooseSex: {flex: 1, padding: 10},
  img: {
    width: 0.8 * screenWidth,
    height: 0.5 * screenHeight,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto-Light',
    color: '#2d3436',
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFF',
    width: '100%',
  },
  btn: {
    fontFamily: 'Roboto-Light',
    marginLeft: 5,
    marginRight: 5,
  },
  btnBox: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#2d3436',
    fontFamily: 'Roboto-Light',
  },
  chooseCountry: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

EStyleSheet.build({});

class Step3 extends Component {
  constructor(props) {
    super(props);
  }

  chooseFromDevice = async () => {
    const options = {noData: true};
    const {dispatch} = this.props;
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        dispatch(updateInfo({value: response, type: 'img'}));
      }
    });
  };

  openCamera = () => {
    const options = {noData: true};
    const {dispatch} = this.props;
    ImagePicker.launchCamera(options, response => {
      if (response.uri) {
        dispatch(updateInfo({value: response, type: 'img'}));
      }
    });
  };

  finish = async () => {
    const {dispatch} = this.props;
    const {navigate} = this.props.navigation;
    const {uid} = this.props.auth;
    const {
      img,
      countrySelected,
      citySelected,
      sex,
      age,
      description,
    } = this.props.createProfile;
    try {
      dispatch(setLoadingFull());
      let imgDownloadURL = '';
      const response = await fetch(img.uri);
      const blob = await response.blob();
      const imageName = new Date().getTime();
      await storageRef.child('user-image/' + imageName).put(blob);
      await storageRef
        .child('user-image/' + imageName)
        .getDownloadURL()
        .then(url => (imgDownloadURL = url));
      const data = {
        country: countrySelected,
        city: citySelected,
        age: age,
        img: imgDownloadURL,
        sex: sex,
        description: description,
      };
      await userRef.doc(uid).set(data, {merge: true});
      navigate('MainTapBottomNavigator');
      dispatch(setLoadingFull());
    } catch (error) {
      dispatch(setLoadingFull());
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  render() {
    const {img} = this.props.createProfile;
    return (
      <View style={styles.root}>
        <View style={styles.chooseSex}>
          <Text style={styles.title}>Choose your image:</Text>
          <View style={styles.imageView}>
            {img !== '' && <Image style={styles.img} source={{uri: img.uri}} />}
          </View>
        </View>
        <View style={styles.chooseCountry}>
          <Button
            mode="contained"
            color="#6c5ce7"
            style={styles.btn}
            onPress={this.chooseFromDevice}>
            From your device
          </Button>
          <Button
            mode="contained"
            color="#6c5ce7"
            style={styles.btn}
            onPress={this.openCamera}>
            Open camera
          </Button>
        </View>
        <View style={styles.btnBox}>
          {img !== '' && (
            <Button
              mode="contained"
              color="#6c5ce7"
              style={styles.btn}
              onPress={this.finish}>
              Finish
            </Button>
          )}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {createProfile, auth} = state;
  return {createProfile, auth};
}

export default connect(mapStateToProps)(Step3);
