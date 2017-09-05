import React, { Component } from "react";
import { Platform } from 'react-native';
import FCM, {
            FCMEvent,
            RemoteNotificationResult,
            WillPresentNotificationResult,
            NotificationType
            }
            from "react-native-fcm";
// const firebase = require("firebase");

export default class PushController2 extends Component {
  constructor(props) {
    super(props);

    this.doFCM = this.doFCM.bind(this);
  }

  getRef() {
  //  return firebase.database().ref();
  }

  doFCM(){
      FCM.requestPermissions();
      FCM.getFCMToken().then(token => {
        console.log("TOKEN (getFCMToken)", token);

        try {
          this.props.onChangeToken(token).then(ok => {
            console.log('Token onChangeToken', ok)
          });
        } catch (err) {
          console.log('Token onChangeToken', err.message)
        }
      });

      FCM.getInitialNotification().then(notif => {
        console.log("INITIAL NOTIFICATION", notif)
      });

      this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
        console.log("Notification", notif);
        if(notif.local_notification){
          return;
        }
        if(notif.opened_from_tray){
          //this.props.navigation.navigate('Chat', {friend: item} //needs to use notif. to navigate to correct chat screen
          return;
        }

        if(Platform.OS ==='ios'){
          switch(notif._notificationType){
            case NotificationType.Remote:
              notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
              break;
            case NotificationType.NotificationResponse:
              notif.finish();
              break;
            case NotificationType.WillPresent:
              notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
              break;
          }
        }


      });
      this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
        console.log("TOKEN (refreshUnsubscribe)", token);
  
        try {
          this.props.onChangeToken(token).then(ok => {
            console.log('Refresh onChangeToken', ok)
          });
        } catch (err) {
          console.log('Refresh onChangeToken', err.message)
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (true) {
      this.doFCM()
    }
  }

  componentDidMount() {
    console.log('PushController Mount')
    if(true) {
      console.log('componentDidMount FCM triggered')
      this.doFCM()
    }
  }

  generateChatId(notif) { //creates unique chat code to identify session
//    console.log('Pushcontroller generateChatId this.props.user', this.props.user.uid)
    // console.log('Pushcontroller generateChatId notif.uid', notif.uid)
    //   if(this.props.user.uid > notif.uid)
    //       return `${this.props.user.uid}-${notif.uid}`
    //   else
    //       return `${notif.uid}-${this.props.user.uid}`
  }

//currently replacing previous notifications due to non unique id passed -> id: notif.Uid
  showLocalNotification(notif) {
    FCM.presentLocalNotification({
      id: notif.uid,
      title: notif.title,
      body: notif.body,
      priority: "high",
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true,
    });
  }

  componentWillUnmount() {
  //  this.notificationListner.remove();
 //   this.refreshTokenListener.remove();
  }

  render() {
    return null;
  }
}