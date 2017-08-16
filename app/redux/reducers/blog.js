import Type from '../actionTypes'
var DOMParser = require('react-native-html-parser').DOMParser;
var XMLSerializer = require('react-native-html-parser').XMLSerializer;

import BlogServices from '../../services/blog';

import * as _ from 'lodash';

const Blog = (state = {}, { type, payload }) => {

    switch (type) {

        case Type.GET_BLOG_POSTS:
            return { ...state, posts: payload }

        case Type.TOGGLE_POST_WEBVIEW:
            return { ...state, postWebview: !state.postWebview }

        case Type.GET_BLOG_POSTS_LOADMORE:

            let posts = state.posts;

            posts.feed.entry = [...posts.feed.entry,...payload.feed.entry];

            console.log("TOTALLL ",posts);

            return { ...state, posts: posts }

        case Type.POPUP:
            return { ...state, popup: payload }

        case Type.GET_BLOG_POST_CATEGORY_POSTS:
            return { ...state, categoryPosts: payload }

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

        case Type.GET_BLOG_POST_CATEGORY_LIST:

            let categoryList = payload;
            categoryList = categoryList.map((item) => {
                item.isSelected = false;
                return item;
            });

            if (categoryList.length > 0) {
                categoryList[0].isSelected = true;
                 BlogServices.setCategoryFilter("/" + categoryList[0].term);
            }


            return { ...state, categoryList }

        case Type.GET_BLOG_POST_CATEGORY_SELECT:


            BlogServices.setCategoryFilter("/" + payload);

            let categoryListSelect = state.categoryList;

            categoryListSelect = categoryListSelect.map((item) => {
                if (item.term == payload) {
                    item.isSelected = true;
                }
                else {
                    item.isSelected = false;
                }
                return item;
            });

            return { ...state, categoryList: categoryListSelect }

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