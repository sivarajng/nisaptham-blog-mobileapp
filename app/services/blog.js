import { NetInfo, Alert } from 'react-native';

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