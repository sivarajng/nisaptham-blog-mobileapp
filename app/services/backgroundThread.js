import BackgroundTask from 'react-native-background-task';
import FCM from "react-native-fcm";
import { AppState } from 'react-native';
import LocalStorage from './localStorage';
// BackgroundTask.cancel();

const backgroundThreadDef = () => {

    console.log('Called the backgroundThread : background task')

    BackgroundTask.define(() => {
        console.log("==================================        Hello from a background task at " + new Date() + "on AppState : " + AppState.currentState + "        ==============================================");

        FCM.presentLocalNotification({
            id: "notif.uid"+new Date().getMinutes(),
            title: "notif.title"+new Date().getMinutes(),
            body: "notif.body",
            priority: "high",
            click_action: "fcm.ACTION.HELLO",
            show_in_foreground: true,
            local: true,
          });

        fetch('https://www.blogger.com/feeds/10674130/posts/default/?alt=json&max-results=1')
            .then((response) => {

                if ((response.status >= 200 && response.status <= 300) || response.status === 0) {

                    //    console.log('response===', response);
                    return Promise.resolve(response)
                } /*else if(response.status == 401){
                     Alert.alert(
                     'Something went Wrong',
                     'Please try again later.',
                     [
                     {text: 'OK', onPress: () => console.log('OK Pressed')},
                     ],
                     { cancelable: false }
                     )
                     }*/else {
                    //  let error=new Error(response.statusText)
                    // error.response = response;
                    //return error

                    //console.log(response);
                    //throw Error(response.statusText)

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
                                        title: `NEW:${AppState.currentState}-${newPostObj.title}`,
                                        body: `at ${new Date().getMinutes()}-${newPostObj.summary}`,
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
        // BackgroundTask.cancel();
    })

    BackgroundTask.schedule({ period: 920});

}

const backgroundThreadSch = () => {

    
//    BackgroundTask.schedule({ period: 920});
}


export { backgroundThreadDef, backgroundThreadSch };
