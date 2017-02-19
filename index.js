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

import {
  Icon,
  ButtonGroup,
} from 'react-native-elements';

import * as Progress from 'react-native-progress';

export default class Weathr extends Component {

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

    this.getLatestCelsiusTemperature();
    this.getLatestFahrenheitTemperature();
    this.getLatestHumidity();
    console.log("getLatestData call complete")

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
    var home;
    const selectedIndex = this.state.selectedIndex;
    if (selectedIndex == 0) {
      home = <Home temp={this.state.tempF} humidity={this.state.humidity} unit="F"/>
    } else {
      home = <Home temp={this.state.tempC} humidity={this.state.humidity} unit="C"/>
    }

    return (
      <View style={styles.container}>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 30, marginTop: 30}}
        />

        {(this.state.tempC && this.state.tempF && this.state.humidity) ?
          home
          :
          <Loading /> }

      </View>
    );
  }
}

export class Home extends Component {

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.temperature}>
          {this.props.temp} °{this.props.unit}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.humidity}>
            {this.props.humidity}
          </Text>
          <Icon
            name='water-percent'
            type='material-community'
            color='red'
            size={32}
          />
        </View>

      </View>
    );
  }

}

export class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Progress.CircleSnail color={['red', 'green', 'blue']} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  temperature: {
    fontSize: 64,
  },

  humidity: {
    fontSize: 32,
  },
});

AppRegistry.registerComponent('Weathr', () => Weathr);
