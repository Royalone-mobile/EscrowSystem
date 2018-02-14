import { Platform } from 'react-native';

import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

const Styles = {
    textInputStyle: {
      ...Fonts.style.textInput,
      width: Metrics.buttonWidth - (Metrics.defaultMargin * 2),
      height: Metrics.buttonHeight,
      alignSelf: 'center',
      textAlign: 'left',
      color: Colors.PINK,
      borderBottomWidth:1,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5
      },
      buttonText: {
        
        fontSize: 35,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
      tagbutton: {
          flex: 1,
          borderRadius: 5
      },
      personInfotextInputStyle: {
        ...Fonts.style.textInput,
        width: Metrics.buttonWidth,
        height: 20,
        textAlign: 'left',
        margin: 10,
        paddingLeft: 10,
        color: Colors.textFourth,
        backgroundColor: 'transparent',
        borderBottomWidth:1,
      },
      nav: {
        paddingHorizontal: 10,
        alignItems: 'flex-end',
        backgroundColor:  Colors.nav,
        height: Metrics.navBarHeight, 
        borderBottomColor: Colors.colGray,
        borderBottomWidth: 1,
      },
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      overlay: {
        position: 'absolute',
        left: 300,
        right: 350,
        top: 500,
        bottom: 550,
        alignItems: 'center',
        justifyContent: 'center'
      }
}
export default Styles