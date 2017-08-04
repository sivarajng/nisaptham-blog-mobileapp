
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
    Image,
    Share,
    TextInput,
    ActivityIndicator
} from 'react-native';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux'
import { getPostsSearch, getPostDetails, getPostComments } from '../redux/actions'

import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';


import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class Search extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

        this.state = {
            searchQuery: "",
        }

    }
    componentWillMount() {

    }

    gotoPost(item) {

        // alert((item.link[4].href).toString());
        this.props.getPostDetails((item.link[4].href).toString());
        Actions.Post({ title: item.title.$t });
    }

    gotoPostComments(item) {

        // alert((item.link[4].href).toString());
        this.props.getPostComments((item.link[0].href).toString());
        Actions.Comment({ title: item.link[1].title + '-' + item.title.$t });
    }

    _onChangeText(text) {

        this.setState({ searchQuery: text });

    }

    _search() {

        this.props.getPostsSearch(this.state.searchQuery);

    }

    _clearInput() {
        this.setState({ searchQuery: "" });
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
            if (moment(new Date().getTime()).diff(date, 'days') >= 7) {
                return date.format('MMM D, YYYY');
            }
            return date.fromNow();
        }
        return 'Invalid Date';
    }

    renderRow(item) {

        let commentLink = "Comments";
        if (item.link) {
            commentLink = (item.link[1].title).toString();
        }

        return (


            <Card style={{ width: deviceWidth }}>
                <TouchableOpacity style={{ width: deviceWidth }} onPress={() => this.gotoPost(item)}>
                    <CardTitle title={item.title.$t} subtitle={this.formatDate(item.published.$t)} />
                </TouchableOpacity>
                <CardContent trim={true} text={item.summary.$t.substring(2)} />
                <CardAction seperator={true} inColumn={false}>
                    <CardButton
                        onPress={() => { this.sharePost(item) }}
                        title="Share"
                        color='blue'
                    />
                    <CardButton
                        onPress={() => this.gotoPostComments(item)}
                        title={commentLink}
                        color='blue'
                    />
                </CardAction>
            </Card>



        )
    }
    render() {

        return (
            <View style={styles.container}>

                <View style={{ width: deviceWidth }}>
                    <View style={styles.searchMainView}>
                        <View style={styles.searchBox}>
                            <TextInput
                                autoFocus={true}
                                returnKeyType={'search'}
                                onSubmitEditing={() => this._search()}
                                //  underlineColorAndroid='transparent'
                                onChangeText={(text) => this._onChangeText(text)}
                                value={this.state.searchQuery}
                                placeholder="You want to search"
                                placeholderTextColor='rgb(204,204,204)'
                                style={[styles.searchInputStyle, commonStyles.opensansSemiBold, commonStyles.fontSize16, { width: deviceWidth - 120 }]}
                            />
                            <TouchableOpacity style={styles.closeIconStyle} onPress={() => { this._clearInput() }}>
                                <Image
                                    style={{ width: 40, height: 40 }}
                                    source={{ uri: 'http://closethegapca.org/wp-content/plugins/itro-popup/images/close-icon.png' }} />
                            </TouchableOpacity>
                            {true
                                ?
                                <TouchableOpacity style={styles.searchIconStyle1} onPress={() => this._search()}>
                                    <Image
                                        style={{ width: 40, height: 40 }}
                                        source={{ uri: 'http://www.sabletopia.co.uk/wp-content/uploads/2013/09/256x256xsearch-2561.png.pagespeed.ic.uJb5O-KdTF.png' }} />
                                </TouchableOpacity>

                                : <View></View>
                            }
                        </View>
                    </View>
                </View>

                {this.props.postSearchLoader
                    ? <ActivityIndicator
                        animating={true}
                        color='#01579b'
                        size={60}
                        style={styles.activityIndicator}
                    />
                    : null
                }

                {this.props.postsSearch.feed
                    ? <ListView
                        ref='_scrollView'
                        enableEmptySections={true}
                        dataSource={this.ds.cloneWithRows(this.props.postsSearch.feed.entry)}
                        renderRow={this.renderRow.bind(this)}
                    />
                    : null}

                {this.props.postsSearch.feed
                    ? < TouchableOpacity
                        onPress={() => { this.refs._scrollView.scrollTo({ X: 0, y: 0, animated: true }); }}
               style={{  position: 'absolute', right: 30, bottom: 30, padding: 5 }} >
                        <Icon name="chevron-circle-up" size={60} color="#03A9F4" />
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
        // justifyContent: 'center',
        // alignItems: 'center',
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
    }
    ,













    marginTop0: {
        marginTop: -10,
        marginBottom: 10,
    },
    funkoNews: {
        marginTop: 8,
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 20
    },
    fav: {
        flex: 1,
        paddingVertical: 10
    },
    latestView: {
        backgroundColor: '#fff',
        marginTop: 8,
        flexDirection: 'column'
    },
    bgColor: {
        backgroundColor: '#fff',
    },
    favourite: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10

    },
    searchView: {
        flex: 1,

    },
    paddingLeft10: {
        paddingLeft: 10
    },
    paddingRight10: {
        paddingRight: 10
    },
    searchMain1: {
        flex: 4,
        //  alignItems:'center',
        justifyContent: 'center',

        // width:device.width,

    },
    searchBox1: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(7,124,229)',
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,





    },
    searchInputStyle1: { height: 48, textAlign: 'center', paddingRight: 20, color: 'rgb(39,39,39)' },
    searchIconStyle1: {
        position: 'absolute',
        top: 0,
        padding: 0,
        right: 0,
        height: 40,
        width: 40

    },
    closeIconStyle: {
        position: 'absolute',
        top: 0,
        padding: 0,
        right: 40,
        height: 40,
        width: 40

    },
    searchBox: {
        position: 'relative',
        //    borderBottomWidth: 1,
        //   borderBottomColor: 'rgb(7,124,229)',
        backgroundColor: '#fff',
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,


    },
    searchInputStyle: { height: 48, textAlign: 'left', paddingRight: 20, color: 'rgb(39,39,39)' },
    searchIconStyle: {
        position: 'absolute',
        top: 10,
        right: -5,
        padding: 10,



    },
    searchMainView: {
        backgroundColor: '#fff',
        paddingVertical: 10
    },
});


const mapStateToProps = ({ Blog }) => {
    console.log('Blog.postsSearch ', Blog.postsSearch);
    return ({
        postsSearch: Blog.postsSearch,
        postSearchLoader: Blog.postSearchLoader
    })
}


export default connect(mapStateToProps, { getPostsSearch, getPostDetails, getPostComments })(Search)

