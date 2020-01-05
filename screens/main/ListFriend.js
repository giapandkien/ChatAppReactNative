import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, ScrollView, StatusBar} from 'react-native';
import ListChatEle from '../../components/listChat/ListChatEle';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
});

EStyleSheet.build({});

const friend = [
  {
    img:
      'https://firebasestorage.googleapis.com/v0/b/chatapp-22591.appspot.com/o/ha-anh-tuan.jpg?alt=media&token=64bcde7b-7ebf-4e97-9989-ca9888e4174a',
    name: 'Ha Anh Tuan',
  },
  {
    img:
      'https://firebasestorage.googleapis.com/v0/b/chatapp-22591.appspot.com/o/hoang-thuy-linh.jpg?alt=media&token=c21201c0-a6cb-4721-9947-fd7ea365e573',
    name: 'Hoang Thuy Linh',
  },
  {
    img:
      'https://firebasestorage.googleapis.com/v0/b/chatapp-22591.appspot.com/o/lee-jong-suk.png?alt=media&token=aa9f47e1-9b62-4649-97b1-f7bc80c359ba',
    name: 'Lee Min Ho',
  },
  {
    img:
      'https://firebasestorage.googleapis.com/v0/b/chatapp-22591.appspot.com/o/lee-min-ho.jpg?alt=media&token=412c276a-e2ee-481c-bc2c-be79f58594b7',
    name: 'Nha Phuong',
  },
  {
    img:
      'https://firebasestorage.googleapis.com/v0/b/chatapp-22591.appspot.com/o/phuong-nga.jpg?alt=media&token=082a196e-633f-41e4-89a5-af55c6da3aad',
    name: 'Phuong Nga',
  },
  {
    img:
      'https://firebasestorage.googleapis.com/v0/b/chatapp-22591.appspot.com/o/toc-tien.jpg?alt=media&token=080c712d-8285-4c54-828f-fa14a4454d22',
    name: 'Toc Tien',
  },
];

class ListFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.root}>
          {friend.map((i, key) => (
            <ListChatEle key={key} data={i} onPress={() => navigate('Chat')} />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default ListFriend;
