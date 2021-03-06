
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
    Image,
    ScrollView,
    Linking
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import moment from 'moment';


import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux'
import { getPosts, getPostDetails, getPostComments } from '../redux/actions'

import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class Contact extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

    }
    componentWillMount() {

    }

    sendEmail(url = 'mailto:vaamanikandan@gmail.com') {
      
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                Linking.openURL(url)
                    .catch(err => {
                        if (url.includes('telprompt')) {
                            // telprompt was cancelled and Linking openURL method sees this as an error
                            // it is not a true error so ignore it to prevent apps crashing
                            // see https://github.com/anarchicknight/react-native-communications/issues/39
                        } else {
                            console.warn('openURL error', err)
                        }
                    });
            }
        }).catch(err => console.warn('An unexpected error happened', err));
    };



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
            <View style={[styles.container, { backgroundColor: this.props.theme.color }]}>


                <ScrollView>
                    <TouchableOpacity
                        onPress={() => this.sendEmail()}
                        style={{ padding: 12, margin: 10, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <MIcon name="email" size={30} color="#ffffff" />
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                மின்னஞ்சல் : vaamanikandan@gmail.com
                       </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { alert("9741474202") }}
                        style={{ padding: 12, margin: 10, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Icon name="whatsapp" size={30} color="#ffffff" />
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                               { 'Whatsapp (Only Text) : \n9741474202 '}
                       </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => { Actions.Sarahah() }}
                        style={{ padding: 12, margin: 10, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <MIcon name="chat" size={30} color="#ffffff" />
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                Sarahah
                       </Text>
                        </View>
                    </TouchableOpacity>


                </ScrollView>






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
    console.log('Blog.postComments ', Blog.postComments);
    return ({
        postComments: Blog.postComments,
        theme: Settings.theme
    })
}


export default connect(mapStateToProps, {})(Contact)

