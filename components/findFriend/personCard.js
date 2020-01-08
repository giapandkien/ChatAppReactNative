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
    height: 0.52 * screenHeight,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontFamily: 'Roboto-Black',
    fontSize: 25,
    color: '#2d3436',
  },
  age: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  description: {
    color: '#95a5a6',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  btnBox: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
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
    marginBottom: 10,
  },
  textPercent: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
  matchPercent: {
    position: 'absolute',
    bottom: 165,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  likeBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  closeBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {marginRight: 10},
});

EStyleSheet.build({});

class PersonCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data} = this.props.person;
    const {skip, invite} = this.props;
    return (
      <View style={styles.root}>
        <Image
          source={{
            uri: data.img,
          }}
          style={styles.img}
        />
        <View style={styles.nameBox}>
          {data.sex === 'female' ? (
            <Icon
              name="venus"
              type="font-awesome"
              size={20}
              color="#ff7675"
              containerStyle={styles.icon}
            />
          ) : (
            <Icon
              name="mars"
              type="font-awesome"
              size={20}
              color="#0984e3"
              containerStyle={styles.icon}
            />
          )}
          <Icon />
          <Text style={styles.name}>{data.username}</Text>
        </View>
        <Text style={styles.age}>{' (' + data.age + ' years old)'}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#be2edd', '#6c5ce7']}
          style={styles.matchPercent}>
          <Icon name="heart" type="font-awesome" color="#fff" size={15} />
          <Text style={styles.textPercent}>95% Match!</Text>
        </LinearGradient>
        <View style={styles.btnBox}>
          <View style={styles.closeBox}>
            <TouchableOpacity onPress={skip} style={styles.iconBtn}>
              <Icon name="close" type="material" color="#e74c3c" size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.likeBox}>
            <TouchableOpacity onPress={invite} style={styles.iconBtn}>
              <Icon
                name="heart"
                type="font-awesome"
                color="#6c5ce7"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default PersonCard;
