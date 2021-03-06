
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
    ActivityIndicator,
    DatePickerAndroid
} from 'react-native';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as _ from 'lodash';

import { connect } from 'react-redux'
import {
    getPostsSearch
    , getPostDetails
    , getPostComments
    , setselectedPost
} from '../redux/actions'

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
            searchBy: "தேதி",
            searchSwap: false,
            searchStartDate: "",
            searchEndDate: "",
            searchStartDateObj: {},
            searchEndDateObj: {},

            scrollHead: 0,

        }


    }
    componentWillMount() {

        this.props.getPostsSearch("", "clear");

        this.setState({ searchStartDate: moment().format("YYYY-MM-DD") });
        this.setState({ searchEndDate: moment().format("YYYY-MM-DD") });


    }

    pickDate(type) {

        try {

            DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            }).then(({ action, year, month, day }) => {
                if (action === DatePickerAndroid.dateSetAction) {


                    if (type == "start") {
                        let mm = (month + 1) <= 9 ? ("0" + (month + 1).toString()) : (month + 1);
                        let dd = (day) <= 9 ? ("0" + day.toString()) : day;

                        this.setState({ searchStartDate: year + "-" + mm + "-" + dd });
                    }

                    if (type == "end") {
                        let mm = (month + 1) <= 9 ? ("0" + (month + 1).toString()) : (month + 1);
                        let dd = (day) <= 9 ? ("0" + day.toString()) : day;
                        this.setState({ searchEndDate: year + "-" + mm + "-" + dd });
                    }
                    // Selected year, month (0-11), day

                }
                if (action === DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day

                }

            });



        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }


    }

    swapSearch() {

        if (this.state.searchSwap) {
            this.setState({ searchSwap: !this.state.searchSwap });
            this.setState({ searchBy: "தேதி" });
        }
        else {
            this.setState({ searchSwap: !this.state.searchSwap });
            this.setState({ searchBy: "சொல்" });
        }

    }



    gotoPost(item) {

        let postUrlArr = [];
        let postUrl = "";

        postUrlArr = _.filter(item.link, function (o) { return o.rel == "alternate"; });

        if (postUrlArr.length == 0) {
            postUrl = "";
        }
        else {
            postUrl = (postUrlArr[0].href).toString();
        }

        // alert((item.link[4].href).toString());
        this.props.getPostDetails(postUrl);
        this.props.setselectedPost(item);
        Actions.Post({ title: item.title.$t, postInfo: item });
    }

    gotoPostComments(item) {

        // alert((item.link[4].href).toString());
        this.props.getPostComments((item.link[0].href).toString());
        this.props.setselectedPost(item);
        Actions.Comment({ title: item.link[1].title + '-' + item.title.$t, postInfo: item });
    }

    _onChangeText(text) {

        this.setState({ searchQuery: text });

    }

    _search() {

        if (this.state.searchSwap) {
            let searchQueryDate = { startDate: this.state.searchStartDate, endDate: this.state.searchEndDate };
            this.props.getPostsSearch(searchQueryDate, "date");


        }
        else {

            if (this.state.searchQuery.length == 0) {
                alert("Please enter some text");
            }
            else {
                this.props.getPostsSearch(this.state.searchQuery, "text");
            }
        }


    }

    _clearInput() {
        this.setState({ searchQuery: "" });
    }

    sharePost(item) {


        let postUrlArr = [];
        let postUrl = "";

        postUrlArr = _.filter(item.link, function (o) { return o.rel == "alternate"; });

        if (postUrlArr.length == 0) {
            postUrl = "";
        }
        else {
            postUrl = (postUrlArr[0].href).toString();
        }


        //  alert(item.title.$t);

        Share.share({
            message: postUrl + " - " + item.summary.$t + " # Shared via https://play.google.com/store/apps/details?id=com.sivarajnagaraj.blog",
            title: item.title.$t,
            url: postUrl

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
                    {/*this.gotoPost(item)}>*/}
                    <CardTitle title={item.title.$t} subtitle={this.formatDate(item.published.$t) + categoryTerm} color={this.props.theme.color} />
                </TouchableOpacity>
                <CardContent trim={true} text={item.summary.$t.substring(2)} />
                <CardAction seperator={true} inColumn={false}>
                    {/* <CardButton
                        onPress={() => { this._research(item) }}
                        title="குறிப்புகள்"
                        color={'#FF9800'}
                        textColor={'#01579b'}
                        icon="star"
                    /> */}
                    <CardButton
                        onPress={() => { this.sharePost(item) }}
                        title="பகிர்"
                        color={this.props.theme.color}
                        icon="share"
                    />
                    <CardButton
                        onPress={() => Actions.WriteComment({ title: "கருத்து எழுது - " + item.title.$t, postInfo: item })}
                        title={"கருத்து எழுது"}
                        color={this.props.theme.color}
                        icon="edit"
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



        )
    }
    render() {

        return (
            <View style={[styles.container, { backgroundColor: this.props.theme.color }]}>

                {!this.state.searchSwap
                    ? <View style={{ width: deviceWidth }}>
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
                                    <Icon name="close" size={40} color={this.props.theme.color} />
                                </TouchableOpacity>
                                {true
                                    ?
                                    <TouchableOpacity style={styles.searchIconStyle1} onPress={() => this._search()}>
                                        <Icon name="search" size={40} color={this.props.theme.color} />
                                    </TouchableOpacity>

                                    : <View></View>
                                }
                            </View>
                        </View>
                    </View>

                    : <View>


                        <View style={{ width: deviceWidth }}>
                            <View style={styles.searchMainView}>
                                <View style={styles.searchBox}>

                                    <TouchableOpacity onPress={() => this.pickDate('start')}>

                                        <View
                                            style={[styles.searchInputStyle,
                                            commonStyles.opensansSemiBold,
                                            commonStyles.fontSize16, { width: deviceWidth - 225, backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }]}
                                        >
                                            <Text style={{ fontSize: 18, color: '#000000' }}>{this.state.searchStartDate}</Text>
                                            <View style={styles.searchIconStyle3}>
                                                <Icon name="calendar" size={30} color={this.props.theme.color} />
                                            </View>

                                        </View>
                                        <Text style={{ fontSize: 18, color: '#000000', paddingLeft: 5 }}>முதல்</Text>
                                    </TouchableOpacity >


                                    <TouchableOpacity onPress={() => this.pickDate('end')}>

                                        <View
                                            style={[styles.searchInputStyle,
                                            commonStyles.opensansSemiBold,
                                            commonStyles.fontSize16, { width: deviceWidth - 225, backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }]}
                                        >
                                            <Text style={{ fontSize: 18, color: '#000000' }}>{this.state.searchEndDate}</Text>
                                            <View style={styles.searchIconStyle3}>
                                                <Icon name="calendar" size={30} color={this.props.theme.color} />
                                            </View>

                                        </View>
                                        <Text style={{ fontSize: 18, color: '#000000', paddingLeft: 5 }}>வரை</Text>
                                    </TouchableOpacity >


                                    {true
                                        ?
                                        <TouchableOpacity style={styles.searchIconStyle1} onPress={() => this._search()}>
                                            <Icon name="search" size={40} color={this.props.theme.color} />
                                        </TouchableOpacity>

                                        : <View></View>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>

                }
                <View style={{ width: deviceWidth }}>
                    <View style={styles.searchMainView} >
                        <TouchableOpacity onPress={() => this.swapSearch()}>
                            <View style={styles.searchBox}>

                                <View
                                    style={[styles.searchInputStylefromto,
                                    commonStyles.opensansSemiBold,
                                    commonStyles.fontSize18, { width: deviceWidth - 120, height: 30, backgroundColor: '#ffffff', padding: 0 }]}
                                >
                                    <Text style={{ fontSize: 18, color: this.props.theme.color, fontStyle: 'italic', fontWeight: 'bold' }}>{this.state.searchBy} வாரியாக தேட</Text>


                                </View>
                            </View>
                        </TouchableOpacity>
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
                        style={{ paddingRight: 5 }}
                        onScroll={(event) => { this.setState({ scrollHead: event.nativeEvent.contentOffset.y }) }}
                        ref='_scrollView'
                        enableEmptySections={true}
                        dataSource={this.ds.cloneWithRows(this.props.postsSearch.feed.entry)}
                        renderRow={this.renderRow.bind(this)}
                    />
                    : null}

                {this.props.postsSearch.feed
                    ? (this.state.scrollHead > 20
                        ? < TouchableOpacity
                            onPress={() => { this.refs._scrollView.scrollTo({ X: 0, y: 0, animated: true }); }}
                            style={{ position: 'absolute', right: 15, bottom: 15, padding: 0 }} >
                            <Icon name="chevron-circle-up" size={60} color={this.props.theme.color} />
                        </TouchableOpacity> : null

                    )
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
    searchIconStyle3: {
        position: 'absolute',
        //   textAlign: 'right',
        top: 5,
        padding: 0,
        right: 0,
        height: 30,
        width: 30

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
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,


    },
    // searchInputStyle: { height: 48, textAlign: 'left', paddingRight: 20, color: 'rgb(39,39,39)' },
    // searchInputStylefromto: { height: 48, textAlign: 'left', paddingRight: 20, color: 'rgb(39,39,39)' },
    searchInputStyle: { height: 48, paddingRight: 20 },
    searchInputStylefromto: { height: 48, paddingRight: 20 },
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


const mapStateToProps = ({ Blog, Settings }) => {
    console.log('Blog.postsSearch ', Blog.postsSearch);
    return ({
        postsSearch: Blog.postsSearch
        , postSearchLoader: Blog.postSearchLoader
        , theme: Settings.theme
    })
}


export default connect(mapStateToProps, {
    getPostsSearch
    , getPostDetails
    , getPostComments
    , setselectedPost
})(Search)

