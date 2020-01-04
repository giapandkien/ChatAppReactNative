import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './auth/LoginScreen';
import SignUpScreen from './auth/SignUpScreen';
import Step1SignUp from './auth/signUp/Steps/Step1';
import Step2SignUp from './auth/signUp/Steps/Step2';
import Step3SignUp from './auth/signUp/Steps/Step3';
import ListFriend from './main/ListFriend';
import ChatScreen from './main/ChatScreen';
import FindFriend from './main/FindFriend';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ProfileScreen from './profile/ProfileScreen';
import InvitationScreen from './main/InvitationScreen';

const CreateProfileNavigator = createStackNavigator(
  {
    Step1: {screen: Step1SignUp},
    Step2: {screen: Step2SignUp},
    Step3: {screen: Step3SignUp},
  },
  {},
);

const AuthNavigator = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
    CreateProfile: {screen: CreateProfileNavigator},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const ChatNavigator = createStackNavigator(
  {
    ListFriend: {
      screen: ListFriend,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'List Friend',
          headerStyle: {
            elevation: 0,
          },
        };
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'List Friend',
          headerStyle: {
            elevation: 0,
          },
        };
      },
    },
  },
  {},
);

const MainTapBottomNavigator = createMaterialBottomTabNavigator(
  {
    FindFriend: {
      screen: FindFriend,
      navigationOptions: {
        tabBarLabel: 'Explore',
        tabBarIcon: ({tintColor}) => (
          <Icon name="search" size={20} color={tintColor} />
        ),
      },
    },
    ChatNavigator: {
      screen: ChatNavigator,
      navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({tintColor}) => (
          <Icon name="comments" size={20} color={tintColor} />
        ),
      },
    },
    InvitationScreen: {
      screen: InvitationScreen,
      navigationOptions: {
        tabBarLabel: 'Invitation',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user-plus" size={20} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user-circle" size={20} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'ChatNavigator',
    activeColor: '#6c5ce7',
    shifting: true,
    barStyle: {
      backgroundColor: '#FFFFFF',
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    AuthNavigator: {screen: AuthNavigator},
    MainTapBottomNavigator: {screen: MainTapBottomNavigator},
  },
  {
    initialRouteName: 'AuthNavigator',
    headerMode: 'none',
  },
);

const Navigation = createAppContainer(AppNavigator);
const App = () => <Navigation theme="light" />;

export default App;
