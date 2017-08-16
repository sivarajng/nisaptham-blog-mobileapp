
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
    ScrollView
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import Icon from 'react-native-vector-icons/FontAwesome';


import moment from 'moment';

import { connect } from 'react-redux'
import { setTheme } from '../redux/actions'

import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class Theme extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

        this.state = {

            themes: [

                { name: "Kurinji", color: "#757575" },
                { name: "Mullai", color: "#009688" },
                { name: "Marudham", color: "#4caf50" },
                { name: "Neidhal", color: "#2196f3" },
                { name: "Paalai", color: "#795548" },
                { name: "Red", color: "#f44336" }



            ]

        }
    }
    componentWillMount() {

    }

    _setTheme(index) {
        this.props.setTheme(this.state.themes[index]);
    }




    render() {

        return (
            <View style={[styles.container, { backgroundColor: '#ffffff' }]}>


                <ScrollView>


                    <TouchableOpacity
                        onPress={() => {this._setTheme(0) }}
                        style={{ padding: 12, margin: 10, backgroundColor: this.state.themes[0].color, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 40 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                {this.state.themes[0].name}
                            </Text>
                             {this.props.theme.color == this.state.themes[0].color
                                ? <Icon name="check-circle" size={30} color="#ffffff" style={{ position: 'absolute', right: 0 }} />
                                : null}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                          onPress={() => {this._setTheme(1) }}
                        style={{ padding: 12, margin: 10, backgroundColor: this.state.themes[1].color, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 40 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                {this.state.themes[1].name}
                            </Text>
                             {this.props.theme.color == this.state.themes[1].color
                                ? <Icon name="check-circle" size={30} color="#ffffff" style={{ position: 'absolute', right: 0 }} />
                                : null}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                          onPress={() => {this._setTheme(2) }}
                        style={{ padding: 12, margin: 10, backgroundColor: this.state.themes[2].color, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 40 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                {this.state.themes[2].name}
                            </Text>
                             {this.props.theme.color == this.state.themes[2].color
                                ? <Icon name="check-circle" size={30} color="#ffffff" style={{ position: 'absolute', right: 0 }} />
                                : null}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                          onPress={() => {this._setTheme(3) }}
                        style={{ padding: 12, margin: 10, backgroundColor: this.state.themes[3].color, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 40 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                {this.state.themes[3].name}
                            </Text>
                            {this.props.theme.color == this.state.themes[3].color
                                ? <Icon name="check-circle" size={30} color="#ffffff" style={{ position: 'absolute', right: 0 }} />
                                : null}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                           onPress={() => {this._setTheme(4) }}
                        style={{ padding: 12, margin: 10, backgroundColor: this.state.themes[4].color, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 40 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                {this.state.themes[4].name}
                            </Text>
                             {this.props.theme.color == this.state.themes[4].color
                                ? <Icon name="check-circle" size={30} color="#ffffff" style={{ position: 'absolute', right: 0 }} />
                                : null}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this._setTheme(5) }}
                        style={{ padding: 12, margin: 10, backgroundColor: this.state.themes[5].color, borderColor: '#ffffff', borderWidth: 2, borderRadius: 50, width: deviceWidth - 50 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 40 }}>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                {this.state.themes[5].name}
                            </Text>
                            {this.props.theme.color == this.state.themes[5].color
                                ? <Icon name="check-circle" size={30} color="#ffffff" style={{ position: 'absolute', right: 0 }} />
                                : null}
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


const mapStateToProps = ({ Settings }) => {

    console.log("Settings.theme ",Settings.theme)
    return ({
        theme: Settings.theme
    })
}


export default connect(mapStateToProps, { setTheme })(Theme)

