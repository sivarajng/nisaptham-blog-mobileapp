import Type from '../actionTypes'
var DOMParser = require('react-native-html-parser').DOMParser;
var XMLSerializer = require('react-native-html-parser').XMLSerializer;

const Blog = (state = {}, { type, payload }) => {

    switch (type) {

        case Type.GET_BLOG_POSTS:
            return { ...state, posts: payload }

        case Type.GET_BLOG_POSTS_REFRESH:
            return { ...state, postsRefresh: payload }

        case Type.GET_BLOG_POST_DETAILS_LOADER:
            return { ...state, postDetailsLoader: payload }

        case Type.GET_BLOG_POSTS_SEARCH_LOADER:
            return { ...state, postSearchLoader: payload }

        case Type.GET_BLOG_POSTS_SEARCH:
            return { ...state, postsSearch: payload }

        case Type.GET_BLOG_POST_COMMENTS:
            return { ...state, postComments: payload }

        case Type.GET_BLOG_POST_DETAILS:


            let jjj = "";
            if (payload) {
                //   let hh = payload.replace(/(?:\r\n|\r|\n)/g, ' ');
                let hh = payload;
                hh = new DOMParser().parseFromString(hh, 'text/html');

                jjj = new XMLSerializer().serializeToString(hh.getElementByClassName('post-body entry-content'));
                //    console.log('HHH TEXTTTTTTTTTTT ', jjj.toString());
            }
            else {
               
            }



            return { ...state, postDetails: jjj.toString() }

        default:
            return state;
    }

}

export { Blog } 