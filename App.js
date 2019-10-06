/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import VideoComponent from './src/VideoComponent';

export default class App  extends React.Component{

  render(): boolean | number | string | React$Element<*> | React$Portal | Iterable | null {
    return (
        <VideoComponent videoWidth={640} videoHeight={640}
        url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}
        duration={634} title={'Easy Video Player'}/>
    )
  }

}
