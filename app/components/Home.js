
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
  ActivityIndicator,
  RefreshControl,

} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';

import { connect } from 'react-redux'
import { getPosts, getPostDetails, getPostComments } from '../redux/actions'

import { Actions } from 'react-native-router-flux';
// import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';


import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card'
const deviceWidth = Dimensions.get("window").width;
class Home extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    this.state = {
      refreshing: false,
    };
  }
  componentWillMount() {
    this.props.getPosts();

  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.getPosts("refresh");
    // fetchData().then(() => {
    //   this.setState({ refreshing: false });
    // });
  }

  gotoPost(item) {

    // alert((item.link[4].href).toString());
    this.props.getPostDetails((item.link[4].href).toString());
    Actions.Post({ title: item.title.$t,postInfo:item });
  }

  gotoPostComments(item) {

    // alert((item.link[4].href).toString());
    this.props.getPostComments((item.link[0].href).toString());
    Actions.Comment({ title: item.link[1].title + '-' + item.title.$t });
  }

  _gotoSearch() {

    // alert((item.link[4].href).toString());
    //  this.props.getPostComments((item.link[0].href).toString());
    Actions.Search({ title: 'Search' });
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
      if (moment(new Date().getTime()).diff(date, 'days') >= 7) {
        return date.format('MMM D, YYYY');
      }
      return date.fromNow();
    }
    return 'Invalid Date';
  }

  renderRow(item) {

    return (


      <Card style={{ width: deviceWidth }}>
        <TouchableOpacity style={{ width: deviceWidth }} onPress={() => this.gotoPost(item)}>
          <CardTitle title={item.title.$t} subtitle={this.formatDate(item.published.$t)} />
        </TouchableOpacity>
        <CardContent trim={true} text={item.summary.$t.substring(2)} />
        <CardAction seperator={true} inColumn={false}>
          <CardButton
            onPress={() => { this.sharePost(item) }}
            title="Share"
            color='blue'
          />
          <CardButton
            onPress={() => this.gotoPostComments(item)}
            title={(item.link[1].title).toString()}
            color='blue'
          />
        </CardAction>
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





        {this.props.posts.feed
          ? <ListView
            ref='_scrollView'
            refreshControl={
              <RefreshControl
                refreshing={this.props.postsRefresh}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(this.props.posts.feed.entry)}
            renderRow={this.renderRow.bind(this)}
          />
          :
          <ActivityIndicator
            animating={true}
            color='#01579b'
            size={60}
            style={styles.activityIndicator}
          />

        }

        <TouchableOpacity
          onPress={() => { this.refs._scrollView.scrollTo({ X: 0, y: 0, animated: true }); }}
          style={{  position: 'absolute', right: 30, bottom: 30, padding: 5 }} >
          <Icon name="chevron-circle-up" size={60} color="#03A9F4" />
        </TouchableOpacity>

      </View>
    );
  }
}

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
  },

  activityIndicator: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 80
  }
});


const mapStateToProps = ({ Blog }) => {
  console.log('Blog.posts ', Blog.posts);
  return ({
    posts: Blog.posts
    , postsRefresh: Blog.postsRefresh
  })
}


export default connect(mapStateToProps, { getPosts, getPostDetails, getPostComments })(Home)

