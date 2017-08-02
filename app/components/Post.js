
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,


} from 'react-native';
var DOMParser = require('react-native-html-parser').DOMParser;
import { connect } from 'react-redux'
import { Get, getPostDetails } from '../redux/actions'

class Post extends Component {
  constructor(props) {
    super(props);
    //  this.props.Get();
  }
  componentWillMount() {
    // this.props.getPostDetails();
  }
  render() {


    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>THIS IS A POST {this.props.Data} </Text>
        <ScrollView>
          <Text style={styles.welcome}>{this.props.postDetails}</Text>
        </ScrollView>
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


const mapStateToProps = ({ Blog, Get }) => {
  console.log('Blog.postDetails ', Blog.postDetails);
  return ({
    Data: Get.Data,
    postDetails: Blog.postDetails,
  })
}


const mapDispatchToProps = dispatch =>
  ({
    Get() { dispatch(Get()) }
  })

export default connect(mapStateToProps, { Get })(Post)


