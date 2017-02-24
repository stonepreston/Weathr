import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as Progress from 'react-native-progress';
import {styleConstants} from './styles.js';

export default class Loading extends Component {
  render() {
    return (
      <View>
        <Progress.CircleSnail color={styleConstants.blueColor} />
      </View>
    );
  }
}
