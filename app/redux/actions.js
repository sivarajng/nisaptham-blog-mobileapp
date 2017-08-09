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

export const getPosts = (mode = "") => {
    return (dispatch) => {

        if (mode == "refresh") {
            dispatch({
                type: Type.GET_BLOG_POSTS_REFRESH,
                payload: true
            })
        }

        BlogServices.getPosts().then(response => {

            console.log('getPosts response :', response);

            dispatch({
                type: Type.GET_BLOG_POSTS,
                payload: response
            })
            dispatch({
                type: Type.GET_BLOG_POSTS_REFRESH,
                payload: false
            })


        }).catch(error => {
            console.log('getPosts error :', error);
            dispatch({
                type: Type.GET_BLOG_POSTS_REFRESH,
                payload: false
            })
        });


    }
}
export const selectCategory = (term) => {
    return (dispatch) => {

            dispatch({
                type: Type.GET_BLOG_POST_CATEGORY_SELECT,
                payload: term
            })
    }
}
export const unselectCategory = (term) => {
    return (dispatch) => {

            
            dispatch({
                type: Type.GET_BLOG_POST_CATEGORY_UNSELECT,
                payload: term
            })
    }
}

export const getCategoryList = () => {
    return (dispatch) => {


        BlogServices.getCategoryList().then(response => {

            dispatch({
                type: Type.GET_BLOG_POST_CATEGORY_LIST,
                payload: response.feed.category
            })


        }).catch(error => {
          
            dispatch({
                type: Type.GET_BLOG_POST_CATEGORY_LIST,
                payload: []
            })
        });


    }
}

export const getPostsSearch = (query, queryType = "text") => {
    return (dispatch) => {



        if (queryType == "clear") {

            let res = { feed: { entry: [] } };
            dispatch({
                type: Type.GET_BLOG_POSTS_SEARCH,
                payload: res
            })

            dispatch({
                type: Type.GET_BLOG_POSTS_SEARCH_LOADER,
                payload: false
            })

        }
        else {

            dispatch({
                type: Type.GET_BLOG_POSTS_SEARCH_LOADER,
                payload: true
            })

            BlogServices.getPostsSearch(query, queryType).then(response => {

                console.log('getPostsSearch response :', response);

                if (response.feed.entry) {
                    console.log("------------ TRUE", response.feed.entry);
                }
                else {
                    response.feed.entry = [];
                    console.log("------------ FALSEE", response.feed);
                }
                dispatch({
                    type: Type.GET_BLOG_POSTS_SEARCH,
                    payload: response
                })
                dispatch({
                    type: Type.GET_BLOG_POSTS_SEARCH_LOADER,
                    payload: false
                })


            }).catch(error => {
                console.log('getPostsSearch error :', error);

                let res = { feed: { entry: [] } };


                dispatch({
                    type: Type.GET_BLOG_POSTS_SEARCH_LOADER,
                    payload: false
                })
            });

        }


    }
}

export const getPostDetails = (url) => {
    return (dispatch) => {

        dispatch({
            type: Type.GET_BLOG_POST_DETAILS_LOADER,
            payload: true
        })
        dispatch({
            type: Type.GET_BLOG_POST_DETAILS,
            payload: null
        })

        BlogServices.getPostDetails(url).then(response => {

            //     console.log('getPostDetails hh response :', response);

            dispatch({
                type: Type.GET_BLOG_POST_DETAILS,
                payload: response
            })
            dispatch({
                type: Type.GET_BLOG_POST_DETAILS_LOADER,
                payload: false
            })


        }).catch(error => {
            console.log('getPostDetails error :', error);
            dispatch({
                type: Type.GET_BLOG_POST_DETAILS_LOADER,
                payload: false
            })
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



