import Type from '../actionTypes'

import LocalStorage from '../../services/localStorage';

const Settings = (state = {}, { type, payload }) => {

    switch (type) {
        case Type.SET_THEME:

            let setState1 = { Settings: { theme: payload } };
            LocalStorage.set('state', setState1);

            return { ...state, theme: payload };

        case Type.SET_WELCOME:
            return { ...state, welcome: false };

        case Type.SET_FONTSIZE:

            let setState2 = { Settings: { theme: state.theme, fontSize: payload } };
            LocalStorage.set('state', setState2);

            return { ...state, fontSize: payload };

        default:
            return state;
    }

}
export { Settings } 