
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    ActivityIndicator,
    RefreshControl,

} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import BlogServices from '../services/blog';
import moment from 'moment';
import { connect } from 'react-redux'
import {
    getPosts
    , getPostDetails
    , getPostComments
    , getCategoryList
    , setselectedPost
} from '../redux/actions'

import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';


import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class CategoryPosts extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
        this.state = {
            refreshing: false,

            scrollHead: 0,

        };
    }

    componentWillUnmount() {

    }

    componentDidMount() {

    }
    componentWillMount() {
        this.props.getCategoryList();
        this.props.getPosts();


    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.props.getPosts("refresh");
        // fetchData().then(() => {
        //   this.setState({ refreshing: false });
        // });
    }

    gotoPost(item) {

        // alert((item.link[4].href).toString());
        this.props.getPostDetails((item.link[4].href).toString());
        this.props.setselectedPost(item);
        Actions.Post({ title: item.title.$t, postInfo: item });
    }

    gotoPostComments(item) {

        // alert((item.link[4].href).toString());
        this.props.getPostComments((item.link[0].href).toString());
        Actions.Comment({ title: item.link[1].title + '-' + item.title.$t });
    }

    _gotoSearch() {

        // alert((item.link[4].href).toString());
        //  this.props.getPostComments((item.link[0].href).toString());
        Actions.Search({ title: 'Search' });
    }

    sharePost(item) {

        //  alert(item.title.$t);

        Share.share({
            message: (item.link[4].href).toString() + " - " + item.summary.$t,
            title: item.title.$t,
            url: (item.link[4].href).toString()

        }, {
                dialogTitle: item.title.$t,
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ],
                tintColor: 'green'
            })



    }

    formatDate(dateString) {
        var date = moment(dateString);
        if (date.isValid()) {
            if (moment(new Date().getTime()).diff(date, 'days') >= 4) {
                return date.format('MMM D, YYYY');
            }
            return date.fromNow();
        }
        return 'Invalid Date';
    }

    _research(item) {

        Actions.Research({ postInfo: item, title: "குறிப்புகள் : " + item.title.$t });

    }

    renderRow(item) {

        let commentLink = "";
        if (item.link) {
            if (item.link.length > 1) {
                if (item.link[1].title) {
                    commentLink = (item.link[1].title).toString();
                }

            }

        }
        commentLink = commentLink.toLowerCase().replace("comments", "கருத்துக்கள்");

        let categoryTerm = "";
        if (item.category) {
            categoryTerm = " - " + item.category[0].term;
        }



        return (


            <Card style={{ width: deviceWidth }}>
                <TouchableOpacity style={{ width: deviceWidth }} onPress={() => this.gotoPost(item)}>
                    <CardTitle title={item.title.$t} subtitle={this.formatDate(item.published.$t) + categoryTerm} color={this.props.theme.color} />
                </TouchableOpacity>
                <CardContent trim={true} text={item.summary.$t.substring(2)} />
                <CardAction seperator={true} inColumn={false}>
                    <CardButton
                        onPress={() => { this._research(item) }}
                        title="குறிப்புகள்"
                        color={'#FF9800'}
                        textColor={'#01579b'}
                        icon="star"
                    />
                    <CardButton
                        onPress={() => { this.sharePost(item) }}
                        title="பகிர்"
                        color={this.props.theme.color}
                        icon="share"
                    />
                    {commentLink != ""
                        ? <CardButton
                            onPress={() => this.gotoPostComments(item)}
                            title={commentLink}
                            color={this.props.theme.color}
                            icon="comment"
                        />
                        : null
                    }
                </CardAction>
            </Card>


            // <TouchableOpacity onPress={() => this.gotoPost(item)}>
            //   <Card>
            //     <CardSection>
            //       <View >
            //         <Text style={{
            //           color: '#0d47a1'
            //           , fontSize: 20
            //           , fontWeight: 'bold'

            //         }}>{item.title.$t}</Text>
            //       </View>
            //       <View style={{ paddingTop: 4 }}>
            //         <Text numberOfLines={3} >
            //           {item.summary.$t.substring(2)}
            //         </Text>
            //       </View>

            //     </CardSection>
            //   </Card>
            // </TouchableOpacity>
        )
    }
    render() {

        return (
            <View style={[styles.container, { backgroundColor: this.props.theme.color }]}>





                {this.props.categoryPosts.feed
                    ? <ListView style={{ paddingRight: 5 }}
                        ref='_scrollView'
                        onScroll={(event) => { this.setState({ scrollHead: event.nativeEvent.contentOffset.y }) }}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.postsRefresh}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        enableEmptySections={true}
                        dataSource={this.ds.cloneWithRows(this.props.categoryPosts.feed.entry)}
                        renderRow={this.renderRow.bind(this)}
                    />
                    :
                    <ActivityIndicator
                        animating={true}
                        color='#01579b'
                        size={60}
                        style={styles.activityIndicator}
                    />

                }
                {this.state.scrollHead > 20
                    ?
                    <TouchableOpacity
                        onPress={() => { this.refs._scrollView.scrollTo({ X: 0, y: 0, animated: true }); }}
                        style={{ position: 'absolute', right: 15, bottom: 15, padding: 0 }} >
                        <Icon name="chevron-circle-up" size={60} color={this.props.theme.color} />
                    </TouchableOpacity>
                    : null
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    title: {
        fontSize: 38,
        backgroundColor: 'transparent'
    },
    button: {
        marginRight: 10
    },

    activityIndicator: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: 80
    }
});


const mapStateToProps = ({ Blog, Settings }) => {
    console.log('Blog.categoryPosts ', Blog.categoryPosts);
    return ({
        categoryPosts: Blog.categoryPosts
        , postsRefresh: Blog.postsRefresh
        , theme: Settings.theme
    })
}


export default connect(mapStateToProps, {
    getPosts
    , getPostDetails
    , getPostComments
    , getCategoryList
    , setselectedPost
})(CategoryPosts)

