
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  WebView,
  Platform,


} from 'react-native';
var DOMParser = require('react-native-html-parser').DOMParser;
import { connect } from 'react-redux'
import { Get, getPostDetails } from '../redux/actions'
import HTMLView from 'react-native-htmlview'

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
        {/* <WebView
          scalesPageToFit={true}
          source={{ html: this.props.postDetails }}
          style={{ marginTop: 20 }}
        /> */}
 {/* <Text style={styles.welcome}>{this.props.postDetails}</Text> */}

        <Text style={styles.welcome}>THIS IS A POST {this.props.Data} </Text>
        <ScrollView>
          <HTMLView value={this.props.postDetails} stylesheet={htmlStyles} />
         
        </ScrollView>
      </View>
    );
  }
}

var htmlStyles = StyleSheet.create({
  a: {
    fontSize: 12,
    color: 'rgb(65,64,66)',
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


