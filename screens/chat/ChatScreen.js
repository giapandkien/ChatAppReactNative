import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Message from '../../components/common/message';
import {Icon} from 'react-native-elements';
import {
  chatRoomRef,
  messageRef,
} from '../../src/connectFirebase/firebase.connections';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ecf0f1',
  },
  input: {
    backgroundColor: '#fff',
    width: '98%',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#ecf0f1',
    paddingLeft: 20,
    height: 40,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {flex: 1, justifyContent: 'center'},
  inputBox: {
    flex: 9,
  },
  contentScrollView: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'flex-end',
  },
  scrollViewKeyboardShow: {
    height: 280,
  },
  scrollViewKeyboardHide: {
    height: 514,
  },
});

EStyleSheet.build({});

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      listMess: [],
      isKeyboardShow: false,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    const roomID = navigation.getParam('roomID');
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    this.getMess = messageRef.onSnapshot(messages => {
      if (messages !== undefined && messages !== null) {
        let listMess = [];
        messages.forEach(ele => {
          if (ele.data().roomID === roomID) {
            listMess.push(ele.data());
          }
        });
        this.setState({
          listMess: listMess,
        });
      }
    });
  }

  keyboardDidShow = () => {
    this.setState({
      isKeyboardShow: true,
    });
    this.scrollView.scrollToEnd({animated: true});
  };

  keyboardDidHide = () => {
    this.setState({
      isKeyboardShow: false,
    });
    this.scrollView.scrollToEnd({animated: true});
  };

  componentWillUnmount() {
    this.getMess();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  sendMess = async () => {
    const {auth, navigation} = this.props;
    const {message} = this.state;
    const messName = new Date().getTime().toString();
    const timeSend = new Date();
    const roomID = navigation.getParam('roomID');
    if (message !== '') {
      try {
        this.setState({
          message: '',
        });
        await messageRef.doc(messName).set({
          content: message,
          timeSend: timeSend,
          senderID: auth.uid,
          roomID: roomID,
        });
        await chatRoomRef.doc(roomID).update({
          lastMessage: message,
        });
        this.scrollView.scrollToEnd({animated: true});
        ToastAndroid.show('Sent!', ToastAndroid.SHORT);
      } catch (error) {
        ToastAndroid.show(
          'Error from server, please try again',
          ToastAndroid.SHORT,
        );
        console.log(error);
      }
    }
  };

  render() {
    const {message, listMess, isKeyboardShow} = this.state;
    const {auth} = this.props;
    return (
      <View style={styles.root}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
          enabled>
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({animated: true});
            }}
            style={
              isKeyboardShow
                ? styles.scrollViewKeyboardShow
                : styles.scrollViewKeyboardHide
            }
            contentContainerStyle={styles.contentScrollView}>
            {listMess.map((i, key) => (
              <Message
                key={key}
                message={i.content}
                isMine={i.senderID === auth.uid}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.textBox}>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Type your message"
              selectionColor={'#6c5ce7'}
              value={message}
              style={styles.input}
              onChangeText={e => this.setState({message: e})}
            />
          </View>
          <View style={styles.iconBox}>
            <Icon
              name="send"
              type="material-icons"
              color="#6c5ce7"
              style={styles.icon}
              onPress={this.sendMess}
            />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(ChatScreen);
