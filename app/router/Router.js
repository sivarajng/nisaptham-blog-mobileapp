import React from 'react';
import { View, Text, Image, Platform, BackAndroid, Dimensions } from 'react-native';
import { Router, Scene, ActionConst, Actions, DefaultRenderer } from 'react-native-router-flux';


import Home from '../components/Home';
import Post from '../components/Post';

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene key="Home" component={Home} title="Home"/>
      <Scene key="Post" component={Post} title="Post"/>
    </Scene>
  </Router>
);

export default RouterComponent;