import React from 'react';
import { View, Text, Image, Platform, BackAndroid, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Router, Scene, ActionConst, Actions, DefaultRenderer } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../components/Home';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Search from '../components/Search';
import Menu from '../components/Menu';
import Research from '../components/Research';
import CategorySelect from '../components/CategorySelect';
import CategoryPosts from '../components/CategoryPosts';
import Settings from '../components/Settings';
import Theme from '../components/Theme';

 import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'

import { popupCall } from '../redux/actions'

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

const filterIcon = () => (
  <TouchableHighlight onPress={() => Actions.Menu()} style={{ padding: 10 }} >
    <Icon name="bars" size={30} color="white" />
  </TouchableHighlight>
);

const postIcon = (props) => {

  console.log('ROUTER POP',props.popup);
  console.log('ROUTER CALL',props.popupCall);
 
  return (
  <TouchableHighlight onPress={() =>  props.popupCall(!props.popup)} style={{ padding: 10 }} >
    <Icon name="search" size={30} color="white" />
  </TouchableHighlight>
  )
}
const navBarStyle = () => (
  {
    backgroundColor: '#0288d1',

  }
);
const navBarTitleStyle = () => (
  {


    color: '#FFFFFF',
    fontWeight: 'bold',
    // fontSize: 18,
    textAlign: 'center',

    //  paddingLeft: 40,
  }
);

const styles = {
  sceneStyle: {
    //   paddingTop: 65
  },
  backButtonTextStyle: {
      color: 'red'
  },
  barButtonIconStyle: {
     tintColor: 'red'
  }
};


const RouterComponent = (props) => (


  <Router>
    <Scene key="root"
      navigationBarStyle={navBarStyle()}
      sceneStyle={styles.sceneStyle}
      // backButtonTextStyle={styles.backButtonTextStyle} 
// barButtonIconStyle={styles.barButtonIconStyle}
//headerBackIconTextStyle={{ tintColor: 'green' }}
//headerBackButtonTextStyle={{ color: 'green' }}
      titleStyle={navBarTitleStyle()}>

      <Scene key="Home" component={Home} title="Home" renderRightButton={() => filterIcon()} initial={true} />
      <Scene key="Post" component={Post} title="Post" renderRightButton={() => postIcon(props)} />
      <Scene key="Comment" component={Comment} title="Comment" />
      <Scene key="Search" component={Search} title="Search" />
      <Scene key="Menu" component={Menu} title="Menu" hideNavBar={true} />
      <Scene key="Research" component={Research} title="Research" />
      <Scene key="CategorySelect" component={CategorySelect} title="CategorySelect" />
      <Scene key="CategoryPosts" component={CategoryPosts} title="CategoryPosts" />
      <Scene key="Settings" component={Settings} title="Settings" />
      <Scene key="Theme" component={Theme} title="Theme" />

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

const mapStateToProps = ({ Blog, Get }) => {
  console.log('Blog.postDetails ', Blog.postDetails);
  return ({
    popup: Blog.popup,
  })
}


 function mapDispatchToProps1(dispatch) {
      return bindActionCreators(popupCall, dispatch);
    }

    const mapDispatchToProps = dispatch =>
  ({
    popupCall() { dispatch(popupCall()) }
  })



export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent)
