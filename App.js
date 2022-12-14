import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Button, Dimensions, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedPage from './components/feedPage.js';
import ProfilePage from './components/profilePage.js';
import pfp from './assets/pfp.png';

import auth from './firebase.js';
import LoginPage from './components/loginPage.js'

import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from './firebase.js';
/*
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
*/
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const windowHeight = Dimensions.get('window').height - 250;
const windowHeightFull = Dimensions.get('window').height + 5;
const windowWidth = Dimensions.get('window').width;

export default function App() {
  return (
    <View>
      <LoginPage/>
    </View>
  );
};

/*
   <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Feed"
          component={Feed}/>
        <Tab.Screen
          name="Search"
          component={Search}/>
        <Tab.Screen
          name="Profile"
          component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer> 
*/

//Concept for profile button
/*
  <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>
*/

const Feed = ({ navigation }) => {
  return (
    <View>
      <FeedPage/>
    </View>
  )
}

const Profile = ({ navigation }) => {
  const [loadState, setLoadState] = useState(0)
  const [data, setData] = useState([])
    
  if (loadState == 0) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
        return;
    }
    if (request.status === 200) {
        console.log('success', request.responseText);
        ResObj = JSON.parse(request.response)
        setData(ResObj)
        setLoadState(2)
    } else {
        console.warn('error');
    }
    };
    request.open('GET', 'https://userend.herokuapp.com/get_user/636ef181373c83c3a85a2edf');
    request.send()
    setLoadState(1)
    return(
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }

  if ( loadState == 2 ) {
    if ( Platform.OS === 'ios' ) {
      return (
      <View 
      style={{
        backgroundColor: 'lightgrey',
        padding: 8,
        height: windowHeightFull,
        position: 'absolute',
        top: -2
      }}>
        <View
          style={{
            borderBottomWidth: 3,
            borderBottomColor: 'black',
            height: 220,
            left: -8,
            top: -10,
            width: windowWidth,
            backgroundColor: 'white'
          }}>
            <Image
            source={pfp}
            style={{
              height: 100,
              width: 100,
              borderRadius: 65,
              borderColor: 'black',
              borderWidth: 1,
              position: 'absolute',
              top: 35,
              left: 10
            }}
            />
            <Text
            style={{
              position: 'absolute',
              top: 135,
              left: 10,
              fontSize: 18
            }}> 
              {data.name} 
            </Text>
            <Text
            style={{
              position: 'absolute',
              top: 162.5,
              left: 15
            }}> 
              {data.description} 
            </Text>
        </View>
        <ProfilePage
        style={{
          top: -10,
          left: -8,
        }}/>
      </View>
      );
    } else {
      return (
        <View>
          <Text>
            Please View on iOS
          </Text>
        </View>
      )
    }
  }
}

const Search = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const updateText = (search) => {
    setSearch(search)
  }

  return(
    <View>
      <SearchBar
      placeholder="Search..."
      onChangeText={updateText}
      value={search}
      />
    </View>
  )
}

const Settings = ({ navigation }) => {
  return(
    <View>
      <Text>
        This is the settings page.
      </Text>
      <Button>
        Sign Out
      </Button>
    </View>
  )
}