
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Header, Card, CardSection, Buttons, Label } from './common/index';
import commonStyles from '../styles/commonStyles';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => Actions.Post()}
          style={styles.welcome}>
          Welcome to React Native! HOME SRISJ!!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>


        <Card>
          <CardSection>
            <View style={styles.productDtailsCont}>
              <Text style={[styles.productDetailsText, commonStyles.opensansBold, commonStyles.fontSize16]}>Product Details</Text>
              <Text style={[styles.content, commonStyles.opensansRegular, commonStyles.fontSize14]}>
                The standard chunk of Lorem Ipsum used since the 1500s is
                                        reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
                                        by Cicero are also reproduced in their exact original form,
                                        accompanied by English versions from the 1914 translation by H. Rackham.
                                    </Text>
            </View>

          </CardSection>
        </Card>


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

export default Home;