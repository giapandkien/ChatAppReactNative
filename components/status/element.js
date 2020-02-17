import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text, ToastAndroid, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {
  statusesRef,
  userRef,
} from '../../src/connectFirebase/firebase.connections';
import {connect} from 'react-redux';
import firebase from 'firebase';

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    marginTop: 5,
    width: '100%',
    borderRadius: 5,
  },
  boxName: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 10,
  },
  avatarBox: {
    marginRight: 10,
  },
  name: {
    fontFamily: 'Roboto-Black',
    fontSize: 18,
  },
  contentBox: {paddingTop: 5, paddingBottom: 5},
  content: {paddingLeft: 10, paddingBottom: 10, paddingRight: 10},
  btnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#dddfe2',
    borderTopWidth: 1,
  },
  countLikeText: {
    marginLeft: 10,
  },
  numNotLiked: {
    marginLeft: 10,
    color: '#dddfe2',
  },
  numLiked: {
    color: '#6c5ce7',
  },
});

EStyleSheet.build({});

class StatusElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      img: '',
      name: '',
      listLike: [],
    };
  }

  async componentDidMount() {
    const {data, auth} = this.props;
    await userRef
      .doc(data.posterID)
      .get()
      .then(doc => {
        this.setState({
          name: doc.data().username,
          img: doc.data().img,
          liked:
            data.personLiked !== undefined &&
            data.personLiked.indexOf(auth.uid) >= 0,
        });
      });
    this.getNumLike = statusesRef
      .doc(data.id)
      .onSnapshot(doc => this.setState({listLike: doc.data().personLiked}));
  }

  componentWillUnmount() {
    this.getNumLike();
  }

  likeBtn = async () => {
    const {auth, data} = this.props;
    const {liked} = this.state;
    if (!liked) {
      await statusesRef
        .doc(data.id)
        .update({
          personLiked: firebase.firestore.FieldValue.arrayUnion(auth.uid),
        })
        .then(async () => {
          await statusesRef
            .doc(data.id)
            .get()
            .then(doc => console.log(doc.data()));
          this.setState({liked: true});
          ToastAndroid.show('Liked', ToastAndroid.SHORT);
        })
        .catch(error => console.log(error));
    } else {
      await statusesRef
        .doc(data.id)
        .update({
          personLiked: firebase.firestore.FieldValue.arrayRemove(auth.uid),
        })
        .then(async () => {
          await statusesRef
            .doc(data.id)
            .get()
            .then(doc => console.log(doc.data()));
          this.setState({liked: false});
          ToastAndroid.show('UnLiked', ToastAndroid.SHORT);
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const {liked, name, img, listLike} = this.state;
    const {data} = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.boxName}>
          <View style={styles.avatarBox}>
            {img !== '' && (
              <Avatar
                rounded
                size="small"
                source={{
                  uri: img,
                }}
              />
            )}
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.content}>{data.content}</Text>
        </View>
        <TouchableOpacity onPress={this.likeBtn} style={styles.btnBox}>
          <Icon
            name="like"
            type="foundation"
            color={liked ? '#6c5ce7' : '#dddfe2'}
            onPress={this.likeBtn}
          />
          <Text style={[styles.numNotLiked, liked && styles.numLiked]}>
            {listLike !== undefined ? listLike.length : '0'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(StatusElement);
