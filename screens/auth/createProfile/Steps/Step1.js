import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, Text, Picker} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import {updateInfo} from '../../../../src/actions/createProfile.actions';

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

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCountry: [],
      listCity: [],
    };
  }

  handleChangeSex = e => {
    const {dispatch} = this.props;
    dispatch(updateInfo({value: e, type: 'sex'}));
  };

  handleChangeCountry = itemValue => {
    const {dispatch} = this.props;
    const {listCountry} = this.props.createProfile;
    listCountry.forEach(element => {
      if (element.countryName === itemValue) {
        dispatch(updateInfo({value: itemValue, type: 'countrySelected'}));
        dispatch(updateInfo({value: element.cities, type: 'listCity'}));
        dispatch(updateInfo({value: element.cities[0], type: 'citySelected'}));
      }
    });
  };

  handleChangeCity = itemValue => {
    const {dispatch} = this.props;
    dispatch(updateInfo({value: itemValue, type: 'citySelected'}));
  };

  next = () => {
    const {navigate} = this.props.navigation;
    navigate('Step2');
  };

  render() {
    const {
      sex,
      listCountry,
      countrySelected,
      listCity,
      citySelected,
    } = this.props.createProfile;
    console.log(this.props.createProfile);
    return (
      <View style={styles.root}>
        <View style={styles.chooseSex}>
          <Text style={styles.title}>You are:</Text>
          <RadioButton.Group
            onValueChange={value => this.handleChangeSex(value)}
            value={sex}>
            <View style={styles.radioBox}>
              <View style={styles.radioEle}>
                <RadioButton value="male" color="#6c5ce7" />
                <Text style={styles.text}>Male</Text>
              </View>
              <View style={styles.radioEle}>
                <RadioButton value="female" color="#6c5ce7" />
                <Text style={styles.text}>Female</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.chooseCountry}>
          <Text style={styles.title}>Where are you from:</Text>
          <View style={styles.borderPicker}>
            <Picker
              selectedValue={countrySelected}
              style={styles.picker}
              itemStyle={styles.text}
              onValueChange={itemValue => this.handleChangeCountry(itemValue)}>
              {listCountry.map((i, key) => (
                <Picker.Item
                  key={key}
                  label={i.countryName}
                  value={i.countryName}
                  color="#2d3436"
                />
              ))}
            </Picker>
          </View>
          <View style={styles.borderPicker}>
            <Picker
              selectedValue={citySelected}
              style={styles.picker}
              itemStyle={styles.text}
              onValueChange={itemValue => this.handleChangeCity(itemValue)}>
              {listCity.map((i, key) => (
                <Picker.Item key={key} label={i} value={i} color="#2d3436" />
              ))}
            </Picker>
          </View>
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
    );
  }
}

function mapStateToProps(state) {
  const {createProfile} = state;
  return {createProfile};
}

export default connect(mapStateToProps)(Step1);
