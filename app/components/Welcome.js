
import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Welcome = ({hide,theme}) => {

  return (
              <View style={[styles.container, { backgroundColor: theme.color }]}>


                <View style={{ width: deviceWidth, paddingTop: 20 ,position:'absolute',top:100}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../images/profileImage.png')} style={{ width: 80, height: 80, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: 10 }} >
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 30 }}>
                                நிசப்தம்
                            </Text>
                            <Text style={{ fontWeight: 'normal', color: '#ffffff', fontSize: 18 }}>
                                வா. மணிகண்டன்
                            </Text>
                        </View >
                    </View>
                </View>

           
                    <TouchableOpacity
                        onPress={() => hide() }
                        style={{ padding: 12, margin: 10, borderColor: '#ffffff', borderWidth: 2, 
                        borderRadius: 50, width: deviceWidth - 100 ,position:'absolute',bottom:100}} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, paddingLeft: 10 }}>
                                உள்ளே நுழைய
                       </Text>
                        </View>
                    </TouchableOpacity>

                  
                  
            






            </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  }
});

export default Welcome;


