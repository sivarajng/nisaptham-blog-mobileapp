
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

  setTimeout(()=>{   hide() },5000);

  return (
              <View style={[styles.container, { backgroundColor: theme.color }]}>


                <View style={{ width: deviceWidth, paddingTop: 20 ,position:'absolute',top:20}}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../images/profileImage.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} >
                            <Text style={{ fontWeight: 'normal', color: '#ffffff', fontSize: 25 }}>
                                வா. மணிகண்டன் 
                            </Text>
                            <Text style={{ fontWeight: 'normal', color: '#ffffff', fontSize: 18 }}>
                                 எழுதும்
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 40 }}>
                                நிசப்தம்
                            </Text>
                            <Image source={require('../images/fishRound.png')} style={{ width: 70, height: 70, borderRadius: 50,marginTop:-10 }} />
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



   <View style={{ width: deviceWidth, paddingTop: 20 ,position:'absolute',bottom:10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../images/sivistaLogo.png')} style={{ width: 35, height: 35, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: 10 }} >
                            <Text style={{ fontWeight: 'normal', color: '#ffffff', fontSize: 12 }}>
                                an app by
                            </Text>
                            <Text style={{ fontWeight: 'normal', color: '#ffffff', fontSize: 16 ,fontWeight:'bold'}}>
                                Sivista
                            </Text>
                          
                        </View >
                    </View>
                </View>
                  
                  
            






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


