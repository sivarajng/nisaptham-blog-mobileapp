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

import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";
import PushController from "./app/fcm/PushController";
import PushController2 from "./app/fcm/PushController2";

// import {PushNotifications} from './app/fcm/notification.js';

FCM.subscribeToTopic("nisaptham-post-test");

FCM.getInitialNotification().then(notif => {
});

FCM.getInitialNotification().then(notif => {
  console.log("INITIAL NOTIFICATION APP", notif)
});

const notificationListner = FCM.on(FCMEvent.Notification, notif => {
  console.log("Notification", notif);
  if (notif.local_notification) {
    return;
  }
  if (notif.opened_from_tray) {
    //this.props.navigation.navigate('Chat', {friend: item} //needs to use notif. to navigate to correct chat screen
    return;
  }

});

export default class App extends Component {
  render() {
    return (
      <View>
        {/* <PushController onChangeToken={(token) => { }} /> */}
        <PushController2 onChangeToken={(token) => { }} />
        <Provider store={store}>
          <Router />
        </Provider>
      </View>

    )
  }
};





AppRegistry.registerComponent('nisapthamblog', () => App);
