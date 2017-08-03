/**
 * Created by ravindras on 11/02/17.
 */

import React from 'react';
import {View, Text,Dimensions} from 'react-native';

const deviceWidth=Dimensions.get("window").width;


const Card = ({children, cardStyle}) =>{
    return (
      <View style={[styles.containerStyle,cardStyle]}>
          {children}
      </View>
    );
};

const  styles={
    containerStyle:{
        elevation: 3,
      /* marginLeft: 5,
       paddingRight:5,*/

        backgroundColor:'#FFF',
        paddingLeft:20,
        paddingRight:20,
        marginTop:10,
        width:deviceWidth-20,

    }
}

export  {Card};