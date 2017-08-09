
import React from 'react' ;
import {View,Text} from 'react-native';

const Label = ({textstyle,textContent,labelClick}) =>{

    return(



            <Text style={textstyle} onPress={labelClick}>{textContent}</Text>


    )

}



export {Label}