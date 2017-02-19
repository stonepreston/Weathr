/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Weathr extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tempF: null,
      tempC: null,
      humidity: null,
    };
  }

  componentWillMount() {

    this.getLatestData();

  }

  getLatestData() {

    this.getLatestCelsiusTemperature();
    this.getLatestFahrenheitTemperature();
    this.getLatestHumidity();

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
    return (
      <View style={styles.container}>

        {(this.state.tempC && this.state.tempF && this.state.humidity) ?
          <Home tempF={this.state.tempF} humidity={this.state.humidity} /> 
          :
          <Loading /> }

      </View>
    );
  }
}

export class Home extends Component {

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.temperature}>
          {this.props.tempF}
        </Text>
        <Text style={styles.humidity}>
          {this.props.humidity} % Humidity
        </Text>

      </View>
    );
  }

}

export class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Loading
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Weathr', () => Weathr);
