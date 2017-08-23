
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
    Share,
    Platform,
    ScrollView,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import moment from 'moment';

import BlogServices from '../services/blog';

import { connect } from 'react-redux'
import {
    getPosts
    , getPostDetails
    , getPostComments
    , getCategoryList
    , selectCategory
    , getCategoryPosts
} from '../redux/actions'

import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';
import { Buttons, Label } from './common';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class CategorySelect extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

    }
    componentWillMount() {
        this.props.getCategoryList();
        BlogServices.setCategoryFilter("");
    }

    _selectCategory(item) {
        if (!item.isSelected) {
            this.props.selectCategory(item.term);
        }
    }

    _gotoCategoryPosts() {

        this.props.getCategoryPosts();
        Actions.CategoryPosts({ title: BlogServices.getCategoryFilter().substring(1) });

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
        Actions.Post({ title: item.title.$t });
    }

    gotoPostComments(item) {

        // alert((item.link[4].href).toString());
        this.props.getPostComments((item.link[0].href).toString());
        Actions.Comment({ title: 'Comments :' + item.title.$t });
    }

    sharePost(item) {

        //  alert(item.title.$t);

        Share.share({
            message: (item.link[4].href).toString() + " - " + item.summary.$t + " # Shared via https://play.google.com/store/apps/details?id=com.sivarajnagaraj.blog",
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

    renderRow(item) {

        let categoryTerm = "";
        if (item.category) {
            categoryTerm = " - " + item.category[0].term;
        }

        console.log('postComments items ', item)
        return (


            <Card style={{ width: deviceWidth }}>
                <TouchableOpacity style={{ width: deviceWidth }} >
                    <CardTitle title={item.author[0].name.$t} subtitle={this.formatDate(item.published.$t) + categoryTerm} />
                </TouchableOpacity>
                <CardContent trim={false}>
                    <HTMLView value={item.content.$t} stylesheet={htmlStyles} />
                </CardContent>

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
            <View style={styles.container}>
                <ScrollView>
                    <View style={[commonStyles.flex4, commonStyles.directionRow, commonStyles.alignCenter, commonStyles.wrapFlex, { justifyContent: 'center' }]}>
                        {this.props.categoryList.map((itm) => {
                            return (
                                <Buttons
                                    key={itm.term}
                                    buttonClick={() => this._selectCategory(itm)}
                                    buttonStyle={itm.isSelected ? [commonStyles.btnViewStyleSelected, { backgroundColor: this.props.theme.color, borderColor: this.props.theme.color }] : [commonStyles.btnViewStyleUnselected, { borderColor: this.props.theme.color }]}>
                                    <Label
                                        textContent={itm.term}
                                        textstyle={itm.isSelected ? commonStyles.selectedBtnTxtStyle : [commonStyles.unselectedBtnTxtStyle, { color: this.props.theme.color }]}
                                    />
                                </Buttons>
                            )
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this._gotoCategoryPosts()}>
                    <View
                        style={{ width: deviceWidth, padding: 0 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: this.props.theme.color,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10,
                            }} >
                                <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 26, paddingRight: 20 }}>
                                    பதிவுகளைப் பார்க்க
                            </Text>
                                <Icon name="arrow-circle-o-right" size={40} color="#ffffff" />

                            </View >
                        </View>
                    </View>
                </TouchableOpacity>





            </View >
        );
    }
}

var htmlStyles = StyleSheet.create({
    div: {
        fontSize: 20,
        color: 'rgb(65,64,66)',
        backgroundColor: '#ffffff',
    },
    img: {
        width: 300,
        borderWidth: 20,
        borderColor: 'red',
        width: 10,
    },
    a: {
        fontSize: 20,
        color: '#0000ff',
    },
    p: {
        fontSize: 12,
        color: 'rgb(65,64,66)',
        marginTop: 40
    },
    h1: {
        fontSize: 18,
        color: 'rgb(65,64,66)',
        fontFamily: (Platform.OS === 'ios') ? 'Gotham-Bold' : 'gothambold',

    }, h2: {
        fontSize: 18,
        color: 'rgb(65,64,66)',
        fontFamily: (Platform.OS === 'ios') ? 'Gotham-Bold' : 'gothambold',

    }, h3: {
        fontSize: 18,
        color: 'rgb(65,64,66)',
        fontFamily: (Platform.OS === 'ios') ? 'Gotham-Bold' : 'gothambold',

    }, h4: {
        fontSize: 18,
        color: 'rgb(65,64,66)',
        fontFamily: (Platform.OS === 'ios') ? 'Gotham-Bold' : 'gothambold',

    }, h5: {
        fontSize: 18,
        color: 'rgb(65,64,66)',
        fontFamily: (Platform.OS === 'ios') ? 'Gotham-Bold' : 'gothambold',

    }, h6: {
        fontSize: 18,
        color: 'rgb(65,64,66)',
        fontFamily: (Platform.OS === 'ios') ? 'Gotham-Bold' : 'gothambold',

    },
    titleText1: {
        color: 'rgb(65,64,66)',
        fontSize: 12,
        fontFamily: (Platform.OS === 'ios') ? 'Gotham-Medium' : 'gothammedium',
        paddingBottom: 14,
        lineHeight: 22,
    },
    paraGraphText: {
        fontSize: 12,
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans' : 'opensans-regular',
        color: 'rgb(65,64,66)',
        paddingBottom: 14,
        lineHeight: 18
    },

    titleText: {
        fontFamily: (Platform.OS === 'ios') ? 'Gotham-Bold' : 'gothambold',
        color: 'rgb(65,64,66)',
        fontSize: 12,
        paddingBottom: 16,
        paddingTop: 14,
        textAlign: 'left'

    },
    padding20: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        backgroundColor: 'rgb(21,147,204)'
    },
    headerClose: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold'
    },
    headerLogin: {
        fontSize: 12,
        alignSelf: 'center',
        color: 'rgb(255,255,255)',
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans-Semibold' : 'opensanssemibold',
        lineHeight: 22
    },
    headerDummyClose: {
        color: 'rgb(21,147,204)'
    },

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
});


const mapStateToProps = ({ Blog, Settings }) => {
    console.log('Blog.categoryList ', Blog.categoryList);
    return ({
        postComments: Blog.postComments,
        categoryList: Blog.categoryList,
        posts: Blog.posts,
        theme: Settings.theme,
    })
}


export default connect(mapStateToProps, {
    getCategoryList
    , selectCategory
    , getCategoryPosts
})(CategorySelect)

