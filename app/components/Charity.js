
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
    ActivityIndicator,
    ScrollView
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import moment from 'moment';

import { connect } from 'react-redux'
import { getPosts, getPostDetails, getPostComments } from '../redux/actions'

import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class Charity extends Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
        this.state = {
            scrollHead: 0,
            charityData: [
                { key: "Account Number", value: " 05520200007042" }
                , { key: "Account Holder Name", value: " Nisaptham Trust" }
                , { key: "Account Type", value: " Current" }
                , { key: "Bank ", value: " Bank Of Baroda" }
                , { key: "State ", value: " Tamil Nadu" }
                , { key: "District ", value: " Erode" }
                , { key: "Branch ", value: " Nambiyur" }
                , { key: "IFSC Code ", value: " BARB0NAMBIY (5th character is zero)" }
                , { key: "SWIFT Code", value: " BARBINBBCOI" }
                , { key: "Branch Code ", value: " NAMBIY (Last 6 Characters of the IFSC Code)" }
                , { key: "City ", value: " Nambiyur" }
            ]






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

    HS() {



        return (

            StyleSheet.create({
                div: {
                    fontSize: this.props.fontSize,
                    color: this.props.nightMode ? '#ffffff' : '#000000',
                    backgroundColor: !this.props.nightMode ? '#ffffff' : '#022231',
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

            })


        )
    }

    renderRow(item) {

        return (
            <Card style={{ width: deviceWidth }}>
                <CardContent trim={false}>
                    <View>
                        <Text>
                            {item.key + " : " + item.value}
                        </Text>
                    </View>
                </CardContent>
            </Card>
        )
    }

    renderFooter() {

        return (
            <TouchableOpacity
                onPress={() => Actions.WriteComment({ title: "கருத்து எழுது - " + this.props.postInfo.title.$t, postInfo: this.props.postInfo })}

                style={{ padding: 5, margin: 0, backgroundColor: this.props.theme.color, borderColor: '#ffffff', borderWidth: 2, borderRadius: 0, width: deviceWidth }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                    <Icon name="edit" size={30} color="#ffffff" />
                    <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                        கருத்து எழுது
          </Text>
                </View>
            </TouchableOpacity>
        )

    }


    render() {
        console.log('lllllllll ', this.props.postComments);
        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>

              <ScrollView>
                <ListView style={{ paddingRight: 5, marginRight: 5 }}
                    onScroll={(event) => { this.setState({ scrollHead: event.nativeEvent.contentOffset.y }) }}
                    ref='_scrollView'
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.state.charityData)}
                    renderRow={this.renderRow.bind(this)}

                />
                </ScrollView>
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
});


const mapStateToProps = ({ Blog, Settings }) => {
    console.log('Blog.postComments ', Blog.postComments);
    return ({
        postComments: Blog.postComments,
        theme: Settings.theme,
        fontSize: Settings.fontSize,
        nightMode: Settings.nightMode
    })
}


export default connect(mapStateToProps, {})(Charity)

