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
import StatusElement from '../../components/status/elememt';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e9ebee',
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
    };
  }

  async componentDidMount() {
    const {auth} = this.props;
    let listStatus = [];
    await userRef
      .doc(auth.uid)
      .get()
      .then(doc => this.setState({img: doc.data().img}))
      .catch(error => console.log(error));
    await statusesRef
      .get()
      .then(docs => {
        docs.forEach(doc => {
          listStatus.push({id: doc.id, ...doc.data()});
        });
        this.setState({listStatus: listStatus});
      })
      .catch(error => console.log(error));
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
    const {statusContent, img, height, listStatus} = this.state;
    return (
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
                selectionColor="#000"
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
        <ScrollView>
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
