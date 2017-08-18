import React, { Component } from 'react';
import { View, Text, Image, Platform, BackAndroid, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Router, Scene, ActionConst, Actions, DefaultRenderer } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../components/Home';
import Post from '../components/Post';
import PostWeb from '../components/PostWeb';
import Comment from '../components/Comment';
import Search from '../components/Search';
import Menu from '../components/Menu';
import Research from '../components/Research';
import CategorySelect from '../components/CategorySelect';
import CategoryPosts from '../components/CategoryPosts';
import Settings from '../components/Settings';
import Theme from '../components/Theme';
import Welcome from '../components/Welcome';
import About from '../components/About';
import WriteComment from '../components/WriteComment';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'

import { togglePostPopup } from '../redux/actions'

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

class RouterComponent extends Component {

  constructor(props) {
    super(props);

    this.state = { flag: true };

    console.log('ROUTER POP 111', this.props.popup);
    console.log('ROUTER CALL 1111', this.props.popupCall);

    this._postIcon = this.postIcon.bind(this);


  }
  componentWillMount() {


  }



  filterIcon() {
    return (
      <TouchableHighlight onPress={() => Actions.Menu()} style={{ padding: 10 }} >
        <Icon name="bars" size={30} color="white" />
      </TouchableHighlight>
    )

  }

  _rightMenuPost() {
    return (

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
        <TouchableHighlight onPress={() => Actions.PostWeb({ title: this.props.selectedPost.title.$t })} style={{ padding: 0 }} >
          <Icon name="desktop" size={30} color="white" />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => Actions.Settings()} style={{ padding: 8 }} >
          <Icon name="gear" size={35} color="white" />
        </TouchableHighlight>
      </View>

    )
  }

  _rightMenuPostWeb() {
    return (

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
        <TouchableHighlight onPress={() => Actions.pop()} style={{ padding: 10 }} >
          <Icon name="mobile" size={40} color="white" />
        </TouchableHighlight>
      </View>

    )
  }
  postIcon() {

    //  this.setState({ flag: !this.state.flag });

    //  console.log('ROUTER POP 111', this.props.popup);
    // console.log('ROUTER CALL 1111', this.props.popupCall);


    return (

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
        <TouchableHighlight onPress={() => this.props.togglePostPopup(true)} style={{ padding: 10 }} >
          <Icon name="gear" size={30} color="white" />
        </TouchableHighlight>
      </View>

    )
  }

  render() {
    return (
      <Router >
        <Scene key="root"
          navigationBarStyle={{ backgroundColor: this.props.theme.color }}
          sceneStyle={styles.sceneStyle}
          backButtonImage={require('../images/backButton.png')}
          leftButtonIconStyle={{
            width: 33,
            height: 33,
            marginLeft: 0,
            marginTop: 0,
            zIndex: 999
          }}
          // backButtonTextStyle={styles.backButtonTextStyle} 
          // barButtonIconStyle={styles.barButtonIconStyle}
          //headerBackIconTextStyle={{ tintColor: 'green' }}
          //headerBackButtonTextStyle={{ color: 'green' }}
          titleStyle={navBarTitleStyle()}    >

          <Scene key="Home" component={Home} title="நிசப்தம்" renderRightButton={() => this.filterIcon()} initial={true} />
          <Scene key="Post" component={Post} title="Post" renderRightButton={() => this._rightMenuPost()} />
          <Scene key="PostWeb" component={PostWeb} title="PostWeb" renderRightButton={() => this._rightMenuPostWeb()} />
          <Scene key="Comment" component={Comment} title="Comment" />
          <Scene key="Search" component={Search} title="தேடல்" />
          <Scene key="Menu" component={Menu} title="Menu" hideNavBar={true} />
          <Scene key="Research" component={Research} title="குறிப்புகள்" />
          <Scene key="CategorySelect" component={CategorySelect} title="பிரிவுகள்" />
          <Scene key="CategoryPosts" component={CategoryPosts} title="CategoryPosts" />
          <Scene key="Settings" component={Settings} title="அமைப்புகள்" />
          <Scene key="Theme" component={Theme} title="விருப்ப நிறங்கள்" />
          <Scene key="About" component={About} title="எழுத்தாளரைப் பற்றி" />
          <Scene key="WriteComment" component={WriteComment} title="கருத்து எழுது" />

        </Scene>
      </Router >
    )
  }
}

const mapStateToProps = ({ Blog, Settings }) => {
  //  console.log('Blog.postDetails ', Blog.postDetails);
  return ({
    postPopup: Blog.postPopup,
    selectedPost: Blog.selectedPost,
    postWebview: Blog.postWebview,
    theme: Settings.theme,
  })
}


// function mapDispatchToProps1(dispatch) {
//   return bindActionCreators(popupCall, dispatch);
// }

const mapDispatchToProps = dispatch =>
  ({
    togglePostPopup() { dispatch(togglePostPopup()) }
  })



export default connect(mapStateToProps, { togglePostPopup })(RouterComponent)
