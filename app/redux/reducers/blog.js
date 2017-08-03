import Type from '../actionTypes'
var DOMParser = require('react-native-html-parser').DOMParser;
var XMLSerializer = require('react-native-html-parser').XMLSerializer;

const Blog = (state = {}, { type, payload }) => {

    switch (type) {

        case Type.GET_BLOG_POSTS:
            return { ...state, posts: payload }

        case Type.GET_BLOG_POST_DETAILS:
         //   let hh = payload.replace(/(?:\r\n|\r|\n)/g, ' ');
         let hh = payload;

             hh = new DOMParser().parseFromString(hh,'text/html');

            //  console.log("hhh rawwwwww ", hh);
            // console.log("hhh PARSED ",  (hh.getElementByClassName('post-body entry-content')));
            let jjj = new XMLSerializer().serializeToString(hh.getElementByClassName('post-body entry-content'));
            console.log('HHH TEXTTTTTTTTTTT ', jjj.toString());
            // hh = hh.replace(/(?:\r\n|\r|\n)/g, ' ');
            // hh = hh.replace('attrName', ' ');
            // //   console.log("hhh rawwwwww ", hh);
            // hh = hh.substring(hh.indexOf('<body'));
            // hh = hh.substring(0, (hh.indexOf('</body>') + 7));
            // console.log("hhh CONVERT ", jjj.toString());


            return { ...state, postDetails: jjj.toString() }

        default:
            return state;
    }

}

export { Blog } 