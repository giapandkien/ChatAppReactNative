import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {} from 'react-native/Libraries/NewAppScreen';

import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <LoginScreen />
      </SafeAreaView>
    </>
  );
};

export default App;
