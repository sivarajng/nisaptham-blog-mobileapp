import { NetInfo, Alert } from 'react-native';
import CONFIG from '../configs';

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

    getStatus  (response)  {
        if ((response.status >= 200 && response.status <= 300) || response.status === 0) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response);
        }
    }

    parseJson (response)  {
        return response.json();
    };


    getPosts (type="GET")  {
        return fetch(CONFIG.BLOG_BASE_URL , {
            method: type,
        }).then(this.getStatus)
          .then(this.parseJson);
    }
}

export default new BlogServices();