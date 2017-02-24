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

export default class TempHumDisplay extends Component {

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
            color={styleConstants.blueColor}
            size={32}
          />

        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  temperature: {
    fontSize: 64,
    color: styleConstants.greyColor,
  },

  humidity: {
    fontSize: 32,
    color: styleConstants.greyColor,
  },
});
