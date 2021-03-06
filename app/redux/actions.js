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

export const setWelcome = () => {
    return (dispatch) => {
        dispatch({
            type: Type.SET_WELCOME            
        })
    }
}
export const setTheme = (theme) => {
    return (dispatch) => {
        dispatch({
            type: Type.SET_THEME,
            payload: theme
        })
    }
}
export const setfontSize = (size) => {
    return (dispatch) => {
        dispatch({
            type: Type.SET_FONTSIZE,
            payload: size
        })
    }
}
export const setNightMode = (value) => {
    return (dispatch) => {
        dispatch({
            type: Type.SET_NIGHTMODE,
            payload: value
        })
    }
}
export const togglePostWebview = () => {
    return (dispatch) => {
        dispatch({
            type: Type.TOGGLE_POST_WEBVIEW
            
        })
    }
}


export const getPosts = (mode = "", offset = 0) => {
    return (dispatch) => {

        if (mode == "refresh") {
            dispatch({
                type: Type.GET_BLOG_POSTS_REFRESH,
                payload: true
            })
        }

        BlogServices.getPosts(offset).then(response => {

            console.log('getPosts response :', response);


            if (offset > 0) {
                dispatch({
                    type: Type.GET_BLOG_POSTS_LOADMORE,
                    payload: response
                })

            } else {
                dispatch({
                    type: Type.GET_BLOG_POSTS,
                    payload: response
                })

            }

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

export const getCategoryPosts = (mode = "") => {
    return (dispatch) => {

        if (mode == "refresh") {
            dispatch({
                type: Type.GET_BLOG_POSTS_REFRESH,
                payload: true
            })
        }

        BlogServices.getCategoryPosts().then(response => {

            console.log('getCategoryPosts response :', response);


            if (response.feed.entry) {
            }
            else {
                response.feed.entry = [];

            }

            dispatch({
                type: Type.GET_BLOG_POST_CATEGORY_POSTS,
                payload: response
            })
            dispatch({
                type: Type.GET_BLOG_POSTS_REFRESH,
                payload: false
            })


        }).catch(error => {
            console.log('getCategoryPosts error :', error);
            dispatch({
                type: Type.GET_BLOG_POST_CATEGORY_POSTS,
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
export const togglePostPopup = (value) => {
    return (dispatch) => {

        dispatch({
            type: Type.POST_POPUP,
            payload: value
        })
    }
}
export const setselectedPost = (item) => {
    return (dispatch) => {

        dispatch({
            type: Type.SET_SELECTED_POST,
            payload: item
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



