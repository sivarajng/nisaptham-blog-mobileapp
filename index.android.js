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
import BackgroundTask from 'react-native-background-task';

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
import LocalStorage from './app/services/localStorage';


FCM.subscribeToTopic("nisaptham-post-test");

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

BackgroundTask.define(() => {
    console.log("========>>>>>>>>>        Hello from a background task ");
    console.log("==================================        Hello from a background task at " + new Date() + "on AppState : " + AppState.currentState + "        ==============================================");

    // FCM.presentLocalNotification({
    //     id: "notif.uid" + new Date().getMinutes(),
    //     title: "notif.title" + new Date().getMinutes(),
    //     body: "notif.body",
    //     priority: "high",
    //     click_action: "fcm.ACTION.HELLO",
    //     show_in_foreground: true,
    //     local: true,
    // });

    fetch('https://www.blogger.com/feeds/10674130/posts/default/?alt=json&max-results=1')
        .then((response) => {

            if ((response.status >= 200 && response.status <= 300) || response.status === 0) {
                return Promise.resolve(response)
            } else {
                               return Promise.reject(response);
            }
        })
        .then((response) => response.json())
        .then((result) => {
            result.data = result;
            if (result.data) {
                //     console.log("BLOG GET LATEST POST RESPOSNSE :", result.data);
                if (result.data.feed.entry.length > 0) {
                    let newPostId = result.data.feed.entry[0].id.$t;
                    newPostId = newPostId.toString();
                    console.log("BLOG GET LATEST POST ID ", newPostId);

                    LocalStorage.get('newPostId').then((value) => {

                        console.log('LocalStorage Get Success newPostId', value);
                        if (value != null) {

                            value = JSON.parse(value);
                            console.log("fetched POST ID ", value);
                            if (value != newPostId) {

                                LocalStorage.set('newPostId', newPostId);

                                let newPostObj = {};
                                newPostObj.title = result.data.feed.entry[0].title.$t;
                                newPostObj.summary = result.data.feed.entry[0].summary.$t;

                                FCM.presentLocalNotification({
                                    vibrate: 500,
                                    title: `${newPostObj.title}`,
                                    body: `${newPostObj.summary}`,
                                    priority: "high",
                                    color: "#3391ed",
                                    show_in_foreground: true,
                                    click_action: "fcm.ACTION.HELLO",
                                    lights: true,
                                    icon: "ic_launcher",
                                    large_icon: "ic_launcher",
                                    picture: null
                                });
                            }
                            else {
                                /*
                                FCM.presentLocalNotification({
                                    vibrate: 500,
                                    title: `OLDAppState :${AppState.currentState}`,
                                    body: `at ${new Date().getMinutes()}`,
                                    priority: "high",
                                    color: "#3391ed",
                                    show_in_foreground: true,
                                    click_action: "fcm.ACTION.HELLO",
                                    lights: true,
                                    icon: "ic_launcher",
                                    large_icon: "ic_launcher",
                                    picture: null
                                });
                                */
                            }

                        }
                        else {
                            LocalStorage.set('newPostId', '');
                        }



                    }).catch((error) => {

                        console.log('LocalStorage Get Error newPostId', error);

                    })


                }

            }
            else {
                console.log("BLOG GET LATEST POST RESPOSNSE HAS NO Data Object==", result);
            }

        })
        .catch((err) => {
            console.log("BLOG GET LATEST POST ERROR", error);
        });



    BackgroundTask.finish();

})


export default class App extends Component {
    componentDidMount() {
        BackgroundTask.schedule();
    }
    render() {
        return (
            <View>
                <PushController onChangeToken={(token) => { }} />
                <Provider store={store}>
                    <Router />
                </Provider>
            </View>

        )
    }
};





AppRegistry.registerComponent('nisapthamblog', () => App);
