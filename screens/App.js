import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import LoginScreen from './auth/LoginScreen';

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
