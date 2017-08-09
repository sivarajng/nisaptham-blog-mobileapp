
import React from 'react';
import {TouchableOpacity,Text} from 'react-native';

const Buttons = ({buttonStyle,children,buttonClick}) =>{
    return(

        <TouchableOpacity
            style={buttonStyle}
            onPress={buttonClick}>
            {children}
        </TouchableOpacity>
    )

}
export {Buttons}