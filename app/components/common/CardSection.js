/**
 * Created by ravindras on 11/02/17.
 */
import React from 'react';
import { View} from 'react-native';

const CardSection= ({children,cardSectionStyle}) =>{
    return(
        <View style={[styles.containerStyle,cardSectionStyle]}>
            {children}
        </View>
    );
};

const styles={

    containerStyle:{
        justifyContent:'flex-start',
        position: 'relative',
        paddingTop:10,
        paddingBottom:10,



    }
}

export {CardSection};