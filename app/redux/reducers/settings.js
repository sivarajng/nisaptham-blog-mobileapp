import Type from '../actionTypes'

const Settings =  (state={}, { type, payload }) => {

    switch (type) {
        case Type.SET_THEME:
            return { ...state, theme: payload };

        case Type.SET_WELCOME:
            return { ...state, welcome: false };

        default:
            return state;
    }

}
export {Settings} 