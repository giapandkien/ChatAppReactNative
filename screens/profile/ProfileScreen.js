import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import firebaseApp from '../../src/connectFirebase/firebase.config';

const styles = EStyleSheet.create({});

EStyleSheet.build({});

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logOut = () => {
    const {navigate} = this.props.navigation;
    firebaseApp
      .auth()
      .signOut()
      .then(() => navigate('AuthNavigator'))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <View>
        <Button onPress={this.logOut} type="outline" title=" Sign out" />

        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default ProfileScreen;
