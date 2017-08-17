import Type from '../actionTypes'

import LocalStorage from '../../services/localStorage';

const Settings = (state = {}, { type, payload }) => {

    switch (type) {
        case Type.SET_THEME:

            let setState = { Settings: { theme: payload } };
            LocalStorage.set('state', setState);
            
            return { ...state, theme: payload };

        case Type.SET_WELCOME:
            return { ...state, welcome: false };

        default:
            return state;
    }

}
export { Settings } 