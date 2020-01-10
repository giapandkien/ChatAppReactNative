import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Avatar} from 'react-native-elements';
import {View, Text, TouchableOpacity} from 'react-native';
import {screenHeight, screenWidth} from '../../src/utils/screenSize';
import {
  userRef,
  chatRoomRef,
} from '../../src/connectFirebase/firebase.connections';
import {connect} from 'react-redux';

const styles = EStyleSheet.create({
  root: {
    height: screenHeight * 0.15,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    marginBottom: 5,
  },
  mess: {
    fontFamily: 'Roboto-Thin',
    fontSize: 12,
  },
  nameBox: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    marginLeft: 5,
  },
});

EStyleSheet.build({});

class ListChatEle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      img: '',
      lastMess: '',
    };
  }

  async componentDidMount() {
    const {auth, roomID} = this.props;
    let friendID = '';
    let roomData = null;
    try {
      await this.getRoomData(roomID).then(doc => {
        roomData = doc;
      });
      if (roomData !== null) {
        roomData.joiners.forEach(element => {
          if (element !== auth.uid) {
            friendID = element;
          }
        });
      }
      await this.getUserData(friendID).then(doc => {
        this.setState({
          name: doc.username,
          img: doc.img,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    this.callRealtimeLastMess();
  }

  getRoomData = async id => {
    let data = null;
    try {
      await chatRoomRef
        .doc(id)
        .get()
        .then(doc => {
          data = doc.data();
        });
      this.callRealtimeLastMess = chatRoomRef.doc(id).onSnapshot(doc => {
        this.setState({lastMess: doc.data().lastMessage});
      });
    } catch (error) {
      console.log(error);
    }
    return data;
  };

  getUserData = async id => {
    let data = null;
    try {
      await userRef
        .doc(id)
        .get()
        .then(doc => {
          data = doc.data();
        });
    } catch (error) {
      console.log(error);
    }
    return data;
  };

  goToChatRoom = () => {
    const {roomID, onPress} = this.props;
    const {name, img} = this.state;
    onPress(name, img, roomID);
  };

  render() {
    const {name, img, lastMess} = this.state;
    return (
      <TouchableOpacity onPress={this.goToChatRoom} style={styles.root}>
        {img !== '' && (
          <Avatar
            rounded
            size="medium"
            source={{
              uri: img,
            }}
          />
        )}
        <View style={styles.nameBox}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.mess}>{lastMess}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(ListChatEle);
