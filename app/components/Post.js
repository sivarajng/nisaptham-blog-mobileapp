
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  WebView,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Share


} from 'react-native';

import * as axios from 'axios'
import Modal from 'react-native-modal';

import * as _ from 'lodash';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card';

import moment from 'moment';
import PostModal from './PostModal';

import { connect } from 'react-redux'
import { Get, getPostDetails, getPostComments, popupCall, togglePostWebview, togglePostPopup } from '../redux/actions'
import HTMLView from 'react-native-htmlview'

import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHead: 0,

      postDetails: this.props.postDetails,
      postInfo: this.props.postInfo,
      isRead: false,
      statCounterUrl: null

    }



  }
  componentWillMount() {



  }

  componentWillReceiveProps() {

    let postUrlArrt = [];
    let postUrlt = "";

    postUrlArrt = _.filter(this.props.postInfo.link, function (o) { return o.rel == "alternate"; });

    if (postUrlArrt.length == 0) {
      postUrlt = "";
    }
    else {
      postUrlt = (postUrlArrt[0].href).toString();
    }

    if (!this.state.isRead) {
      // GET request for stat Counter
      this.setState({ isRead: true });


      let statCounterData = `?sc_project=11465014&java=1&security=3e8a0d87&jg=13&resolution=${deviceWidth}&h=${deviceHeight}&camefrom=http://mobile-app.com&u=${postUrlt}&t=${this.props.postInfo.title.$t}&rcat=d&rdomo=d&rdomg=13&sc_snum=1&p=0&invisible=1&sc_random=${Math.random()}`;

      let scurl = 'http://c.statcounter.com/t.php' + statCounterData;
      this.setState({ statCounterUrl: scurl });

      // alert(this.props.postInfo.title.$t+"____");
      //  axios.get('http://c.statcounter.com/t.php' + statCounterData)
      //  .then(function (response) {
      // alert(JSON.stringify(response));
      //  });
    }

  }

  componentWillUnmount() {

    if (this.props.postWebview) {
      //   this.props.togglePostWebview();
    }



    // alert('sasasasa');
    // this.props.getPostDetails();

  }


  componentDidMount() {

    // this.props.togglePostWebview();
  }


  gotoPostComments(item) {

    // alert((item.link[4].href).toString());
    this.props.getPostComments((item.link[0].href).toString());
    Actions.Comment({ title: item.link[1].title.toLowerCase().replace("comments", "கருத்துக்கள்") + ' - ' + item.title.$t, postInfo: item });
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

  _research(item) {

    Actions.Research({ postInfo: item, title: "குறிப்புகள் : " + item.title.$t });

  }
  _getCommentsCount(item) {

    let commentLink = "";
    if (item.link) {
      if (item.link.length > 1) {
        if (item.link[1].title) {
          commentLink = (item.link[1].title).toString();
        }

      }

    }
    commentLink = commentLink.toLowerCase().replace("comments", "கருத்துக்கள்");
    return commentLink;

  }
  render() {

    let categoryTerm = "";
    if (this.props.postInfo.category) {
      //  categoryTerm = " - " + this.props.postInfo.category[0].term;
    }


    return (
      <View style={[styles.container, { backgroundColor: !this.props.nightMode ? '#ffffff' : '#022231' }]}>

        <View style={{ marginBottom: 0, height: 1, width: deviceWidth }}>
        <WebView
          scalesPageToFit={true}
          style={{ backgroundColor: (!this.props.nightMode ? "#ffffff" : "#022231") }}
          source={{ uri: this.state.statCounterUrl }}

        />
        </View>

        {/* <View

          style={{ padding: 5, margin: 0, backgroundColor: this.props.theme.color, borderColor: '#ffffff', width: deviceWidth }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, position: 'relative', left: 0 }}>
            <Text numberOfLines={1} style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 18, paddingLeft: 0 }}>
              {this.props.title}
            </Text>
            <TouchableOpacity onPress={() => this.props.togglePostPopup(true)} style={{ position: 'absolute', right: 0 }} >
              <Icon name="gear" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View> */}


        {/* <WebView
          scalesPageToFit={true}
          source={{ html: this.props.postDetails }}
          style={{ marginTop: 20 }}
        /> */}
        {/* <Text style={styles.welcome}>{this.props.postDetails}</Text> */}

        {this.props.postDetailsLoader
          ? <ActivityIndicator
            animating={true}
            color='#01579b'
            size={60}
            style={styles.activityIndicator}
          />
          : null
        }

        {this.props.postWebview
          ?
          <View style={{ marginBottom: 20, height: deviceHeight - 100, width: deviceWidth, backgroundColor: !this.props.nightMode ? '#ffffff' : '#022231' }}>
            <WebView
              scalesPageToFit={true}
              source={{ html: this.props.postDetails }}

            />
          </View>
          : <ScrollView
            onScroll={(event) => { this.setState({ scrollHead: event.nativeEvent.contentOffset.y }) }}
            ref='_scrollView'
            contentContainerStyle={{ padding: 10, backgroundColor: !this.props.nightMode ? '#ffffff' : '#022231', }}>

            <HTMLView value={this.props.postDetails} stylesheet={this.HS()} />


            <Card style={{ width: deviceWidth, marginLeft: -10 }}>

              <TouchableOpacity style={{ width: deviceWidth }} >
                <CardTitle subtitle={this.formatDate(this.props.postInfo.published.$t) + categoryTerm} color={this.props.theme.color} />
              </TouchableOpacity>



              <CardAction seperator={true} inColumn={false}>
                {/* <CardButton
                  onPress={() => { this._research(this.props.postInfo) }}
                  title="குறிப்புகள்"
                  color={'#FF9800'}
                  textColor={'#01579b'}
                  icon="star"
                /> */}
                <CardButton
                  onPress={() => { this.sharePost(this.props.postInfo) }}
                  title="பகிர்"
                  color={this.props.theme.color}
                  icon="share"
                />

                {this._getCommentsCount(this.props.postInfo) != ""
                  ? <CardButton
                    onPress={() => this.gotoPostComments(this.props.postInfo)}
                    title={this._getCommentsCount(this.props.postInfo)}
                    color={this.props.theme.color}
                    icon="comment"
                  />
                  : null
                }


              </CardAction>
              <CardAction seperator={true} inColumn={false}>
                <CardButton
                  onPress={() => Actions.WriteComment({ title: "கருத்து எழுது - " + this.props.postInfo.title.$t, postInfo: this.props.postInfo })}
                  title={"கருத்து எழுது"}
                  color={this.props.theme.color}
                  icon="edit"
                />
              </CardAction>


            </Card>


          </ScrollView>
        }


        {this.state.scrollHead > 20
          ? < TouchableOpacity
            onPress={() => { this.refs._scrollView.scrollTo({ X: 0, y: 0, animated: true }); }}
            style={{ position: 'absolute', right: 15, bottom: 15, padding: 0 }} >
            <Icon name="chevron-circle-up" size={60} color={this.props.theme.color} />
          </TouchableOpacity>
          : null
        }

        {/* <PostModal isVisible={this.props.popup} /> */}

        <Modal isVisible={this.props.postPopup}
        >
          <TouchableOpacity onPress={() => this.props.togglePostPopup(false)}>
            <View style={{ backgroundColor: 'white', height: 200, width: deviceWidth }}>
              <Text>Hello!</Text>

            </View>
          </TouchableOpacity>
        </Modal>


      </View>
    );
  }
}


var htmlStyles = StyleSheet.create({
  div: {
    fontSize: 18,
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
    // flex: 1,
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

  activityIndicator: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight
  }
});


const mapStateToProps = ({ Blog, Get, Settings }) => {
  console.log('Blog.postDetails ', Blog.postDetails);



  return ({
    Data: Get.Data,
    postDetails: Blog.postDetails,
    postDetailsLoader: Blog.postDetailsLoader,
    postPopup: Blog.postPopup,
    postWebview: Blog.postWebview,
    theme: Settings.theme,
    fontSize: Settings.fontSize,
    nightMode: Settings.nightMode

  })
}


const mapDispatchToProps = dispatch =>
  ({
    Get() { dispatch(Get()) }
  })

export default connect(mapStateToProps, { Get, getPostComments, togglePostWebview, togglePostPopup })(Post)


