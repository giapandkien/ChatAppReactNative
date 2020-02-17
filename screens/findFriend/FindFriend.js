import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import {StatusBar, ToastAndroid, Animated, PanResponder} from 'react-native';
import firebase from 'firebase';
import {screenHeight, screenWidth} from '../../src/utils/screenSize';
import PersonCard from '../../components/findFriend/personCard';
import LinearGradient from 'react-native-linear-gradient';
import {userRef} from '../../src/connectFirebase/firebase.connections';
import LoadingWithoutModal from '../../components/common/loadingWithoutModal';

const styles = EStyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  animatedStyle: {
    position: 'absolute',
    height: screenHeight,
    width: screenWidth,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedStyleFirst: {
    position: 'absolute',
    height: screenHeight,
    width: screenWidth,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});

EStyleSheet.build({});

class FindFriend extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.rotate = this.position.x.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });
    this.state = {
      isLoading: true,
      nextData: null,
      persons: [],
      currentIndex: 0,
    };
  }

  async componentDidMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: {x: screenWidth + 100, y: gestureState.dy},
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0});
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: {x: -screenWidth - 100, y: gestureState.dy},
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0});
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 4,
          }).start();
        }
      },
    });
    const {auth} = this.props;
    try {
      let personsInvited = [];
      let friends = [];
      await userRef
        .doc(auth.uid)
        .get()
        .then(doc => {
          if (doc.data().personsInvited) {
            personsInvited = doc.data().personsInvited;
          }
          if (doc.data().friends) {
            friends = doc.data().friends;
          }
        });
      await userRef
        .limit(20)
        .get()
        .then(documentSnapshots => {
          let lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
          let next = userRef.startAfter(lastVisible).limit(20);
          let personData = [];
          documentSnapshots.docs.forEach(i => {
            if (
              i.id !== auth.uid &&
              personsInvited.indexOf(i.id) < 0 &&
              friends.indexOf(i.id) < 0
            ) {
              const data = i.data();
              const id = i.id;
              personData.push({id, data});
            }
          });
          this.setState({
            isLoading: false,
            persons: personData,
            next: next,
          });
        });
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      console.log(error);
    }
  }

  skipPerson = () => {
    const {currentIndex} = this.state;
    this.setState({
      currentIndex: currentIndex + 1,
    });
  };

  inviteInCard = () => {
    const {currentIndex} = this.state;
    this.inviteFriend(currentIndex);
    this.setState({
      currentIndex: currentIndex + 1,
    });
  };

  inviteFriend = async cardIndex => {
    const {auth} = this.props;
    const {persons} = this.state;
    const userID = auth.uid;
    const strangerID = persons[cardIndex].id;
    try {
      await userRef.doc(strangerID).update({
        invitations: firebase.firestore.FieldValue.arrayUnion(userID),
      });
      await userRef.doc(userID).update({
        personsInvited: firebase.firestore.FieldValue.arrayUnion(strangerID),
      });
      ToastAndroid.show('Invitation sent!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      console.log(error);
    }
  };

  renderPersons = () => {
    const {persons, currentIndex} = this.state;
    return persons
      .map((item, index) => {
        if (index < currentIndex) {
          return null;
        } else if (index === currentIndex) {
          return (
            <Animated.View
              key={item.id}
              {...this.PanResponder.panHandlers}
              style={[this.rotateAndTranslate, styles.animatedStyle]}>
              <PersonCard person={persons[0]} />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View key={item.id} style={[styles.animatedStyle]}>
              <PersonCard person={persons[0]} />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    const {isLoading, persons, currentIndex} = this.state;
    return isLoading ? (
      <LoadingWithoutModal />
    ) : (
      <LinearGradient
        colors={['#fff', '#f5f6fa', '#f1f2f6', '#ecf0f1']}
        style={styles.root}>
        {persons.length > 1 && currentIndex < persons.length && (
          <PersonCard
            person={persons[currentIndex]}
            skip={this.skipPerson}
            invite={this.inviteInCard}
          />
        )}
      </LinearGradient>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(FindFriend);
