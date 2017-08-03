
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'
import { getPosts, getPostDetails } from '../redux/actions'

import { Actions } from 'react-native-router-flux';
import { Header, Card,CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';

class Home extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

  }
  componentWillMount() {
    this.props.getPosts();
  }

  gotoPost(item) {

    // alert((item.link[4].href).toString());
    this.props.getPostDetails((item.link[4].href).toString());
    Actions.Post({ title: item.title.$t });
  }
  renderRow(item) {

    return (

      <TouchableOpacity onPress={() => this.gotoPost(item)}>
        <Card>
          <CardSection>
            <View >
              <Text style={{
                color: '#0d47a1'
                , fontSize: 20
                , fontWeight: 'bold'

              }}>{item.title.$t}</Text>
            </View>
            <View style={{ paddingTop: 4 }}>
              <Text numberOfLines={3} >
                {item.summary.$t.substring(2)}
              </Text>
            </View>

          </CardSection>
        </Card>
      </TouchableOpacity>
    )
  }
  render() {
    console.log('lllllllll ', this.props.posts);
    return (
      <View style={styles.container}>

        {this.props.posts.feed
          ? <ListView

            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(this.props.posts.feed.entry)}
            renderRow={this.renderRow.bind(this)}
          />
          : <View>
            <Text style={styles.welcome}>Loading...</Text>
          </View>}

      </View>
    );
  }
}

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


const mapStateToProps = ({ Blog }) => {
  console.log('Blog.posts ', Blog.posts);
  return ({
    posts: Blog.posts
  })
}


export default connect(mapStateToProps, { getPosts, getPostDetails })(Home)

