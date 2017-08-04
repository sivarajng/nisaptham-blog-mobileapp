import React from 'react';
import { View, Text, Image, Platform, BackAndroid, Dimensions, TouchableOpacity } from 'react-native';
import { Router, Scene, ActionConst, Actions, DefaultRenderer } from 'react-native-router-flux';


import Home from '../components/Home';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Search from '../components/Search';

// import {RootDrawer} from '../components/RootDrawer';

/* sceneStyle={{ paddingTop: 60 }}
       navigationBarBackgroundImage={require('../../../images/header_background.png')}
       navigationBarStyle={styles.navigationBarStyles}
       titleStyle={[styles.routerTitleStyle, commonStyles.opensansSemiBold]}
       navigationBarBackgroundImageStyle={{ width: device.width }}
       backButtonImage={require('../../../images/back_button.png')}
       // barButtonIconStyle={{ paddingLeft: 20, marginLeft: 10, width: 15.1, height: 15 }}
       leftButtonIconStyle={styles.leftButtonStyle}
       onPress={() =>        alert('click')} */

// const filterIcon = () => (
//   <TouchableHighlight onPress={() =>} style={{ ...}}>
//     <Icon name="filter" size={30} />
//   </TouchableHighlight>
// );


const RouterComponent = () => (
  <Router>
    <Scene key="root">

      <Scene key="Home" component={Home} title="Home" renderLeftButton={() => {
        return (
          <View>
            <TouchableOpacity>
              <Text>
                gggg
              </Text>
            </TouchableOpacity>
          </View>
        );
      }} />
      <Scene key="Post" component={Post} title="Post" />
      <Scene key="Comment" component={Comment} title="Comment" />
      <Scene key="Search" component={Search} title="Search" />

    </Scene>
  </Router>
  //  <Router>
  //   <Scene key="drawer" component={Drawer} open={true}>
  //     <Scene key="Main" tabs={false}> 
  //       <Scene key="Home" component={Home} title="Home" initial={true} onRight={() => {Actions.Search()}} rightTitle='Profile'/>
  //       <Scene key="Post" component={Post} title="Post" />
  //       <Scene key="Comment" component={Comment} title="Comment" />
  //       <Scene key="Search" component={Search} title="Search" />
  //     </Scene> 
  //   </Scene>
  // </Router>
);

export default RouterComponent;