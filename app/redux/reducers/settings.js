import Type from '../actionTypes'

import LocalStorage from '../../services/localStorage';

const Settings = (state = {}, { type, payload }) => {

    switch (type) {
        case Type.SET_THEME:

            let setState1 = { Settings: { theme: payload, fontSize: state.fontSize, nightMode: state.nightMode } };
            LocalStorage.set('state', setState1);

            return { ...state, theme: payload };

        case Type.SET_WELCOME:
            return { ...state, welcome: false };

        case Type.SET_FONTSIZE:

            let setState2 = { Settings: { theme: state.theme, fontSize: payload, nightMode: state.nightMode } };
            LocalStorage.set('state', setState2);

            return { ...state, fontSize: payload };

        case Type.SET_NIGHTMODE:

            let setState3 = { Settings: { theme: state.theme, fontSize: state.fontSize, nightMode:payload} };
            LocalStorage.set('state', setState3);

            return { ...state, nightMode: payload };

        default:
            return state;
    }

}
export { Settings } 