import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, TextInput, ScrollView, ToastAndroid} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {
  statusesRef,
  userRef,
} from '../../src/connectFirebase/firebase.connections';
import {connect} from 'react-redux';
import StatusElement from '../../components/status/element';
import LoadingWithoutModal from '../../components/common/loadingWithoutModal';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e9ebee',
    alignItems: 'center',
  },
  inputBox: {flex: 1, padding: 10},
  input: {
    borderColor: '#dddfe2',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    padding: 10,
  },
  postStatusBox: {
    flexDirection: 'column',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dddfe2',
    backgroundColor: '#FFF',
  },
  boxInputAndAvatar: {flexDirection: 'row', width: '100%'},
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  avatarBox: {
    padding: 10,
  },
  scrollView: {
    width: '95%',
  },
  contentStyleScrollView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

EStyleSheet.build({});

class StatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusContent: '',
      img: '',
      height: 0,
      listStatus: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const {auth} = this.props;
    let listFriend = [];
    await userRef
      .doc(auth.uid)
      .get()
      .then(doc => {
        if (doc.data().friends !== undefined) {
          listFriend = doc.data().friends;
        }
        this.setState({img: doc.data().img});
      })
      .catch(error => console.log(error));
    this.getStatus = statusesRef.onSnapshot(docs => {
      let listStatus = [];
      docs.forEach(doc => {
        if (doc !== undefined) {
          if (
            listFriend.indexOf(doc.data().posterID) >= 0 ||
            doc.data().posterID === auth.uid
          ) {
            listStatus.push({id: doc.id, ...doc.data()});
          }
        }
      });
      this.setState({listStatus: listStatus, isLoading: false});
    });
  }

  componentWillUnmount() {
    this.getStatus();
  }

  postStatus = async () => {
    const {auth} = this.props;
    const {statusContent} = this.state;
    const statusID = new Date().getTime().toString();
    await statusesRef
      .doc(statusID)
      .set({
        posterID: auth.uid,
        content: statusContent,
        timePost: new Date(),
      })
      .then(() => {
        this.setState({statusContent: '', height: 0});
        ToastAndroid.show('Posted', ToastAndroid.SHORT);
      })
      .catch(error => console.log(error));
  };

  render() {
    const {statusContent, img, height, listStatus, isLoading} = this.state;
    return isLoading ? (
      <LoadingWithoutModal />
    ) : (
      <View style={styles.root}>
        <View style={styles.postStatusBox}>
          <View style={styles.boxInputAndAvatar}>
            <View style={styles.avatarBox}>
              {img !== '' && (
                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri: img,
                  }}
                />
              )}
            </View>
            <View style={styles.inputBox}>
              <TextInput
                multiline={true}
                style={[styles.input, {height: Math.max(35, height)}]}
                onContentSizeChange={event => {
                  this.setState({height: event.nativeEvent.contentSize.height});
                }}
                selectionColor="#6c5ce7"
                placeholder="What are you thinking ?"
                onChangeText={text => this.setState({statusContent: text})}
                value={statusContent}
              />
            </View>
          </View>
          {statusContent !== '' && (
            <View style={styles.btnBox}>
              <Button
                mode="contained"
                color="#6c5ce7"
                onPress={this.postStatus}>
                Post
              </Button>
            </View>
          )}
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}>
          {listStatus.map((i, key) => (
            <StatusElement key={key} data={i} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(StatusScreen);
