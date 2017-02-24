
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

import Home from './Home.js';

import * as Progress from 'react-native-progress';

export default class Weathr extends Component {

  render() {

    return (
      <Home />
    );
  }
}





AppRegistry.registerComponent('Weathr', () => Weathr);
