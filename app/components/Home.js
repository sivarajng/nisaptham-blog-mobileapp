
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
import { getPosts,getPostDetails } from '../redux/actions'

import { Actions } from 'react-native-router-flux';
import { Header, Card, CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';

class Home extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

  }
  componentWillMount() {
    this.props.getPosts();
  }

  gotoPost(item){

  // alert((item.link[4].href).toString());
    this.props.getPostDetails((item.link[4].href).toString());
    Actions.Post();
  }
  renderRow(item) {
    
    return (
      <TouchableOpacity onPress={()=>this.gotoPost(item)}>
        <Card>
          <CardSection>
            <View style={styles.productDtailsCont}>
              <Text style={[styles.productDetailsText, commonStyles.opensansBold, commonStyles.fontSize16]}>{item.title.$t}</Text>
              <Text style={[styles.content, commonStyles.opensansRegular, commonStyles.fontSize14]}>
                {item.summary.$t}
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
        <Text onPress={() => Actions.Post()}
          style={styles.welcome}>
          Welcome to React Native! HOME SRISJ!!!
        </Text>
        {this.props.posts.feed
          ? <ListView

            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(this.props.posts.feed.entry)}
            renderRow={this.renderRow.bind(this)}
          />
          : null}

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
});


const mapStateToProps = ({ Blog }) => {
  console.log('Blog.posts ', Blog.posts);
  return ({
    posts: Blog.posts
  })
}


export default connect(mapStateToProps, { getPosts,getPostDetails })(Home)

