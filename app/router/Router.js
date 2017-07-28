import React from 'react';
import { View, Text, Image, Platform, BackAndroid, Dimensions } from 'react-native';
import { Router, Scene, ActionConst, Actions, DefaultRenderer } from 'react-native-router-flux';


import Home from '../components/Home';
import Post from '../components/Post';

 /* sceneStyle={{ paddingTop: 60 }}
        navigationBarBackgroundImage={require('../../../images/header_background.png')}
        navigationBarStyle={styles.navigationBarStyles}
        titleStyle={[styles.routerTitleStyle, commonStyles.opensansSemiBold]}
        navigationBarBackgroundImageStyle={{ width: device.width }}
        backButtonImage={require('../../../images/back_button.png')}
        // barButtonIconStyle={{ paddingLeft: 20, marginLeft: 10, width: 15.1, height: 15 }}
        leftButtonIconStyle={styles.leftButtonStyle}
        onPress={() =>        alert('click')} */

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene key="main" >
        <Scene key="Home" component={Home} title="Home" />
        <Scene key="Post" component={Post} title="Post" />
      </Scene>
    </Scene>
  </Router>
);

export default RouterComponent;