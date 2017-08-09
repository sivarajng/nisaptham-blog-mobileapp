import Type from '../actionTypes'
var DOMParser = require('react-native-html-parser').DOMParser;
var XMLSerializer = require('react-native-html-parser').XMLSerializer;

import * as _ from 'lodash';

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

        case Type.GET_BLOG_POST_CATEGORY_LIST:

            let categoryList = payload;

            categoryList = categoryList.map((item) => {
                item.isSelected = false;
                return item;
            });

            return { ...state, categoryList }

        case Type.GET_BLOG_POST_CATEGORY_SELECT:

            let categoryListSelect = state.categoryList;

            let idxS = _.findIndex(categoryListSelect, { term: payload });

            if (idxS > -1) {
                categoryListSelect[idxS].isSelected = true;
                console.log('SLECTED ',categoryListSelect[idxS]);
            }

            return { ...state, categoryList: categoryListSelect }

        case Type.GET_BLOG_POST_CATEGORY_UNSELECT:

            let categoryListUnselect = state.categoryList;

            let idxUS = _.findIndex(categoryListUnselect, { term: payload });

            if (idxS > -1) {
                categoryListUnselect[idxUS].isSelected = false;
                console.log('UN SLECTED ',categoryListUnselect[idxS]);
            }

            return { ...state, categoryList: categoryListUnselect }

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