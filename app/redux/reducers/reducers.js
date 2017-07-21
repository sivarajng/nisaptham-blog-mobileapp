import Type from './actionTypes'

export default (state={}, { type, payload }) => {

    switch (type) {
        case Type.GET:
            return { ...state, Data: payload };

        default:
            return state;
    }

}