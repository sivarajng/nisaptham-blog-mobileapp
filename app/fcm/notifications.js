'use strict';

import PushNotification from "react-native-push-notification";

let _pushNotificationToken = null;
const _pushNotificationListeners = [];

function init() {
  console.log("PushNotification init");

  PushNotification.configure({
    onRegister(token) {
      console.log('Registered pushNotificationToken:', token);
      _pushNotificationToken = token;
    },

    onNotification(notification) {
      console.log("Received pushNotification",);
      _pushNotificationListeners.forEach((listener) => {
        try {
          listener(notification);
        } catch (err) {
          console.warn("Listener failed to process push notification", err);
        }
      })
    },

    senderID: "1068946777489",

    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    popInitialNotification: false,

    requestPermissions: true
  });
}

init();

export default class PushNotifications {
  constructor() {

  }

  addListener(listener) {
    _pushNotificationListeners.push(listener);

    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    }
  }

  token() {
    return _pushNotificationToken;
  }

  popInitial() {
    PushNotification.configure({
      popInitialNotification: true,
    });
  }
}