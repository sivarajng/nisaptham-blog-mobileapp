import { AsyncStorage } from 'react-native';


class LocalStorage {



    set(key, value) {
        AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
            if (error) {
                console.log("AsyncStorage setItem error",error);
            }
        });
    }

    get(key) {
        return AsyncStorage.getItem(key);
    }



}

export default new LocalStorage();