import Type from '../actionTypes'

export default (state={}, { type, payload }) => {

    switch (type) {
     
            case Type.GET_BLOG_JSON:
            return {...state,json:payload}

        default:
            return state;
    }

}