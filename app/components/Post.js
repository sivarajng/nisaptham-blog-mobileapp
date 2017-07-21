
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux'
import { Get } from '../redux/actions'

class Post extends Component {
  constructor(props) {
    super(props);
  //  this.props.Get();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>THIS IS A POST {this.props.Data} </Text>
        <Text style={styles.welcome}>THIS IS A POST</Text>
        <Text style={styles.welcome}>THIS IS A POST {this.props.Data} </Text>
        <Text style={styles.welcome}>THIS IS A POST</Text>
        <Text style={styles.welcome}>THIS IS A POST {this.props.Data} </Text>
        <Text style={styles.welcome}>THIS IS A POST</Text>
        <Text style={styles.welcome}>THIS IS A POST {this.props.Data} </Text>
        <Text style={styles.welcome}>THIS IS A POST</Text>

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


const mapStateToProps = (state) =>
  ({
    Data: state.Get.Data
  })

const mapDispatchToProps = dispatch =>
  ({
    Get() { dispatch(Get()) }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Post)


