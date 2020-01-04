import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {screenHeight, screenWidth} from '../../src/utils/screenSize';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const styles = EStyleSheet.create({
  root: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    elevation: 5,
    borderRadius: 15,
  },
  img: {
    width: 0.8 * screenWidth,
    height: 0.5 * screenHeight,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontFamily: 'Roboto-Black',
    fontSize: 24,
    color: '#2d3436',
  },
  description: {
    color: '#95a5a6',
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
  },
  btnBox: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  iconBtn: {
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    elevation: 7,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  textPercent: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
  matchPercent: {
    position: 'absolute',
    bottom: 145,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

EStyleSheet.build({});

class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.root}>
        <Image
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/chatapp-22591.appspot.com/o/ha-anh-tuan.jpg?alt=media&token=64bcde7b-7ebf-4e97-9989-ca9888e4174a',
          }}
          style={styles.img}
        />
        <Text style={styles.name}>Ha Anh Tuan</Text>
        <Text style={styles.description}>
          Singer, Thang tu la loi noi doi cua em
        </Text>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#5c63e7', '#6c5ce7']}
          style={styles.matchPercent}>
          <Icon name="heart" type="font-awesome" color="#fff" size={15} />
          <Text style={styles.textPercent}>95% Match!</Text>
        </LinearGradient>
        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="close" type="material" color="#e74c3c" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="heart" type="font-awesome" color="#6c5ce7" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default PersonCard;
