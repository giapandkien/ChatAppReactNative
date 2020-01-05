import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text, ToastAndroid} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {updateInfo} from '../../../../src/actions/createProfile.actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 10,
  },
  chooseSex: {flex: 1, padding: 10},
  title: {
    fontFamily: 'Roboto-Light',
    color: '#2d3436',
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFF',
    width: '100%',
  },
  radioBox: {flexDirection: 'row'},
  radioEle: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {width: '30%', fontFamily: 'Roboto-Light'},
  btnBox: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: '#2d3436',
    fontFamily: 'Roboto-Light',
  },
  chooseCountry: {padding: 10, flex: 3},
  borderPicker: {
    borderWidth: 1,
    width: 210,
    borderColor: '#6c5ce7',
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 200,
  },
});

EStyleSheet.build({});

class Step2 extends Component {
  constructor(props) {
    super(props);
  }

  handleChangeDescription = itemValue => {
    const {dispatch} = this.props;
    dispatch(updateInfo({value: itemValue, type: 'description'}));
  };

  handleChangeAge = itemValue => {
    const {dispatch} = this.props;
    dispatch(updateInfo({value: itemValue, type: 'age'}));
  };

  next = () => {
    const {navigate} = this.props.navigation;
    const {age, desciption} = this.props.createProfile;
    if (age === '' || desciption === '') {
      ToastAndroid.show('Fill all text field', ToastAndroid.SHORT);
    } else {
      navigate('Step3');
    }
  };

  render() {
    const {age, desciption} = this.props.createProfile;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.root}>
          <View style={styles.chooseSex}>
            <Text style={styles.title}>Your age:</Text>
            <TextInput
              value={age}
              style={styles.input}
              mode="outlined"
              onChangeText={itemValue => this.handleChangeAge(itemValue)}
            />
          </View>
          <View style={styles.chooseCountry}>
            <Text style={styles.title}>Tell something about you:</Text>
            <TextInput
              value={desciption}
              style={styles.input}
              mode="outlined"
              onChangeText={itemValue =>
                this.handleChangeDescription(itemValue)
              }
            />
          </View>
          <View style={styles.btnBox}>
            <Button
              mode="contained"
              color="#6c5ce7"
              style={styles.btn}
              onPress={this.next}>
              Next
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

function mapStateToProps(state) {
  const {createProfile} = state;
  return {createProfile};
}

export default connect(mapStateToProps)(Step2);
