import Type from '../actionTypes'

const Blog = (state = {}, { type, payload }) => {

    switch (type) {

        case Type.GET_BLOG_POSTS:
            return { ...state, posts: payload }

        case Type.GET_BLOG_POST_DETAILS:
            return { ...state, postDetails: payload }

        default:
            return state;
    }

}

export { Blog } 