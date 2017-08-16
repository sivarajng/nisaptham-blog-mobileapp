import { NetInfo, Alert } from 'react-native';
import CONFIG from '../configs';
import axios from 'axios';

NetInfo.isConnected.fetch().then(isConnected => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});

function handleFirstConnectivityChange(isConnected) {
    console.log('Then, is ' + (isConnected));

    if (isConnected === false) {
        Alert.alert(
            'No Internet Connection',
            'Please check your connection and try again.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }
}
NetInfo.isConnected.addEventListener(
    'change',
    handleFirstConnectivityChange
);

getPost = () => {


}

class BlogServices {

    categoryFilter = "";
    constructor() {


    }

    setCategoryFilter(value) {
        this.categoryFilter = value;
    }
    getCategoryFilter() {
        return this.categoryFilter;
    }

    getStatus(response) {
        if ((response.status >= 200 && response.status <= 300) || response.status === 0) {
            console.log('ddddddddddd', response);
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }

    parseJson(response) {
        return response.json();
    };

    parseResponse(response) {
        return response;
    };
    parseText(response) {
        return response.text();
    };


    getPosts(offset = 0, type = "GET") {
        let url = CONFIG.BLOG_BASE_URL_MAX_LIMIT + "&start-index=" + (offset + 1);

    
        return fetch(url, {
            method: type,
        }).then(this.getStatus)
            .then(this.parseJson);
    }

    getCategoryPosts(type = "GET") {

        let url = CONFIG.BLOG_BASE_URL_CATEGORY_FILTER + this.getCategoryFilter() + "?alt=json";

        console.log("getCategoryPosts URL ", url);
        return fetch(url, {
            method: type,
        }).then(this.getStatus)
            .then(this.parseJson);
    }

    getPostsSearch(query = "", queryType = "text", type = "GET") {

        let url = CONFIG.BLOG_BASE_URL_QUERY + query;

        if (queryType == "date") {

            url = CONFIG.BLOG_BASE_URL_QUERY_DATE + "published-min=" + query.startDate + "T00:00:00&published-max=" + query.endDate + "T23:59:59";


        }

        console.log('== SERACH URL ==', url);
        return fetch(url, {
            method: type,
        }).then(this.getStatus)
            .then(this.parseJson);
    }

    getPostDetails(url, type = "GET") {

        return fetch(url)
            .then(this.getStatus)
            .then(this.parseText);
    }

    getPostComments(url, type = "GET") {

        return fetch(url + '?alt=json')
            .then(this.getStatus)
            .then(this.parseJson);
    }

    getCategoryList(url, type = "GET") {

        return fetch(CONFIG.BLOG_BASE_URL_CATEGORY_LIST)
            .then(this.getStatus)
            .then(this.parseJson);
    }

    // Performing a GET request
    // return axios.get(url)
    //     .then(this.getStatus)
    //     .then(this.parseResponse);


    //        // url='http://www.nisaptham.com/2017/08/blog-post_2.html';
    //         return fetch(url).then(function(data) {
    //   console.log('kkkkk',data.text())
    //     })
    //   .catch(function(error) {

    //   });   

}

export default new BlogServices();