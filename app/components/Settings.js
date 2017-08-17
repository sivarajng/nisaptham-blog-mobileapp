
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
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import LocalStorage from '../services/localStorage'

import { connect } from 'react-redux'
import { getPosts, getPostDetails, getPostComments, setfontSize ,setNightMode} from '../redux/actions'

import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class Settings extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

    }
    componentWillMount() {

    }

    _setfontSize(size) {
        this.props.setfontSize(size);
    }


    render() {

        return (
            <View style={[styles.container, { backgroundColor: this.props.theme.color }]}>

                <View style={{ position: 'absolute', top: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: !this.props.nightMode ? '#ffffff':'#022231', width: deviceWidth }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 200 }}>
                            <TouchableOpacity style={{ padding: 30 }} onPress={() => { }}>
                                <Text style={{ fontSize: this.props.fontSize, color: this.props.nightMode ? '#ffffff':'#000000' }}>
                                    அகர முதல எழுத்தெல்லாம் ஆதி
                                </Text>
                                <Text style={{ fontSize: this.props.fontSize, color: this.props.nightMode ? '#ffffff':'#000000' }}>
                                    பகவன் முதற்றே உலகு
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: !this.props.nightMode ? '#ffffff':'#022231',  }}>
                        <View style={{ borderWidth: 2, borderColor: '#9e9e9e', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                            <TouchableOpacity style={{ padding: 30 }} onPress={() => { this._setfontSize(18) }}>
                                <Text style={{ fontSize: 18, color: this.props.nightMode ? '#ffffff':'#000000' }}>அ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#9e9e9e', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                            <TouchableOpacity style={{ padding: 30 }} onPress={() => { this._setfontSize(22) }}>
                                <Text style={{ fontSize: 22, color: this.props.nightMode ? '#ffffff':'#000000' }}>அ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#9e9e9e', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                            <TouchableOpacity style={{ padding: 30 }} onPress={() => { this._setfontSize(26) }}>
                                <Text style={{ fontSize: 26, color: this.props.nightMode ? '#ffffff':'#000000' }}>அ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#9e9e9e', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                            <TouchableOpacity style={{ padding: 30 }} onPress={() => { this._setfontSize(30) }}>
                                <Text style={{ fontSize: 30, color: this.props.nightMode ? '#ffffff':'#000000' }}>அ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.props.setNightMode(false) }}
                            style={{ padding: 12, margin: 5, backgroundColor: '#ffffff', borderColor: '#022231', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                                <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 18, paddingLeft: 0 }}>
                                    பகல்
                            </Text>
                                {!this.props.nightMode
                                    ? <Icon name="check-circle" size={30} color="#022231" style={{ position: 'absolute', right: 0 }} />
                                    : null}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                               onPress={() => { this.props.setNightMode(true) }}
                            style={{ padding: 12, margin: 5, backgroundColor: '#022231', borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                                <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 18, paddingLeft: 0 }}>
                                    இரவு
                            </Text>
                               {this.props.nightMode
                                    ? <Icon name="check-circle" size={30} color="#ffffff" style={{ position: 'absolute', right: 0 }} />
                                    : null}
                            </View>
                        </TouchableOpacity>
                        <View style={{height:5}}>
                         </View>
                       
                        <TouchableOpacity
                               onPress={() => { LocalStorage.clear();alert('success')}}
                            style={{ padding: 12, margin: 10, backgroundColor: this.props.theme.color, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 14, paddingLeft: 0 }}>
                                    அமைப்புகளை மீட்டமைக்கவும்
                            </Text>
                             
                                   <Icon name="reply-all" size={30} color="#ffffff" style={{ position: 'absolute', right: 0 }} />
                                  
                            </View>
                        </TouchableOpacity>
                    </View>





                </View>



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
        theme: Settings.theme,
        fontSize: Settings.fontSize,
        nightMode: Settings.nightMode
    })
}


export default connect(mapStateToProps, { setfontSize ,setNightMode})(Settings)

