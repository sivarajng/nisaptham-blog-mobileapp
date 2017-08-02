import Type from '../actionTypes'

const Get =  (state={}, { type, payload }) => {

    switch (type) {
        case Type.GET:
            return { ...state, Data: payload };

        default:
            return state;
    }

}
export {Get} 