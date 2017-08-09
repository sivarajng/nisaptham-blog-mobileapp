import { StyleSheet, Dimensions, Platform } from 'react-native';
var device = Dimensions.get('window');

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)'
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    console.log("math value" + Math.round(value));
    return Math.round(value);
}

export default StyleSheet.create({
    floatingNavigationSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //  width:device.width-20,
        borderColor: '#1D527F',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        backgroundColor: '#1D527F',
        //  opacity:0.7,
        flex: 1,
        height: 47,
        alignSelf: 'center',
        //boxShadow:5,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
    },
    bgImgStyles: {
        width: device.width,
        marginTop: (Platform.OS === 'ios') ? 13 : 0,
    },
    /*Common Font family*/

    opensansRegular: {
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans' : 'opensans',
    },
    opensansSemiBold: {
        // fontFamily: (Platform.OS === 'ios') ? 'OpenSans-Semibold' : 'opensanssemibold',
    },
    opensansBold: {
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans-Bold' : 'opensansbold',
    },
    flex1: {
        flex: 1
    },
    /*Common Font sizes*/
    fontSize11: {
        fontSize: wp(3),
    },
    fontSize12: {
        fontSize: 12,
    },
    fontSize13: {
        fontSize: 13,
    },
    fontSize14: {
        fontSize: wp(3.5),
    },
    fontSize16: {
        //  fontSize: 16,
    },
    fontSize18: {
        //    fontSize: 18,
    },
    fontSize20: {
        fontSize: wp(4.5),
    },
    fontSize21: {
        fontSize: 21,
    },
    fontSize24: {
        fontSize: 24
    },
    fontSize26: {
        fontSize: 26,
    },
    /* Common styles*/

    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    flex3: {
        flex: 3
    },
    flex4: {
        flex: 4
    },
    flex5: {
        flex: 5
    },
    flex6: {
        flex: 6
    },
    positionAbsolute: {
        position: 'absolute'
    },
    positionRelative: {
        position: 'relative'
    },
    directionRow: {
        flexDirection: 'row',
        alignItems: 'center',


    },
    widthFull: {
        width: device.width,
        resizeMode: 'stretch'
    },
    paddingLeft10: {
        paddingLeft: 10
    },
    paddingRight10: {
        paddingRight: 10
    },
    directionColumn: {
        flexDirection: 'column',


    },
    justifyStart: {
        justifyContent: 'flex-start'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    justifyEnd: {
        justifyContent: 'flex-end'
    },
    alignStart: {
        alignItems: 'flex-start'
    },
    alignCenter: {
        alignItems: 'center'
    },
    alignEnd: {
        alignItems: 'flex-end',
        //marginRight:10
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    wrapFlex: {
        flexWrap: 'wrap'
    },
    paddingHorizontal5: {
        paddingHorizontal: 5
    },
    paddingHorizontal10: {
        paddingHorizontal: 10
    },
    paddingHorizontal15: {
        paddingHorizontal: 15
    },
    paddingHorizontal20: {
        paddingHorizontal: 20
    },
    paddingVertical5: {
        paddingVertical: 5
    },
    paddingVertical10: {
        paddingVertical: 10
    },
    paddingVertical15: {
        paddingVertical: 15
    },
    paddingVertical20: {
        paddingVertical: 20
    },
    colorBlack: {
        color: 'rgb(39,39,39)'
    },
    colorLightGrey: {
        color: 'rgb(119,119,119)'
    },
    colorSkyBlue: {
        color: 'rgb(7,124,229)'
    },
    colorRed: {
        color: 'rgb(237,28,36)'
    },
    colorWhite: {
        color: 'rgb(255,255,255)'
    },
    colorGrey: {
        color: 'rgb(188,200,206)'
    },
    colorCement: {
        color: 'rgb(144,170,190)'
    },
    colorOrange: {
        color: 'rgb(242,113,32)'
    },
    backgroundGrey: {
        backgroundColor: 'rgb(240,247,247)'
    },
    backgroundOrange: {
        backgroundColor: 'rgb(242,113,32)'
    },
    backgroundTransparent: {
        backgroundColor: 'transparent'
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    textColor: {
        color: 'rgb(39,393,39)'
    },
    roundedBorders: {
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
    texAlingCenter: {
        textAlign: 'center'
    },
    roundedBorderColor: {
        borderLeftColor: "#FFF",
        borderRightColor: "#FFF"
    },
    /*Carousel Indicator Line styles*/

    indicatorLineImage: {
        width: 50,
        height: 1
    },
    /*Dashboard Common styles*/



    profileNameStyle: {
        fontSize: 16,
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans-Bold' : 'opensansbold',
        color: 'rgb(39,39,39)',
        // alignItems:'flex-start',
        textAlign: 'left',
    },

    profileStatusStyle: {
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans' : 'opensansregular',
        fontSize: 14,
        color: 'rgb(119,119,119)',
    },
    dotStyle: {
        backgroundColor: '#777777',
        borderRadius: 50,
        width: 4,
        height: 4,
        alignSelf: 'center',
        marginHorizontal: 3
    },
    textDirection: {
        flexDirection: 'row',
        alignItems: 'center',



    },

    rightIconView: {
        flex: 1, flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    selected: {
        color: 'rgb(255,255,255)'
    },
    dummyView: { flex: 2, flexDirection: 'row', justifyContent: 'space-around' },
    commentViewStyle: {
        flexDirection: 'row',
        flex: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    bottomCardSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },

    ViewDirection: {
        flexDirection: 'row',
        paddingTop: 20

    },
    profileTextStyle: {
        flexDirection: 'column',
        flex: 3,
        justifyContent: 'center',
        paddingVertical: 10,
        alignItems: 'flex-start',
    },

    likesText: {
        color: '#077ce5',
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans' : 'opensansregular',
        fontSize: 13
    },
    textView: {
        flex: 1,
    },
    reportTextStle: {
        color: 'red',
        fontSize: 13,
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans' : 'opensansregular',
    },
    profileAvatarImg: {
        flex: 2,
        justifyContent: 'center',
    },
    profileViewStyle: {
        flexDirection: 'row',
        //  flex:1,

    },
    reportView: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    ProfileView: {
        flex: 3,
        flexDirection: 'row',


    },
    dashboardContanerStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DDD',


    },
    paragraphStyle: {
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans' : 'opensansregular',
        fontSize: 16,
        color: 'rgb(119,119,119)',
        textAlign: 'left',

    },
    titleText: {
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans-Bold' : 'opensansbold',
        fontSize: 24,
        color: 'rgb(39,39,39)',
        //lineHeight:24

    },


    buttonStyle: {
        borderWidth: 1,
        borderColor: '#f27120',
        borderRadius: 30,
        backgroundColor: '#f27120',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'center',


    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 20,
    },
    fontStyleForcomment: {
        color: 'blue',
    },
    fontStyle: {
        fontSize: 18,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
    DetaillikesText: {
        color: '#777777',
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans' : 'opensansregular',

    },
    followBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    followBtnTextStyle: {
        color: '#fff',
        fontSize: 13,
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans-Bold' : 'opensansbold',
        alignSelf: 'center',
        position: 'absolute',
        top: 30,
        backgroundColor: 'transparent',
        left: 20

    },
    profileView: {
        flex: 3,
        width: device.width,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'rgb(155,201,225)',
        paddingVertical: 15,
        // height:220,
    },
    badgeView: {
        // flex:3,
        width: device.width,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'rgb(12,38,97)',
        paddingVertical: 15,
        height: 220,
    },

    /*Common styles for blue rounded buttons*/
    btnViewStyle: {
        borderRadius: 22,
        backgroundColor: 'rgb(7,124,229)',
        paddingVertical: 10,
        paddingHorizontal: 12,
        paddingRight: 20,
        marginTop: 15,
        marginRight: 5
    },
    btnViewStyleSelected: {
        borderRadius: 22,
        backgroundColor: 'rgb(7,124,229)',
        borderColor: 'rgb(7,124,229)',
        borderWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 12,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 5
    },
    btnViewStyleUnselected: {
        borderRadius: 22,
        borderColor: 'rgb(7,124,229)',
        borderWidth: 2,
        backgroundColor: 'rgb(255,255,255)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 5
    },
    selectedBtnTxtStyle: {
        color: 'rgb(255,255,255)',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginRight: 0,
        // marginRight: 20,
    },

    unselectedBtnTxtStyle: {
        color: 'rgb(7,124,229)',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginRight: 0,
        // marginRight: 20,
    },
    closeIconStyle: {
        position: 'absolute',
        right: 12,
        top: 14
    },
    /* Information Bar styles*/
    informationBarMain: {
        backgroundColor: '#1D527F',
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        zIndex: 9999
    },
    bgImgStyle: {
        flex: 1,
        backgroundColor: '#1D527F',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabView: {
        flex: 3,
        flexDirection: 'row',
    },
    tabsStyle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10
    },
    tabText: {
        color: 'rgb(144,170,190)',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'OpenSans-Bold' : 'opensansbold',
    },
    spinnerTop: {
        top: wp(65),
        left: wp(35)
    },

    /*ADD button*/
    addButtonMain: {
        alignItems: 'center',
        paddingHorizontal: 20,
        bottom: 0,
        position: 'absolute',
        width: device.width,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'transparent',
    },
    btnSubmitStyle: {
        borderWidth: 1,
        /*borderColor:'#f27120',*/
        borderColor: 'rgb(242,113,32)',
        backgroundColor: 'rgb(242,113,32)',

    },
    addFvrtBtn: {
        paddingVertical: 7,
        borderRadius: 25,
        width: 150,
        paddingHorizontal: 30
    },
    btnTextAddStyle: {
        color: 'rgb(255,255,255)',
        textAlign: 'center',
    },
    /*Common styles for blue rounded buttons*/


    /**Header common styles*/
    HeaderMainView: {
        backgroundColor: '#077CE5',
        height: wp(18),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        elevation: 2,

        // paddingTop:15,
    },
    leftButtonStyle: {
        width: 33, height: 33, marginTop: -8, marginLeft: wp(3)
    },

    headerTextViewStyle: { flex: 1, paddingRight: 10, justifyContent: 'center', alignItems: 'flex-end' },
    headerRightText: { flex: 1, paddingRight: 10, justifyContent: 'center', alignItems: 'flex-end' },
    headerTxt: { flex: 1, alignItems: 'center', justifyContent: 'center', },
    headerCloseStyle: { flex: 1, paddingLeft: 10, alignItems: 'flex-start', justifyContent: 'center' },
    headerImg: { flexDirection: 'row', backgroundColor: 'rgb(7,124,229)' },
    headerTitle: { color: '#fff' },
    closeHeaderImgStyle: { width: 33, height: 33 },

    listLoadMore: {
        alignItems: 'center',
        paddingHorizontal: 20,
        bottom: 20,
        position: 'absolute',
        width: device.width - 150,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        //  width:device.width-20,
        borderColor: '#1D527F',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        //  opacity:0.7,
        alignSelf: 'center',
        //boxShadow:5,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        marginTop: 50,
        left: wp(19)


    },
    listLoadMoreSearch: {

        alignItems: 'center',
        paddingHorizontal: 20,
        bottom: 80,
        position: 'relative',
        width: device.width - 150,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',

        //flex: 1,


        flexDirection: 'row',
        justifyContent: 'space-around',
        //  width:device.width-20,
        borderColor: '#1D527F',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        // backgroundColor: 'red',
        backgroundColor: 'transparent',
        //  opacity:0.7,


        alignSelf: 'center',
        //boxShadow:5,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
    }



});