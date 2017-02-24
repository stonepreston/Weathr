import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Icon,
  ButtonGroup,
} from 'react-native-elements';

import {styleConstants} from './styles.js';
import Loading from './Loading.js';
import TempHumDisplay from './TempHumDisplay.js';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tempF: null,
      tempC: null,
      humidity: null,
      selectedIndex: 0
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  componentWillMount() {

    this.getLatestData();

  }

  getLatestData() {

    // reset values of state variables
    this.getLatestCelsiusTemperature();
    this.getLatestFahrenheitTemperature();
    this.getLatestHumidity();

  }

  refresh() {
    this.setState({tempC: null, tempF: null, humidity: null});
    this.getLatestData();
  }

  getLatestCelsiusTemperature() {

    return fetch('https://api.thingspeak.com/channels/223104/fields/1/last.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.field1);
        this.setState({tempC: responseJson.field1});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getLatestFahrenheitTemperature() {

    return fetch('https://api.thingspeak.com/channels/223104/fields/2/last.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.field2);
        this.setState({tempF: responseJson.field2});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getLatestHumidity() {

    return fetch('https://api.thingspeak.com/channels/223104/fields/3/last.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.field3);
        this.setState({humidity: responseJson.field3});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {

    const buttons = ['Fahrenheit', 'Celsius']

    var tempHumDisplay;
    const selectedIndex = this.state.selectedIndex;
    if (selectedIndex == 0) {
      tempHumDisplay = <TempHumDisplay temp={this.state.tempF} humidity={this.state.humidity} unit="F"/>
    } else {
      tempHumDisplay = <TempHumDisplay temp={this.state.tempC} humidity={this.state.humidity} unit="C"/>
    }

    if (this.state.tempC && this.state.tempF && this.state.humidity) {

      return (
        <View style={styles.container}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            selectedBackgroundColor={styleConstants.blueColor}
            selectedTextStyle={{color: "white"}}
            buttons={buttons}
            containerStyle={{height: 30}}
          />

          <View style={styles.tempHumDisplay}>

            <View style={{flex: 1}}>
            {tempHumDisplay}
            </View>

            <View style={{flex: 1}}>
              <Icon
                name='refresh'
                type='material-community'
                color={styleConstants.blueColor}
                reverse={true}
                raised={true}
                size={28}
                onPress={this.refresh.bind(this)}
              />
            </View>
          </View>
        </View>
      )

    } else {

      return (
        <View style={styles.loading}>
          <Loading />
        </View>
      );
    }


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  temperature: {
    fontSize: 64,
  },

  humidity: {
    fontSize: 32,
  },

  tempHumDisplay: {

    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  }
});
