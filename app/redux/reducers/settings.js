import Type from '../actionTypes'

const Settings =  (state={}, { type, payload }) => {

    switch (type) {
        case Type.SET_THEME:
            return { ...state, theme: payload };

        default:
            return state;
    }

}
export {Settings} 