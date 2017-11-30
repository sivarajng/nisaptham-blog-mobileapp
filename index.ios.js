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
  View,
  AppState
} from 'react-native';
import { Provider } from 'react-redux'

import Router from './app/router/Router';
import store from './app/redux/store';
import services from './app/services/blog';


import LocalStorage from './app/services/localStorage';

export default class App extends Component {

  render() {
    return (
      <View>
        <Provider store={store}>
          <Router />
        </Provider>
      </View>

    )
  }
};





AppRegistry.registerComponent('nisapthamblog', () => App);
