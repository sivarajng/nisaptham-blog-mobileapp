import Type from './actionTypes';
import BlogServices from '../services/blog';

export const Get = () => {
    return (dispatch) => {
        dispatch({
            type: Type.GET,
            payload: "SIVARAJNG@GMAIL.COM"
        })
    }
}

export const getPosts = () => {
    return (dispatch) => {

        BlogServices.getPosts().then(response => {

            console.log('getPosts response :', response);

            dispatch({
                type: Type.GET_BLOG_POSTS,
                payload: response
            })


        }).catch(error => {
            console.log('getPosts error :', error);
        });


    }
}

export const getPostsSearch = (query) => {
    return (dispatch) => {

        BlogServices.getPostsSearch(query).then(response => {

            console.log('getPostsSearch response :', response);

            if (response.feed.entry) {
                console.log("------------ TRUE", response.feed.entry);
            }
            else {
                response.feed.entry=[];
                console.log("------------ FALSEE", response.feed);
            }
            dispatch({
                type: Type.GET_BLOG_POSTS_SEARCH,
                payload: response
            })


        }).catch(error => {
            console.log('getPostsSearch error :', error);
        });


    }
}

export const getPostDetails = (url) => {
    return (dispatch) => {

        BlogServices.getPostDetails(url).then(response => {

            //     console.log('getPostDetails hh response :', response);

            dispatch({
                type: Type.GET_BLOG_POST_DETAILS,
                payload: response
            })


        }).catch(error => {
            console.log('getPostDetails error :', error);
        });


    }
}

export const getPostComments = (url) => {
    return (dispatch) => {

        BlogServices.getPostComments(url).then(response => {

            //     console.log('getPostDetails hh response :', response);

            dispatch({
                type: Type.GET_BLOG_POST_COMMENTS,
                payload: response
            })


        }).catch(error => {
            console.log('getPostDetails error :', error);
        });


    }
}



