import Type from '../actionTypes'

const Blog = (state={}, { type, payload }) => {

    switch (type) {
     
            case Type.GET_BLOG_JSON:
            return {...state,json:payload}

        default:
            return state;
    }

}

export {Blog} 