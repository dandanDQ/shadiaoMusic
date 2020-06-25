/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Piano from './Piano.js';
const App: () => React$Node = () => {
  function onPlay(note,midi){
    console.log("开始啦")
    console.log(note,"__",midi)
  };
  return (
    <>
    <Piano
        onPlayNoteInput={onPlay}
        onStopNoteInput={onPlay}/>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.view}>
          <Text style={styles.headerText}>Shadiao Music</Text>
        <View style={styles.buttonsWrapper}>
          <View style={styles.buttonStyle}>
          <Button
          title='摄像头'
          ></Button>
           </View>
          <View style={styles.buttonStyle}>
          <Button
          title='麦克风'></Button>
          </View>
          <View style={styles.buttonStyle}>
          <Button
          title='陀螺仪'></Button>
          </View>
          <View style={styles.buttonStyle}>
          <Button
          title='节拍速度'></Button>
          </View>
          <View style={styles.buttonStyle}>
          <Button
          title='生成音乐'></Button>
          </View>
        </View>
        </View>
        <Piano
        onPlayNoteInput={onPlay}
        onStopNoteInput={onPlay}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fdf2dc',
  },
  headerText:{
    fontSize:30,
    textAlign:'center',
    padding:50,
    fontWeight: '700',
    color: '#555555'
  },
  buttonStyle :{
    margin:10,
    width:200,
    height:50,
    alignContent:'stretch',
  },
  buttonsWrapper :{
    alignContent:'stretch',
  }
});

export default App;
