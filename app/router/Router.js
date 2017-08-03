import React from 'react';
import { View, Text, Image, Platform, BackAndroid, Dimensions } from 'react-native';
import { Router, Scene, ActionConst, Actions, DefaultRenderer } from 'react-native-router-flux';


import Home from '../components/Home';
import Post from '../components/Post';
import Comment from '../components/Comment';
import {RootDrawer} from '../components/RootDrawer';

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
     
        <Scene key="Home" component={RootDrawer} title="Home" />
        <Scene key="Post" component={Post} title="Post" />
        <Scene key="Comment" component={Comment} title="Comment" />
    
    </Scene>
  </Router>
);

export default RouterComponent;