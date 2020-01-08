import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './auth/LoginScreen';
import SignUpScreen from './auth/SignUpScreen';
import Step1SignUp from './auth/createProfile/Steps/Step1';
import Step2SignUp from './auth/createProfile/Steps/Step2';
import Step3SignUp from './auth/createProfile/Steps/Step3';
import ListFriend from './chat/ListFriend';
import ChatScreen from './chat/ChatScreen';
import FindFriend from './findFriend/FindFriend';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import ProfileScreen from './profile/ProfileScreen';
import InvitationScreen from './invitation/InvitationScreen';
import LoadingFull from '../components/common/loadingFull';
import LoadingDialog from '../components/common/loadingDialog';
import StatusScreen from '../screens/status/StatusScreen';
import HeaderNameChat from '../components/common/headerNameChat';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger', 'Setting a timer']);

const CreateProfileNavigationOptions = {
  headerTitle: 'Create your profile:',
  headerStyle: {
    elevation: 0,
  },
  headerTitleStyle: {
    fontFamily: 'Roboto-Bold',
  },
};

const CreateProfileNavigator = createStackNavigator(
  {
    Step1: {
      screen: Step1SignUp,
      navigationOptions: ({navigation}) => {
        return CreateProfileNavigationOptions;
      },
    },
    Step2: {
      screen: Step2SignUp,
      navigationOptions: ({navigation}) => {
        return CreateProfileNavigationOptions;
      },
    },
    Step3: {
      screen: Step3SignUp,
      navigationOptions: ({navigation}) => {
        return CreateProfileNavigationOptions;
      },
    },
  },
  {initialRouteName: 'Step1'},
);

const AuthNavigator = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
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
    ListChatRoom: {
      screen: ListFriend,
      navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({tintColor}) => (
          <Icon name="comments" size={20} color={tintColor} />
        ),
      },
    },
    Status: {
      screen: StatusScreen,
      navigationOptions: {
        tabBarLabel: 'Status',
        tabBarIcon: ({tintColor}) => (
          <Icon name="newspaper" size={20} color={tintColor} />
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
    initialRouteName: 'ListChatRoom',
    activeColor: '#6c5ce7',
    shifting: true,
    barStyle: {
      backgroundColor: '#FFFFFF',
    },
  },
);

const MainScreenToChilsStackNavigator = createStackNavigator({
  MainTapBottomNavigator: {
    screen: MainTapBottomNavigator,
    navigationOptions: ({navigation}) => {
      return {
        header: null,
      };
    },
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <HeaderNameChat
            name={navigation.getParam('name')}
            img={navigation.getParam('img')}
          />
        ),
        headerStyle: {
          elevation: 0,
        },
      };
    },
  },
});

const AppNavigator = createSwitchNavigator(
  {
    AuthNavigator: {screen: AuthNavigator},
    CreateProfile: {screen: CreateProfileNavigator},
    MainScreenToChilsStackNavigator: {screen: MainScreenToChilsStackNavigator},
  },
  {
    initialRouteName: 'AuthNavigator',
  },
);

const Navigation = createAppContainer(AppNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {common} = this.props;
    return (
      <View style={{flex: 1}}>
        <LoadingFull visible={common.loadingFull} />
        <LoadingDialog visible={common.loadingDialog} />
        <Navigation theme="light" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {common} = state;
  return {common};
}

export default connect(mapStateToProps)(App);
