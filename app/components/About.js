
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  WebView,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  Image


} from 'react-native';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from './common/Card';

import moment from 'moment';
import PostModal from './PostModal';

import { connect } from 'react-redux'
import { Get, getPostDetails, getPostComments, popupCall, togglePostWebview, togglePostPopup } from '../redux/actions'
import HTMLView from 'react-native-htmlview'

import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHead: 0,

      postDetails: this.props.postDetails,
      postInfo: this.props.postInfo,
      about:`
      <div dir="ltr" style="text-align: left;" trbidi="on">
<div style="text-align: justify;">
1982 ஆம&#3021; ஆண&#3021;ட&#3009; ஏப&#3021;ரல&#3021; 10 ஆம&#3021; த&#3015;த&#3007; ப&#3007;றந&#3021;த எனத&#3009; ச&#3018;ந&#3021;த ஊர&#3021; ஈர&#3019;ட&#3009; ம&#3006;வட&#3021;டத&#3021;த&#3007;ல&#3021; இர&#3009;க&#3021;க&#3009;ம&#3021; கரட&#3021;டட&#3007;ப&#3006;ள&#3016;யம&#3021; என&#3021;ன&#3009;ம&#3021; ச&#3007;ற&#3021;ற&#3010;ர&#3021;. இரண&#3021;ட&#3006;ம&#3021; வக&#3009;ப&#3021;ப&#3009; வர&#3016;க&#3021;க&#3009;ம&#3021; ஆங&#3021;க&#3007;ல வழ&#3007;க&#3021; கல&#3021;வ&#3007;ய&#3007;ல&#3021; பட&#3007;க&#3021;க வ&#3016;த&#3021;த&#3006;ர&#3021;கள&#3021;. க&#3019;ப&#3007;ய&#3007;ல&#3021; இயங&#3021;க&#3007;க&#3021; க&#3018;ண&#3021;ட&#3007;ர&#3009;ந&#3021;த க&#3006;ந&#3021;த&#3007; கல&#3021;வ&#3007; ந&#3007;ல&#3016;யம&#3021; மற&#3021;ற&#3009;ம&#3021; சத&#3021;த&#3007;யமங&#3021;கலம&#3021; ச&#3006;ர&#3009; ம&#3014;ட&#3021;ர&#3007;க&#3009;ல&#3015;ஷன&#3007;ல&#3021; பட&#3007;த&#3021;த&#3015;ன&#3021;. ப&#3007;றக&#3009; க&#3019;ப&#3007;ச&#3021;ச&#3014;ட&#3021;ட&#3007;ப&#3006;ள&#3016;யத&#3021;த&#3007;ல&#3021; உள&#3021;ள வ&#3016;ரவ&#3007;ழ&#3006; பள&#3021;ள&#3007;ய&#3007;ல&#3021; ம&#3010;ன&#3021;ற&#3006;ம&#3021; வக&#3009;ப&#3021;ப&#3007;ல&#3021; ச&#3015;ர&#3021;த&#3021;த&#3009;வ&#3007;ட&#3021;ட&#3006;ர&#3021;கள&#3021;. அப&#3021;ப&#3018;ழ&#3009;த&#3007;ல&#3007;ர&#3009;ந&#3021;த&#3009; தம&#3007;ழ&#3021; வழ&#3007;க&#3021;கல&#3021;வ&#3007;. ந&#3010;ற&#3021;ற&#3006;ண&#3021;ட&#3009; கண&#3021;ட பள&#3021;ள&#3007; அத&#3009;. பன&#3021;ன&#3007;ர&#3014;ண&#3021;ட&#3006;ம&#3021; வக&#3009;ப&#3021;ப&#3009; வர&#3016;ய&#3007;ல&#3009;ம&#3021; அங&#3021;க&#3009;த&#3006;ன&#3021; பட&#3007;ப&#3021;ப&#3009; த&#3018;டர&#3021;ந&#3021;தத&#3009;. எழ&#3009;த&#3009;வதற&#3021;க&#3009;ம&#3021; ப&#3015;ச&#3009;வதற&#3021;க&#3009;ம&#3006;ன ஆர&#3021;வம&#3021; அங&#3021;க&#3015;த&#3006;ன&#3021; ஊன&#3021;றப&#3021;பட&#3021;டத&#3009;.<br />
<br />
1999 ஆம&#3021; ஆண&#3021;ட&#3007;ல&#3021; பன&#3021;ன&#3007;ர&#3014;ண&#3021;ட&#3006;ம&#3021; வக&#3009;ப&#3021;ப&#3009; ம&#3009;ட&#3007;த&#3021;தவ&#3009;டன&#3021; ச&#3015;லம&#3021; ச&#3019;ன&#3006; ப&#3018;ற&#3007;ய&#3007;யல&#3021; கல&#3021;ல&#3010;ர&#3007;ய&#3007;ல&#3021; BE பட&#3007;ப&#3021;ப&#3007;ல&#3021; ச&#3015;ர&#3021;ந&#3021;த&#3015;ன&#3021;. ம&#3007;ன&#3021;ன&#3007;யல&#3021; மற&#3021;ற&#3009;ம&#3021; ம&#3007;ன&#3021;னண&#3009;வ&#3007;யல&#3021; ப&#3006;டம&#3021;. அதன&#3021; ப&#3007;றக&#3009; வ&#3015;ல&#3010;ர&#3021; த&#3018;ழ&#3007;ல&#3021;ந&#3009;ட&#3021;பக&#3021; கல&#3021;ல&#3010;ர&#3007;ய&#3007;ல&#3021; எம&#3021;.ட&#3014;க&#3021;(ம&#3014;க&#3021;ட&#3021;ர&#3006;ன&#3007;க&#3021;ஸ&#3021;) பட&#3007;ப&#3021;ப&#3016; 2005 ஆம&#3021; ஆண&#3021;ட&#3009; ம&#3009;ட&#3007;த&#3021;த&#3015;ன&#3021;.<br />
<br />
இட&#3016;ய&#3007;ல&#3021; 2004 ஆம&#3021; ச&#3014;ன&#3021;ன&#3016;ய&#3007;ல&#3021; எம&#3021;.ட&#3014;க&#3021; ப&#3021;ர&#3006;ஜக&#3021;ட&#3021; ச&#3014;ய&#3021;வதற&#3021;க&#3006;க ச&#3014;ன&#3021;ன&#3016;ய&#3007;ல&#3021; ச&#3009;ற&#3021;ற&#3007;க&#3021; க&#3018;ண&#3021;ட&#3007;ர&#3009;ந&#3021;த ப&#3019;த&#3009; கவ&#3007;ஞர&#3021;. மன&#3009;ஷ&#3021;ய ப&#3009;த&#3021;த&#3007;ரன&#3009;டன&#3006;ன அற&#3007;ம&#3009;கம&#3021; க&#3007;ட&#3016;த&#3021;தத&#3009;. அத&#3009;வர&#3016; எழ&#3009;த&#3007;ய&#3007;ர&#3009;ந&#3021;த கவ&#3007;த&#3016;கள&#3007;ல&#3021; இர&#3009;க&#3021;க&#3009;ம&#3021; ச&#3007;க&#3021;கல&#3021;கள&#3016;ப&#3021; ப&#3009;ர&#3007;யவ&#3016;த&#3021;த&#3009; நவ&#3008;ன இலக&#3021;க&#3007;யத&#3021;த&#3007;ன&#3021; பக&#3021;கம&#3006;க த&#3007;ர&#3009;ப&#3021;ப&#3007;வ&#3007;ட&#3021;ட&#3006;ர&#3021;. அதன&#3021; ப&#3007;றக&#3009; த&#3018;டர&#3021;ந&#3021;த வ&#3006;ச&#3007;ப&#3021;ப&#3009;ம&#3021; பல கவ&#3007;ஞர&#3021;கள&#3009;டன&#3006;ன ந&#3014;ர&#3009;க&#3021;கம&#3009;ம&#3021; கவ&#3007;த&#3016;கள&#3007;ன&#3021; ம&#3008;த&#3006;ன வ&#3007;ர&#3009;ப&#3021;பத&#3021;த&#3016; அத&#3007;கர&#3007;த&#3021;தத&#3009;. ம&#3009;தல&#3021; கவ&#3007;த&#3016;த&#3021; த&#3018;க&#3009;ப&#3021;ப&#3006;ன &#8216;கண&#3021;ண&#3006;ட&#3007;ய&#3007;ல&#3021; நகர&#3009;ம&#3021; வ&#3014;ய&#3007;ல&#3021;&#8217; உய&#3007;ர&#3021;ம&#3016; பத&#3007;ப&#3021;பகத&#3021;த&#3007;ன&#3021; வழ&#3007;ய&#3006;கவ&#3015; வ&#3014;ள&#3007;ய&#3006;னத&#3009;. அதன&#3021; ப&#3007;றக&#3009; ச&#3016;பர&#3021; க&#3009;ற&#3021;றங&#3021;கள&#3016;ப&#3021; பற&#3021;ற&#3007;ய த&#3018;டர&#3006;ன ச&#3016;பர&#3021; ச&#3006;த&#3021;த&#3006;ன&#3021;கள&#3021; என&#3021;ற ப&#3009;த&#3021;தகம&#3009;ம&#3021; உய&#3007;ர&#3021;ம&#3016; வ&#3014;ள&#3007;ய&#3008;ட&#3006;க வ&#3014;ள&#3007;ய&#3006;னத&#3009;. இந&#3021;தச&#3021; சமயத&#3021;த&#3007;ல&#3021; கவ&#3007;த&#3016;கள&#3019;ட&#3009; ச&#3015;ர&#3021;த&#3021;த&#3009; ச&#3007;ல கட&#3021;ட&#3009;ர&#3016;கள&#3009;ம&#3021; எழ&#3009;தத&#3021; த&#3009;வங&#3021;க&#3007;ய&#3007;ர&#3009;ந&#3021;த&#3015;ன&#3021;. த&#3007;னமண&#3007;, அம&#3009;தச&#3009;ரப&#3007; ப&#3019;ன&#3021;ற இதழ&#3021;கள&#3021; அதற&#3021;க&#3006;ன வ&#3006;ய&#3021;ப&#3021;ப&#3009;கள&#3016; உர&#3009;வ&#3006;க&#3021;க&#3007;க&#3021; க&#3018;ட&#3009;த&#3021;தன. கல&#3021;க&#3007;ய&#3007;ல&#3021; &#8216;ர&#3019;ப&#3019;ட&#3007;க&#3021;ஸ&#3021;&#8217; க&#3009;ற&#3007;த&#3021;த&#3006;ன த&#3018;டர&#3021; எழ&#3009;தக&#3021; க&#3007;ட&#3016;த&#3021;த வ&#3006;ய&#3021;ப&#3021;ப&#3007;ன&#3016;ய&#3009;ம&#3021; க&#3009;ற&#3007;ப&#3021;ப&#3007;ட&#3021;ட&#3006;க வ&#3015;ண&#3021;ட&#3009;ம&#3021;.</div>
<div style="text-align: justify;">
<br /></div>
<div style="text-align: justify;">
கவ&#3007;த&#3016;கள&#3016; உய&#3007;ர&#3021;ம&#3016;, க&#3006;லச&#3021;ச&#3009;வட&#3009;, உய&#3007;ர&#3021; எழ&#3009;த&#3021;த&#3009;, ப&#3009;த&#3009; எழ&#3009;த&#3021;த&#3009;, அம&#3021;ர&#3009;த&#3006; உள&#3021;ள&#3007;ட&#3021;ட இதழ&#3021;கள&#3021; வ&#3014;ள&#3007;ய&#3007;ட&#3021;ட&#3009; உற&#3021;ச&#3006;கமள&#3007;த&#3021;தன. இந&#3021;தச&#3021; சமயத&#3021;த&#3007;ல&#3015;ய&#3015; வல&#3016;ப&#3021;பத&#3007;வ&#3009; எழ&#3009;தத&#3021; த&#3018;டங&#3021;க&#3007;ய&#3007;ர&#3009;ந&#3021;த&#3015;ன&#3021;. ஆரம&#3021;பத&#3021;த&#3007;ல&#3021; வ&#3014;க&#3009; க&#3009;ற&#3016;வ&#3006;னவர&#3021;கள&#3021; வ&#3006;ச&#3007;த&#3021;த&#3009;க&#3021; க&#3018;ண&#3021;ட&#3007;ர&#3009;ந&#3021;த&#3006;ர&#3021;கள&#3021;. க&#3009;ற&#3016;வ&#3006;னவர&#3021;கள&#3021; என&#3021;பத&#3016;வ&#3007;டவ&#3009;ம&#3021; ச&#3018;ற&#3021;பம&#3006;னவர&#3021;கள&#3021; என&#3021;ற ச&#3018;ல&#3021; ப&#3018;ர&#3009;த&#3021;தம&#3006;னத&#3006;க இர&#3009;க&#3021;க&#3009;ம&#3021;. 2012 ஆம&#3021; ஆண&#3021;ட&#3007;ல&#3021; இரண&#3021;ட&#3006;வத&#3009; கவ&#3007;த&#3016;த&#3021; த&#3018;க&#3009;ப&#3021;ப&#3006;ன &#8216;என&#3021;ன&#3016;க&#3021; கடவ&#3009;ள&#3006;க&#3021;க&#3007;ய தவ&#3007;ட&#3021;ட&#3009;க&#3021;க&#3009;ர&#3009;வ&#3007;&#8217; வ&#3014;ள&#3007;ய&#3006;னத&#3009;. இந&#3021;தச&#3021; சமயத&#3021;த&#3007;ல&#3021; த&#3018;டர&#3021;ந&#3021;த&#3009; எழ&#3009;த&#3007;யத&#3006;ல&#3019; என&#3021;னவ&#3019; ந&#3007;சப&#3021;தம&#3021; வல&#3016;ப&#3021;பத&#3007;வ&#3009;ம&#3021; பரவல&#3006;ன கவனம&#3021; ப&#3014;றத&#3021; த&#3018;டங&#3021;க&#3007;ய&#3007;ர&#3009;ந&#3021;தத&#3009;. அதன&#3021; ப&#3007;றக&#3009; வ&#3014;ள&#3007;ய&#3006;ன &#8216;ல&#3007;ண&#3021;ட&#3021;ச&#3015; ல&#3019;ஹன&#3021; w/o ம&#3006;ர&#3007;யப&#3021;பன&#3021;&#8217; என&#3021;ற ச&#3007;ற&#3009;கத&#3016;த&#3021; த&#3018;க&#3009;ப&#3021;ப&#3009;ம&#3021; 2015 ஆம&#3021; ஆண&#3021;ட&#3009; வ&#3014;ள&#3007;ய&#3006;ன &#8216;மச&#3006;ல&#3021; த&#3019;ச&#3016; 38 ர&#3010;ப&#3006;ய&#3021;&#8217; கட&#3021;ட&#3009;ர&#3016;த&#3021; த&#3018;க&#3009;ப&#3021;ப&#3009;ம&#3021; ப&#3007;ற ப&#3009;த&#3021;தகங&#3021;கள&#3016;க&#3021; க&#3006;ட&#3021;ட&#3007;ல&#3009;ம&#3021; அத&#3007;கப&#3021;பட&#3007;ய&#3006;ன கவனத&#3021;த&#3016; ப&#3014;ற&#3021;றன என&#3021;ற&#3009; ச&#3018;ல&#3021;ல ம&#3009;ட&#3007;ய&#3009;ம&#3021;.</div>
<div style="text-align: justify;">
<br /></div>
<div style="text-align: justify;">
2013 ஆம&#3021; ஆண&#3021;ட&#3009;க&#3021;க&#3006;ன ச&#3009;ஜ&#3006;த&#3006; இண&#3016;ய வ&#3007;ர&#3009;த&#3009; ந&#3007;சப&#3021;தம&#3021; தளத&#3021;த&#3007;ற&#3021;க&#3009;க&#3021; க&#3007;ட&#3016;த&#3021;தத&#3009;.&nbsp;</div>
<div style="text-align: justify;">
<br /></div>
<div style="text-align: justify;">
எம&#3021;.ட&#3014;க&#3021; பட&#3007;த&#3021;த&#3009;க&#3021; க&#3018;ண&#3021;ட&#3007;ர&#3009;ந&#3021;த ப&#3019;த&#3009; Prelude solutions என&#3021;ற ந&#3007;ற&#3009;வனத&#3021;த&#3007;ல&#3021; க&#3018;ஞ&#3021;ச ந&#3006;ட&#3021;கள&#3009;க&#3021;க&#3009; வ&#3015;ல&#3016; ச&#3014;ய&#3021;ய&#3009;ம&#3021; வ&#3006;ய&#3021;ப&#3021;ப&#3009;க&#3021; க&#3007;ட&#3016;த&#3021;தத&#3009;. அப&#3021;ப&#3018;ழ&#3009;த&#3009; ம&#3010;ன&#3021;ற&#3006;ய&#3007;ரத&#3021;த&#3009; அற&#3009;ந&#3010;ற&#3009; ர&#3010;ப&#3006;ய&#3021; சம&#3021;பளம&#3021; என&#3021;பத&#3009; ம&#3007;கக&#3021; க&#3009;ற&#3016;வ&#3006;னத&#3009;. வ&#3007;ட&#3021;ட&#3009;வ&#3007;ட&#3021;ட&#3009; ஹ&#3016;தர&#3006;ப&#3006;த&#3021;த&#3007;ல&#3021; வ&#3007;ஜய&#3021; எல&#3014;க&#3021;ட&#3021;ர&#3007;க&#3021;கல&#3021;ஸ&#3021; ந&#3007;ற&#3009;வனத&#3021;த&#3007;ல&#3021; பண&#3007;ய&#3007;ல&#3021; ச&#3015;ர&#3021;ந&#3021;த&#3015;ன&#3021;. ஆரம&#3021;பத&#3021;த&#3007;ல&#3015;ய&#3015; ந&#3006;ன&#3021;க&#3009; ஆண&#3021;ட&#3009;கள&#3009;க&#3021;க&#3006;ன ப&#3007;ண&#3016; க&#3019;ர&#3007;ன&#3006;ர&#3021;கள&#3021;. க&#3009;ற&#3016;வ&#3006;ன சம&#3021;பளம&#3021;த&#3006;ன&#3021;. ஆன&#3006;ல&#3021; வ&#3015;ற&#3009; வழ&#3007;ய&#3007;ல&#3021;ல&#3016;. க&#3016;ய&#3014;ழ&#3009;த&#3021;த&#3009;ப&#3021; ப&#3019;ட&#3021;ட&#3009;க&#3021; க&#3018;ட&#3009;த&#3021;த&#3009;வ&#3007;ட&#3021;ட&#3015;ன&#3021;. &nbsp;அத&#3015; சமயத&#3021;த&#3007;ல&#3021; ம&#3006;ல&#3016; ந&#3015;ரக&#3021; கண&#3007;ன&#3007; பய&#3007;ற&#3021;ச&#3007; ந&#3007;ற&#3009;வனத&#3021;த&#3007;ல&#3021; ஒர&#3009; பட&#3007;ப&#3021;ப&#3016; ம&#3009;ட&#3007;த&#3021;த ப&#3019;த&#3009; ச&#3007;யர&#3021;ர&#3006; அட&#3021;ல&#3006;ண&#3021;ட&#3007;க&#3021; என&#3021;ற ந&#3007;ற&#3009;வனத&#3021;த&#3007;ல&#3021; வ&#3015;ல&#3016; க&#3007;ட&#3016;த&#3021;தத&#3009;. வ&#3007;ஜய&#3021; எல&#3014;க&#3021;ட&#3021;ர&#3007;க&#3021;கல&#3021;ஸ&#3021; ந&#3007;ற&#3009;வனத&#3021;த&#3007;ல&#3007;ர&#3009;ந&#3021;த&#3009; ச&#3018;ல&#3021;ல&#3006;மல&#3021; ஓட&#3007; வந&#3021;த&#3009;வ&#3007;ட&#3021;ட&#3015;ன&#3021;. வர&#3009;ம&#3006;னத&#3021;த&#3016; உற&#3009;த&#3007;ப&#3021;பட&#3009;த&#3021;த&#3007;க&#3021; க&#3018;ண&#3021;ட&#3006;ல&#3021; ப&#3007;றவற&#3021;ற&#3016;ப&#3021; பற&#3021;ற&#3007; அத&#3007;கம&#3021; கவல&#3016;ப&#3021;படத&#3021; த&#3015;வ&#3016;ய&#3007;ல&#3021;ல&#3016; என&#3021;பத&#3016;ப&#3021; ப&#3009;ர&#3007;ந&#3021;த&#3009; க&#3018;ண&#3021;ட தர&#3009;ணம&#3021; அத&#3009;. ச&#3007;யர&#3021;ர&#3006; அட&#3021;ல&#3006;ண&#3021;ட&#3007;க&#3021;க&#3007;ல&#3007;ர&#3009;ந&#3021;த&#3009; சம&#3021;பளம&#3021; ஒழ&#3009;ங&#3021;க&#3006;க வரத&#3021; த&#3009;வங&#3021;க&#3007;யத&#3009;. அங&#3021;க&#3009;த&#3006;ன&#3021; பல ந&#3006;ட&#3009;கள&#3009;க&#3021;க&#3009;ம&#3021; பயண&#3007;க&#3021;க&#3009;ம&#3021; வ&#3006;ய&#3021;ப&#3021;ப&#3009;க&#3021; க&#3007;ட&#3016;த&#3021;தத&#3009;. மல&#3015;ச&#3007;ய&#3006;, ப&#3007;ர&#3006;ன&#3021;ஸ&#3021;, ஹ&#3006;ங&#3021;க&#3006;ங&#3021;, ச&#3008;ன&#3006;, ஜப&#3021;ப&#3006;ன&#3021; உள&#3021;ள&#3007;ட&#3021;ட பல ந&#3006;ட&#3009;கள&#3009;க&#3021;க&#3009;ம&#3021; பயண&#3007;க&#3021;கத&#3021; த&#3018;டங&#3021;க&#3007;யத&#3009; நல&#3021;ல அன&#3009;பவம&#3006;க இர&#3009;ந&#3021;தத&#3009;.</div>
<div style="text-align: justify;">
<br /></div>
<div style="text-align: justify;">
ட&#3014;ல&#3021; ந&#3007;ற&#3009;வனத&#3021;த&#3007;ல&#3021; ச&#3014;ய&#3021;ய வ&#3015;ண&#3021;ட&#3007;ய பண&#3007; ஒன&#3021;ற&#3009;க&#3021;க&#3006;க ச&#3007;யர&#3021;ர&#3006; அட&#3021;ல&#3006;ண&#3021;ட&#3007;க&#3021; அன&#3009;ப&#3021;ப&#3007; வ&#3016;த&#3021;தத&#3009;. ஒன&#3021;றர&#3016; வர&#3009;டங&#3021;கள&#3009;க&#3021;க&#3009;ப&#3021; ப&#3007;றக&#3009; தங&#3021;களத&#3009; ந&#3007;ற&#3009;வனத&#3021;த&#3007;ல&#3015;ய&#3015; பண&#3007;க&#3021;க&#3009;ச&#3021; ச&#3015;ரச&#3021; ச&#3018;ல&#3021;ல&#3007;க&#3021; க&#3015;ட&#3021;ட&#3006;ர&#3021;கள&#3021;. ஒத&#3021;த&#3009;க&#3021; க&#3018;ண&#3021;ட&#3015;ன&#3021;. க&#3007;ட&#3021;டத&#3021;தட&#3021;ட ஆற&#3009; வர&#3009;டங&#3021;கள&#3009;க&#3021;க&#3009; அந&#3021;ந&#3007;ற&#3009;வனம&#3021;த&#3006;ன&#3021; த&#3006;ங&#3021;க&#3007;ப&#3021; ப&#3007;ட&#3007;த&#3021;தத&#3009;. 2015 ஆம&#3021; ஆண&#3021;ட&#3007;ல&#3007;ர&#3009;ந&#3021;த&#3009; ப&#3007;ற&#3007;த&#3018;ர&#3009; அம&#3014;ர&#3007;க&#3021;க ந&#3007;ற&#3009;வனத&#3021;த&#3007;ற&#3021;க&#3006;க பண&#3007;ய&#3006;ற&#3021;றத&#3021; த&#3018;டங&#3021;க&#3007;ய&#3007;ர&#3009;க&#3021;க&#3007;ற&#3015;ன&#3021;.</div>
<div style="text-align: justify;">
<br /></div>
<div style="text-align: justify;">
இட&#3016;ய&#3007;ல&#3021; 2008 ஆம&#3021; ஆண&#3021;ட&#3009; க&#3007;ர&#3009;ஷ&#3021;ணவ&#3015;ண&#3007;ய&#3016;த&#3021; த&#3007;ர&#3009;மணம&#3021; ச&#3014;ய&#3021;த&#3009; வ&#3016;த&#3021;த&#3006;ர&#3021;கள&#3021;. அட&#3009;த&#3021;த வர&#3009;டம&#3021; மக&#3007;நந&#3021;தன&#3021; ப&#3007;றந&#3021;த&#3006;ன&#3021;. எழ&#3009;த&#3009;வதற&#3021;க&#3009;ம&#3021; வ&#3006;ச&#3007;ப&#3021;பதற&#3021;க&#3009;ம&#3006;ன க&#3009;ட&#3009;ம&#3021;பச&#3021; ச&#3010;ழல&#3021; அம&#3016;ந&#3021;தத&#3009;. அதற&#3021;க&#3009; க&#3006;ரணம&#3007;ர&#3009;க&#3021;க&#3007;றத&#3009;. வ&#3015;ண&#3007;ய&#3007;ன&#3021; தங&#3021;க&#3016;ய&#3016; எனத&#3009; தம&#3021;ப&#3007;க&#3021;க&#3009;த&#3021; த&#3007;ர&#3009;மணம&#3021; ச&#3014;ய&#3021;த&#3009; வ&#3016;த&#3021;த&#3006;ர&#3021;கள&#3021;. ந&#3006;ன&#3021;க&#3009; ப&#3015;ர&#3009;க&#3021;க&#3009;ம&#3014;ன ப&#3014;ங&#3021;கள&#3010;ர&#3007;ல&#3021; வ&#3008;ட&#3009; கட&#3021;ட&#3007;ய ப&#3007;றக&#3009; அம&#3021;ம&#3006;வ&#3009;ம&#3021; அப&#3021;ப&#3006;வ&#3009;ம&#3021; எங&#3021;கள&#3019;ட&#3009; வந&#3021;த&#3009; ச&#3015;ர&#3021;ந&#3021;த&#3009; க&#3018;ண&#3021;ட&#3006;ர&#3021;கள&#3021;. அப&#3021;ப&#3006; வ&#3006;ச&#3009;த&#3015;வன&#3021; ம&#3007;ன&#3021;ச&#3006;ரவ&#3006;ர&#3007;யத&#3021;த&#3007;ல&#3021; பண&#3007;ய&#3007;ல&#3007;ர&#3009;ந&#3021;த&#3009; ஓய&#3021;வ&#3009; ப&#3014;ற&#3021;றவர&#3021;. அம&#3021;ம&#3006; ச&#3009;ப&#3021;ப&#3009;லட&#3021;ச&#3009;ம&#3007; க&#3007;ர&#3006;ம ந&#3007;ர&#3021;வ&#3006;க அல&#3009;வலர&#3006;க இர&#3009;ந&#3021;த&#3009; வ&#3007;ர&#3009;ப&#3021;ப ஓய&#3021;வ&#3009; ப&#3014;ற&#3021;ற&#3009;க&#3021; க&#3018;ண&#3021;ட&#3006;ர&#3021;. தம&#3021;ப&#3007;ய&#3007;ன&#3021; க&#3009;ழந&#3021;த&#3016; ய&#3009;வநந&#3021;தன&#3009;டன&#3021; ச&#3015;ர&#3021;த&#3021;த&#3009; வ&#3008;ட&#3021;ட&#3007;ல&#3021; எட&#3021;ட&#3009;ப&#3021; ப&#3015;ர&#3021;. வரவ&#3009; ச&#3014;லவ&#3009;, க&#3009;ட&#3009;ம&#3021;பத&#3021;த&#3016;ப&#3021; ப&#3006;ர&#3021;த&#3021;த&#3009;க&#3021; க&#3018;ள&#3021;ள&#3009;தல&#3021; என&#3021;ற எந&#3021;தப&#3021; ப&#3018;ற&#3009;ப&#3021;ப&#3009;ம&#3021; எனக&#3021;க&#3009; இல&#3021;ல&#3016;. வ&#3007;ட&#3021;ட&#3009;வ&#3007;ட&#3021;ட&#3006;ர&#3021;கள&#3021;. இப&#3021;பட&#3007; க&#3009;ட&#3009;ம&#3021;பப&#3021; ப&#3018;ற&#3009;ப&#3021;ப&#3009;ம&#3007;ல&#3021;ல&#3006;மல&#3021; இந&#3021;த வயத&#3007;ல&#3021; வ&#3006;ழ&#3021;க&#3021;க&#3016; வ&#3006;ய&#3021;ப&#3021;பத&#3009; வரம&#3021; என&#3021;ற&#3009; ப&#3009;ர&#3007;ந&#3021;த&#3009; க&#3018;ண&#3021;ட ப&#3019;த&#3009;த&#3006;ன&#3021; ந&#3007;சப&#3021;தம&#3021; அறக&#3021;கட&#3021;டள&#3016;ய&#3016;த&#3021; த&#3018;டங&#3021;க&#3009;ம&#3021; எண&#3021;ணம&#3021; உத&#3007;த&#3021;தத&#3009;.</div>
<div style="text-align: justify;">
<br /></div>
<div style="text-align: justify;">
இத&#3009;வர&#3016;ய&#3007;ல&#3009;ம&#3021; ய&#3019;ச&#3007;த&#3021;த&#3009;ப&#3021; ப&#3006;ர&#3021;த&#3021;த&#3006;ல&#3021; ந&#3007;சப&#3021;தம&#3021; அறக&#3021;கட&#3021;டள&#3016; நல&#3021;லத&#3018;ர&#3009; வ&#3014;ற&#3021;ற&#3007; என&#3021;ற&#3009;த&#3006;ன&#3021; ச&#3018;ல&#3021;ல வ&#3015;ண&#3021;ட&#3009;ம&#3021;. பல லட&#3021;ச ர&#3010;ப&#3006;ய&#3021;கள&#3021; நன&#3021;க&#3018;ட&#3016;ய&#3006;கக&#3021; க&#3007;ட&#3016;த&#3021;த&#3007;ர&#3009;க&#3021;க&#3007;றத&#3009;. பல பயன&#3006;ள&#3007;கள&#3009;க&#3021;க&#3009; உதவ ம&#3009;ட&#3007;ந&#3021;த&#3007;ர&#3009;க&#3021;க&#3007;றத&#3009;. எழ&#3009;த&#3021;த&#3009; வழ&#3007;ய&#3006;கச&#3021; ச&#3014;ய&#3021;ய ம&#3009;ட&#3007;ந&#3021;த ம&#3009;க&#3021;க&#3007;யம&#3006;ன க&#3006;ர&#3007;யம&#3021; இத&#3009; என&#3021;ற&#3009; ந&#3007;ன&#3016;த&#3021;த&#3009;க&#3021; க&#3018;ள&#3021;க&#3007;ற&#3015;ன&#3021;.<br />
<br />
ச&#3014;ன&#3021;ன&#3016;, கடல&#3010;ர&#3007;ல&#3021; வ&#3014;ள&#3021;ள ந&#3007;வ&#3006;ரணத&#3021;த&#3009;க&#3021;க&#3014;ன க&#3007;ட&#3021;டத&#3021;தட&#3021;ட அற&#3009;பத&#3009; லட&#3021;ச ர&#3010;ப&#3006;ய&#3021; ந&#3007;சப&#3021;தம&#3021; அறக&#3021;கட&#3021;டள&#3016;க&#3021;க&#3009; நன&#3021;க&#3018;ட&#3016;ய&#3006;க வந&#3021;த&#3007;ர&#3009;க&#3021;க&#3007;றத&#3009;.<br />
<br />
ம&#3010;ன&#3021;ற&#3006;ம&#3021; நத&#3007; என&#3021;ற ந&#3006;வல&#3009;ம&#3021; ஃப&#3006;ர&#3007;ன&#3021; ச&#3007;ட&#3007; என&#3021;ற உலகத&#3021; த&#3007;ர&#3016;ப&#3021;படங&#3021;கள&#3021; க&#3009;ற&#3007;த&#3021;த ப&#3009;த&#3021;தகம&#3009;ம&#3021; சம&#3008;பத&#3021;த&#3007;ல&#3021; வ&#3014;ள&#3007;ய&#3006;னவ&#3016;.<br />
<br />
2016 ஆம&#3021; ஆண&#3021;ட&#3009;க&#3021;க&#3006;ன ட&#3006;ப&#3021; 10 நம&#3021;ப&#3007;க&#3021;க&#3016; மன&#3007;தர&#3021;கள&#3007;ல&#3021; ஒர&#3009;வன&#3006;க ஆனந&#3021;த வ&#3007;கடன&#3006;ல&#3021; த&#3015;ர&#3021;ந&#3021;த&#3014;ட&#3009;க&#3021;கப&#3021;பட&#3021;ட&#3007;ர&#3009;க&#3021;க&#3007;ற&#3015;ன&#3021;.</div>
</div>
      
      
      
      
      `

    }



  }
  componentWillMount() {



  }

  componentWillUnmount() {

    if (this.props.postWebview) {
  //   this.props.togglePostWebview();
    }
  

    // alert('sasasasa');
    // this.props.getPostDetails();

  }


  componentDidMount() {

    // this.props.togglePostWebview();
  }





  sharePost() {

    //  alert(item.title.$t);

    Share.share({
      message: "http://www.nisaptham.com/2005/03/blog-post_26.html" + " - " + "1982 ஆம் ஆண்டு ஏப்ரல் 10 ஆம் தேதி பிறந்த எனது சொந்த ஊர் ஈரோடு மாவட்டத்தில் இருக்கும் கரட்டடிபாளையம் என்னும் சிற்றூர். இரண்டாம் வகுப்பு வரைக்கும் ஆங்கில வழிக் கல்வியில் படிக்க வைத்தார்கள். கோபியில் இயங்கிக் கொண்டிருந்த காந்தி கல்வி நிலையம்...",
      title: "வா.மணிகண்டன்",
      url: "http://www.nisaptham.com/2005/03/blog-post_26.html"

    }, {
        dialogTitle: "வா.மணிகண்டன்",
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ],
        tintColor: 'green'
      })



  }




  render() {

    return (
      <View style={[styles.container,{backgroundColor:this.props.theme.color}]}>


                <View style={{ width: deviceWidth, paddingTop: 10,paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../images/profileImage.png')} style={{ width: 80, height: 80, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: 10 }} >
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 26 }}>
                                வா. மணிகண்டன்
                            </Text>
                            <Text style={{ fontWeight: 'normal', color: '#ffffff', fontSize: 20 }}>
                                
                                நிசப்தம்
                            </Text>
                        </View >
                    </View>
                </View>

       <ScrollView
            onScroll={(event) => { this.setState({ scrollHead: event.nativeEvent.contentOffset.y }) }}
            ref='_scrollView'
            contentContainerStyle={{ padding: 10, backgroundColor: '#ffffff', }}>


            <HTMLView value={this.state.about} stylesheet={htmlStyles} />


            <Card style={{ width: deviceWidth,height:200 }}>

              <CardAction seperator={true} inColumn={false}>
                <CardButton
                  onPress={() => { this.sharePost() }}
                  title="பகிர்"
                  color={this.props.theme.color}
                  icon="share"
                />
              
              </CardAction>
            </Card>


          </ScrollView>
      


        {this.state.scrollHead > 20
          ? < TouchableOpacity
            onPress={() => { this.refs._scrollView.scrollTo({ X: 0, y: 0, animated: true }); }}
            style={{ position: 'absolute', right: 15, bottom: 15, padding: 0 }} >
            <Icon name="chevron-circle-up" size={60} color={this.props.theme.color} />
          </TouchableOpacity>
          : null
        }

       



      </View>
    );
  }
}

var htmlStyles = StyleSheet.create({
  div: {
    fontSize: 18,
    color: 'rgb(65,64,66)',
    backgroundColor: '#ffffff',
  },
  img: {
    width: 300,
    borderWidth: 20,
    borderColor: 'red',
    width: 10,
  },
  a: {
    fontSize: 20,
    color: '#0000ff',
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
    backgroundColor: '#ffffff',
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

  activityIndicator: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight
  }
});


const mapStateToProps = ({ Blog, Get, Settings }) => {
  console.log('Blog.postDetails ', Blog.postDetails);
  return ({
    Data: Get.Data,
    postDetails: Blog.postDetails,
    postDetailsLoader: Blog.postDetailsLoader,
    postPopup: Blog.postPopup,
    postWebview: Blog.postWebview,
    theme: Settings.theme
  })
}


const mapDispatchToProps = dispatch =>
  ({
    Get() { dispatch(Get()) }
  })

export default connect(mapStateToProps, { Get, getPostComments, togglePostWebview, togglePostPopup })(About)


