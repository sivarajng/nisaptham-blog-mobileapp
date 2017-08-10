
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

import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'

import { connect } from 'react-redux'
import { Get, getPostDetails, getPostComments } from '../redux/actions'
import HTMLView from 'react-native-htmlview'

import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHead: 0
    }
    //  this.props.Get();
  }
  componentWillMount() {
    // this.props.getPostDetails();
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
        {this.props.popup
          ? <View style={{ height: 60 }}>
            <Text>
              JJJJJJJJJJJJJJJJJJJJJJJJJJJJ
  </Text>
          </View>
          : null}
        <ScrollView
          onScroll={(event) => { this.setState({ scrollHead: event.nativeEvent.contentOffset.y }) }}
          ref='_scrollView'
          contentContainerStyle={{ padding: 10, backgroundColor: '#ffffff', }}>
          <HTMLView value={this.props.postDetails} stylesheet={htmlStyles} />

          <Card style={{ width: deviceWidth }}>

            <CardAction seperator={true} inColumn={false}>
              <CardButton
                onPress={() => { this.sharePost(this.props.postInfo) }}
                title="Share"
                color='blue'
                icon="share"
              />
              <CardButton
                onPress={() => this.gotoPostComments(this.props.postInfo)}
                title={(this.props.postInfo.link[1].title).toString()}
                color='blue'
                icon="comment"
              />
            </CardAction>
          </Card>


        </ScrollView>

        {this.state.scrollHead > 20
          ? < TouchableOpacity
            onPress={() => { this.refs._scrollView.scrollTo({ X: 0, y: 0, animated: true }); }}
            style={{ position: 'absolute', right: 15, bottom: 15, padding: 0 }} >
            <Icon name="chevron-circle-up" size={60} color="#03A9F4" />
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


const mapStateToProps = ({ Blog, Get }) => {
  console.log('Blog.postDetails ', Blog.postDetails);
  return ({
    Data: Get.Data,
    postDetails: Blog.postDetails,
    postDetailsLoader: Blog.postDetailsLoader,
    popup: Blog.popup,
  })
}


const mapDispatchToProps = dispatch =>
  ({
    Get() { dispatch(Get()) }
  })

export default connect(mapStateToProps, { Get, getPostComments })(Post)


