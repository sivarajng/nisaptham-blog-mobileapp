
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
    ActivityIndicator
} from 'react-native';

import axios from 'axios';
import * as _ from 'lodash';

import { connect } from 'react-redux'
import { getPosts, getPostDetails, getPostComments } from '../redux/actions'
import { Buttons, Label } from './common';
import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class Research extends Component {

    constructor(props) {
        super(props);
        this.state = {
            research: null,
            types: null,
            url: "http://nisaptham.herokuapp.com/get?key=sivista&postId=",
        }

    }
    componentWillMount() {


        let postId = this.props.postInfo.id.$t.substring(this.props.postInfo.id.$t.indexOf('post-') + 5);
        let _this = this;
        console.log();
        axios.get(this.state.url + postId)
            .then(function (response) {
                console.log("NAT API", response.data);

                response.data.entities = _.uniqWith(response.data.entities, _.isEqual);

                let types = _.uniqBy(response.data.entities, 'type');
                let typesArray = [];
                _.map(types, (itm) => {
                    typesArray.push(itm.type);
                })

                console.log("_____________", typesArray);
                console.log("_____________", response.data);
                _this.setState({ research: { all: response.data, types: typesArray } });
                _this.setState({ types: types });
            })
            .catch(function (error) {
                console.log("NAT API ERR", error);
                 _this.setState({ research: { all: {entities:[{name:error,type:"ERROR"}]}, types: ["ERROR"] } });
            });


    }

    alt() {

        let postId = this.props.postInfo.id.$t.substring(this.props.postInfo.id.$t.indexOf('post-') + 5);

        alert(postId);
    }






    render() {

        return (
            <View style={styles.container}>

                <TouchableOpacity>
                    <View
                        style={{ width: deviceWidth, padding: 0 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ff9800',
                        }}>

                            <Text style={{ fontWeight: 'bold', color: '#b71c1c', fontSize: 22, paddingRight: 20 }}>
                               இது ஒரு பரிட்சார்த்த சேவை
                            </Text>

                        </View>
                    </View>
                </TouchableOpacity>

                <ScrollView>
                    {
                        this.state.research
                            ? _.map(this.state.research.types, (val1, idx1) => {
                                return (
                                    <View key={idx1}>
                                        <TouchableOpacity>
                                            <View
                                                style={{ width: deviceWidth, paddingTop: 10 }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: this.props.theme.color,
                                                }}>

                                                    <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 26, paddingRight: 20 }}>
                                                        {val1}
                                                    </Text>

                                                </View>
                                            </View>
                                        </TouchableOpacity>
 
                                        <View style={[commonStyles.flex4, commonStyles.directionRow, commonStyles.alignCenter, commonStyles.wrapFlex, { justifyContent: 'flex-start' ,padding:4}]}>
                                            {this.state.research.all.entities.filter(

                                                (val2, idx2) => val2.type == val1
                                            ).map((yyy, iii) => {
                                                return (

                                                    <Buttons
                                                        key={iii}
                                                        buttonClick={() => {}}
                                                        buttonStyle={[commonStyles.btnViewStyleSelected, { backgroundColor: this.props.theme.color, borderColor: this.props.theme.color }]}>
                                                        <Label
                                                            textContent={yyy.name}
                                                            textstyle={[commonStyles.selectedBtnTxtStyle,{fontWeight:'bold'}]}
                                                        />
                                                    </Buttons>

                                                )
                                            })
                                            }
                                        </View>
                                    </View>

                                )


                            })


                            :
                            <ActivityIndicator
                                animating={true}
                                color='#01579b'
                                size={60}
                                style={styles.activityIndicator}
                            />

                    }
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

    return ({
        postComments: Blog.postComments,
        theme: Settings.theme
    })
}


export default connect(mapStateToProps, {})(Research)

