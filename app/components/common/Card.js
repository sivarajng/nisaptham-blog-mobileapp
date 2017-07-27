/**
 * Created by ravindras on 11/02/17.
 */

import React from 'react';
import {View, Text} from 'react-native';

const Card = ({children, cardStyle}) =>{
    return (
      <View style={[styles.containerStyle,cardStyle]}>
          {children}
      </View>
    );
};

const  styles={
    containerStyle:{
        elevation: 1,
      /* marginLeft: 5,
       paddingRight:5,*/

        backgroundColor:'#FFF',
        paddingLeft:20,
        paddingRight:20,
        marginTop:10,

    }
}

export  {Card};