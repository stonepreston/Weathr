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


import Loading from './Loading.js';
import TempHumDisplay from './TempHumDisplay.js';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tempF: null,
      tempC: null,
      humidity: null,
      fahrenheitDataPoints: null,
      celsiusDataPoints: null,
      humidityDataPoints: null,
      selectedIndex: 0
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  componentWillMount() {

    this.getData();

  }

  getData() {

    this.getLatestCelsiusTemperature();
    this.getLatestFahrenheitTemperature();
    this.getLatestHumidity();
    this.getCelsiusDataPoints();
    this.getFahrenheitDataPoints();
    this.getHumidityDataPoints();

  }

  getCelsiusDataPoints() {

    return fetch('https://api.thingspeak.com/channels/223104/fields/1.json')
      .then((response) => response.json())
      .then((responseJson) => {

        var arr = responseJson.feeds.map(function (feed) {
          return [feed.created_at, feed.field1];
        });
        console.log(arr);
        this.setState({celsiusDataPoints: arr});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getFahrenheitDataPoints() {

    return fetch('https://api.thingspeak.com/channels/223104/fields/2.json')
      .then((response) => response.json())
      .then((responseJson) => {

        var arr = responseJson.feeds.map(function (feed) {
          return [feed.created_at, feed.field2];
        });
        console.log(arr);
        this.setState({fahrenheitDataPoints: arr});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getHumidityDataPoints() {

    return fetch('https://api.thingspeak.com/channels/223104/fields/3.json')
      .then((response) => response.json())
      .then((responseJson) => {

        var arr = responseJson.feeds.map(function (feed) {
          return [feed.created_at, feed.field3];
        });
        console.log(arr);
        this.setState({humidityDataPoints: arr});
      })
      .catch((error) => {
        console.error(error);
      });
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

    var ready = this.state.tempC && this.state.tempF && this.state.humidity
    && this.state.celsiusDataPoints && this.state.fahrenheitDataPoints && this.state.humidityDataPoints;
    if (ready) {

      return (
        <View style={styles.container}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 30, marginTop: 20}}
          />
         {tempHumDisplay}
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
});
