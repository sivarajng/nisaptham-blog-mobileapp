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
import { Provider } from 'react-redux'

import Router from './app/router/Router';
import store from './app/redux/store';
import services from './app/services/blog';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
};





AppRegistry.registerComponent('nisapthamblog', () => App);
