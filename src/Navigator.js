import React from 'react'
import {Platform, View} from 'react-native'
import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation'
import {colors} from './utils/constants.js'


import { Sidebar, Navbar } from './components'

import Splash from './screens/Splash'
import SignUp from './screens/Auth/SignUp'
import Login from './screens/Auth/Login'
import AccountType from './screens/Auth/AccountType'
import PersonInfo from './screens/Auth/PersonInfo'
import { Dashboard as creativeDashboard, BriefList, Settings } from './screens/Creatives'
import { Dashboard as clientDashboard, CreativeList, Settings as clientSettings } from './screens/Clients'

import SingleBrief from './screens/SingleBrief'
import Messages from './screens/Messages'
import SingleMessage from './screens/SingleMessage'
import GroupScreen from './screens/Chat/GroupScreen';
import ChatScreen from './screens/Chat/ChatScreen';

const messageStack = StackNavigator({
  MessageList: {
    screen: GroupScreen
  },
  SingleMessage: {
    screen: SingleMessage
  }
})


// CREATIVE ROUTE NAV

const creativeDashboardStack = StackNavigator({
  Dashboard: {
    screen: creativeDashboard
  },
  Brief: {
    screen: SingleBrief
  },
  MessageList: {
    screen: GroupScreen
  },
  SingleMessage: {
    screen: ChatScreen
  }
}, {
  navigationOptions: ({navigation}) => ({
    header: () => (<Navbar {...navigation} />)
  })
})


const creativeBriefStack = StackNavigator({
  BriefList: {
    screen: BriefList
  },
  Brief: {
    screen: SingleBrief
  },
  MessageList: {
    screen: GroupScreen
  },
  SingleMessage: {
    screen: ChatScreen
  }
}, {
  navigationOptions: ({navigation}) => ({
    header: () => (<Navbar {...navigation} />)
  })
})

const creativeSettingsStack = StackNavigator({
  Settings: {
    screen: Settings
  },
  MessageList: {
    screen: GroupScreen
  },
  SingleMessage: {
    screen: ChatScreen
  }
}, {
  navigationOptions: ({navigation}) => ({
    header: () => (<Navbar {...navigation} />)
  })
})

//Client NAV ROUTE
const clientDashboardStack = StackNavigator({
  Dashboard: {
    screen: clientDashboard
  },
  Brief: {
    screen: SingleBrief
  },
  MessageList: {
    screen: GroupScreen
  },
  SingleMessage: {
    screen: ChatScreen
  },
  CreativeList: {
    screen: CreativeList
  }
}, {
  navigationOptions: ({navigation}) => ({
    header: () => (<Navbar {...navigation} />)
  })
})

const clientCreativeStack = StackNavigator({
  CreativeList: {
    screen: CreativeList
  },
  Brief: {
    screen: SingleBrief
  },
  MessageList: {
    screen: GroupScreen
  },
  SingleMessage: {
    screen: ChatScreen
  }
}, {
  navigationOptions: ({navigation}) => ({
    header: () => (<Navbar {...navigation} />)
  })
})

const clientSettingsStack = StackNavigator({
  Settings: {
    screen: clientSettings
  },
  MessageList: {
    screen: GroupScreen
  },
  SingleMessage: {
    screen: ChatScreen
  }
}, {
  navigationOptions: ({navigation}) => ({
    header: () => (<Navbar {...navigation} />)
  })
})

// MAIN NAV OUTPUT

//Creative DrawerNavigator
const CreativeDrawer = DrawerNavigator({
  Dashboard: { screen: creativeDashboardStack },
  Briefs: { screen: creativeBriefStack },
  Settings: { screen: creativeSettingsStack },
  Logout: {screen: Login}
}, {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: props => <Sidebar {...props} />
})
//Client DrawerNavigator
const ClientDrawer = DrawerNavigator({
  Dashboard: { screen: clientDashboardStack },
  Settings: { screen: clientSettingsStack },
  Logout: {screen: Login}
}, {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: props => <Sidebar {...props} />
})

//Main Navigator
const Navigation = StackNavigator({
  Splash: {screen: Splash},
  Login: {screen: Login},
  AccountType: {screen: AccountType},
  PersonInfo: {screen: PersonInfo},
  SignUp: {screen: SignUp},
  Creative: { screen: CreativeDrawer },
  Client: {screen:ClientDrawer}
}, {
  initialRouteName: 'Splash',
  navigationOptions: ({navigation}) => ({
    
    header: () => (<Navbar {...navigation} />)
  }),
  headerMode: 'screen',
  lazyLoad: true
})

export default Navigation
