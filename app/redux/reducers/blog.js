import Type from '../actionTypes'

const Blog = (state={}, { type, payload }) => {

    switch (type) {
     
            case Type.GET_BLOG_POSTS:
            console.log('redux .post ',payload)
            return {...state,posts:payload}

        default:
            return state;
    }

}

export {Blog} 