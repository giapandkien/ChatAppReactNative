import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, ScrollView, StatusBar} from 'react-native';
import ListChatEle from '../../components/listChat/ListChatEle';
import {chatRoomRef} from '../../src/connectFirebase/firebase.connections';
import {connect} from 'react-redux';
import LoadingWithoutModal from '../../components/common/loadingWithoutModal';
import {setLoadingFull} from '../../src/actions/common.actions';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
});

EStyleSheet.build({});

class ListFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listChatRoom: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const {auth} = this.props;
    this.getChatRooms = chatRoomRef.onSnapshot(docs => {
      let listChatRoom = [];
      if (docs !== undefined) {
        docs.forEach(i => {
          if (i.data().joiners.indexOf(auth.uid) >= 0) {
            listChatRoom.push(i.id);
          }
        });
      }
      this.setState({
        listChatRoom: listChatRoom,
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.getChatRooms();
  }

  goToChatRoom = (name, img, roomID) => {
    const {navigate} = this.props.navigation;
    navigate('Chat', {name: name, img: img, roomID: roomID});
  };

  render() {
    const {listChatRoom, isLoading} = this.state;
    return isLoading ? (
      <LoadingWithoutModal />
    ) : (
      <ScrollView>
        <View style={styles.root}>
          {listChatRoom.map((i, key) => (
            <ListChatEle
              key={key}
              roomID={i}
              onPress={(name, img, roomID) =>
                this.goToChatRoom(name, img, roomID)
              }
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(ListFriend);
