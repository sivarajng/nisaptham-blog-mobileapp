import { NetInfo, Alert } from 'react-native';
import CONFIG from '../configs';
import axios from 'axios';

NetInfo.isConnected.fetch().then(isConnected => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});

function handleFirstConnectivityChange(isConnected) {
    console.log('Then, is ' + (isConnected));

    if (isConnected === false) {
        Alert.alert(
            'No Internet Connection',
            'Please check your connection and try again.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }
}
NetInfo.isConnected.addEventListener(
    'change',
    handleFirstConnectivityChange
);

getPost = () => {


}

class BlogServices {
    constructor() {


    }

    getStatus(response) {
        if ((response.status >= 200 && response.status <= 300) || response.status === 0) {
            console.log('ddddddddddd', response);
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }

    parseJson(response) {
        return response.json();
    };

    parseResponse(response) {
        return response;
    };


    getPosts(type = "GET") {
        return fetch(CONFIG.BLOG_BASE_URL, {
            method: type,
        }).then(this.getStatus)
            .then(this.parseJson);
    }

    getPostDetails(url, type = "GET") {

        // Performing a GET request
       return axios.get(url)
            .then(this.getStatus)
            .then(this.parseResponse);


        //        // url='http://www.nisaptham.com/2017/08/blog-post_2.html';
        //         return fetch(url).then(function(data) {
        //   console.log('kkkkk',data.text())
        //     })
        //   .catch(function(error) {

        //   });   
    }
}

export default new BlogServices();