
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

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card';

import moment from 'moment';
import PostModal from './PostModal';

import { connect } from 'react-redux'
import { Get, getPostDetails, getPostComments, popupCall, togglePostWebview } from '../redux/actions'
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

    }



  }
  componentWillMount() {



  }

  componentWillUnmount() {

    if (this.props.postWebview) {
      this.props.togglePostWebview();
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
    Actions.Comment({ title: item.link[1].title + '-' + item.title.$t });
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


  render() {

    let categoryTerm = "";
    if (this.props.postInfo.category) {
      //  categoryTerm = " - " + this.props.postInfo.category[0].term;
    }


    return (
      <View style={styles.container}>



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
          <View style={{ marginBottom: 20, height: deviceHeight - 100, width: deviceWidth }}>
            <WebView
              scalesPageToFit={true}
              source={{ html: this.props.postDetails }}

            />
          </View>
          : <ScrollView
            onScroll={(event) => { this.setState({ scrollHead: event.nativeEvent.contentOffset.y }) }}
            ref='_scrollView'
            contentContainerStyle={{ padding: 10, backgroundColor: '#ffffff', }}>

            <HTMLView value={this.props.postDetails} stylesheet={htmlStyles} />


            <Card style={{ width: deviceWidth }}>

              <TouchableOpacity style={{ width: deviceWidth }} >
                <CardTitle subtitle={this.formatDate(this.props.postInfo.published.$t) + categoryTerm} color={this.props.theme.color} />
              </TouchableOpacity>



              <CardAction seperator={true} inColumn={false}>
                <CardButton
                  onPress={() => { this.sharePost(this.props.postInfo) }}
                  title="Share"
                  color={this.props.theme.color}
                  icon="share"
                />
                <CardButton
                  onPress={() => this.gotoPostComments(this.props.postInfo)}
                  title={(this.props.postInfo.link[1].title).toString()}
                  color={this.props.theme.color}
                  icon="comment"
                />
              </CardAction>
            </Card>


          </ScrollView>
        }




        < TouchableOpacity
          onPress={() => this.props.togglePostWebview()}
          style={{ position: 'absolute', right: this.props.postWebview ? 20 : (this.state.scrollHead > 20 ? 80 : 20), bottom: 15, padding: 2 }} >
          <Icon name={this.props.postWebview ? "mobile" : "desktop"} size={this.props.postWebview ? 60 : 40} color={this.props.theme.color} />
        </TouchableOpacity>


        {this.state.scrollHead > 20
          ? < TouchableOpacity
            onPress={() => { this.refs._scrollView.scrollTo({ X: 0, y: 0, animated: true }); }}
            style={{ position: 'absolute', right: 15, bottom: 15, padding: 0 }} >
            <Icon name="chevron-circle-up" size={60} color={this.props.theme.color} />
          </TouchableOpacity>
          : null
        }

        {/* <PostModal isVisible={this.props.popup} /> */}

        <Modal isVisible={false}>
          <View style={{ flex: 1, height: 300 }}>
            <Text>Hello!</Text>
          </View>
        </Modal>


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
    popup: Blog.popup,
    postWebview: Blog.postWebview,
    theme: Settings.theme
  })
}


const mapDispatchToProps = dispatch =>
  ({
    Get() { dispatch(Get()) }
  })

export default connect(mapStateToProps, { Get, getPostComments, togglePostWebview })(Post)


