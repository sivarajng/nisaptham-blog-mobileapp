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

import Router from './app/router/Router';
export default class App extends Component {
  render() {
    return (
      <Router />
    )
  }
};





AppRegistry.registerComponent('nisapthamblog', () => App);
