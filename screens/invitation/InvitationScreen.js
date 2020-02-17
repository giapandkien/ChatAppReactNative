import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import {View, ToastAndroid} from 'react-native';
import firebase from 'firebase';
import {
  userRef,
  chatRoomRef,
} from '../../src/connectFirebase/firebase.connections';
import InvitationElement from '../../components/invitation/element';
import LoadingWithoutModal from '../../components/common/loadingWithoutModal';

const styles = EStyleSheet.create({});

EStyleSheet.build({});

class InvitationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listInvitations: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const {auth} = this.props;
    this.getFriendInvitation = userRef.doc(auth.uid).onSnapshot(async doc => {
      let listInvitations = [];
      if (doc.data().invitations !== undefined) {
        if (doc.data().invitations !== undefined) {
          const listInvitationsID = doc.data().invitations;
          await userRef.get().then(docs => {
            docs.forEach(i => {
              if (listInvitationsID.indexOf(i.id) >= 0) {
                const invitator = {
                  id: i.id,
                  data: i.data(),
                };
                listInvitations.push(invitator);
              }
            });
          });
        }
      }
      this.setState({
        listInvitations: listInvitations,
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.getFriendInvitation();
  }

  acceptFriend = async id => {
    const {listInvitations} = this.state;
    const {auth} = this.props;
    const listInvitationsFilter = listInvitations.filter(i => i.id !== id);
    try {
      await userRef.doc(auth.uid).update({
        invitations: firebase.firestore.FieldValue.arrayRemove(id),
        friends: firebase.firestore.FieldValue.arrayUnion(id),
      });
      await userRef.doc(id).update({
        personsInvited: firebase.firestore.FieldValue.arrayRemove(auth.uid),
        friends: firebase.firestore.FieldValue.arrayUnion(auth.uid),
      });
      const roomID = new Date().getTime();
      const joiners = [id, auth.uid];
      await chatRoomRef
        .doc(roomID.toString())
        .set({lastMessage: '', joiners: joiners});
      this.setState({
        listInvitations: listInvitationsFilter,
      });
      ToastAndroid.show('Added', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Error', ToastAndroid.SHORT);
      console.log(error);
    }
  };

  render() {
    const {listInvitations, isLoading} = this.state;
    console.log(listInvitations);
    return isLoading ? (
      <LoadingWithoutModal />
    ) : (
      <View>
        {listInvitations.map((i, key) => (
          <InvitationElement
            key={key}
            invitator={i}
            acceptFriend={id => this.acceptFriend(id)}
          />
        ))}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(InvitationScreen);
