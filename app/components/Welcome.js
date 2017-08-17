
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
  Share,
  Navigator
  //https://stackoverflow.com/questions/35331737/react-native-button-click-move-to-another-screen


} from 'react-native';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card';

import moment from 'moment';
import PostModal from './PostModal';

import { connect } from 'react-redux'
import { Get, getPostDetails, getPostComments, popupCall, togglePostWebview, togglePostPopup } from '../redux/actions'
import HTMLView from 'react-native-htmlview'
import Router from '../router/Router';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class Welcome extends Component {
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

    Actions.Welcome({type: 'pop'});
    
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
<TouchableOpacity onPress={()=>{Actions.main()}}>

<Text>
    asdhdsahd
    asdhdsahdasjdasasjada
    d
</Text>

<Text>
    asdhdsahd
    asdhdsahdasjdasasjada
    d
</Text>

<Text>
    asdhdsahd
    asdhdsahdasjdasasjada
    d
</Text>

<Text>
    asdhdsahd
    asdhdsahdasjdasasjada
    d
</Text>
       
</TouchableOpacity>


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
    theme: Settings.theme
  })
}


const mapDispatchToProps = dispatch =>
  ({
    Get() { dispatch(Get()) }
  })

export default connect(mapStateToProps, { Get, getPostComments, togglePostWebview, togglePostPopup })(Welcome)


