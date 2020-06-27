/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Modal,
  NativeModules,
  NativeEventEmitter,
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Piano from './piano/Piano';
import Audio from './audio/audio'
import Drum from './drum/drum'
import Video from './video/video'
import Record from './record/record'
import GenMusic from './genMusic/genMusic'
const Sound = require('react-native-sound');
const genMusic = new GenMusic('dq')
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isShowPiano:false,
      isShowAudio:false,
      isShowDrum:false,
      isShowVideo:false,
    }
  }
  
  
  showPiano = ()=>{
    console.log("hello")
    this.setState({isShowPiano: !this.state.isShowPiano})
  }
  showAudio = ()=>{
    console.log("hello")
    this.setState({isShowAudio: !this.state.isShowAudio})
  }
  showDrum = ()=>{
    console.log("hello")
    this.setState({isShowDrum: !this.state.isShowDrum})
  }
  showVideo = ()=>{
    console.log("hello")
    this.setState({isShowVideo: !this.state.isShowVideo})
  }
  genMusic = ()=> {
    let notes =[]
    for(let i=1;i<100;i++){
      let note=genMusic.getNote(1,13)
      notes.push(note)
    }
    genMusic.genMusic(notes)
  }

  onPlay(note,midi){
    console.log("开始啦")
    console.log(note,"__",midi)
    Sound.setCategory('Playback');
    // Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.

let file=require("./piano/midi/Alert.mp3")
var whoosh = new Sound(file, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

  // Play the sound with an onEnd callback
  whoosh.play((success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
});
  }
  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
          <View style={styles.view}>
            <Text style={styles.headerText}>Shadiao Music</Text>
            <View style={styles.buttonsWrapper}>
                <View style={styles.buttonStyle}>
                  <Button
                  title='视频提取'
                  onPress={this.showVideo}
                  ></Button>
                </View>

                <View style={styles.buttonStyle}>
                  <Button
                  title='音频提取'
                  onPress={this.showAudio}></Button>
                </View>

                <View style={styles.buttonStyle}>
                  <Button
                  title='重力鼓点'
                  onPress={this.showDrum}></Button>
                </View>
        
                <View style={styles.buttonStyle}>
                  <Button
                  title='钢琴'
                  onPress={this.showPiano}></Button>
                </View>

                <View style={styles.buttonStyle}>
                  <Button
                  title='生成音乐'
                  onPress={this.genMusic}></Button>
                </View>

            </View>
          </View>

          
          <Modal
          visible={this.state.isShowPiano}>    
          <Record/> 
            <Piano
            onPlayNoteInput={this.onPlay}
            onStopNoteInput={this.onPlay}/>
            <Piano
            onPlayNoteInput={this.onPlay}
            onStopNoteInput={this.onPlay}/>
            <Piano
            onPlayNoteInput={this.onPlay}
            onStopNoteInput={this.onPlay}/>
            <Piano
            onPlayNoteInput={this.onPlay}
            onStopNoteInput={this.onPlay}/>
            <Button 
            title="返回"
            onPress={this.showPiano}></Button>
         </Modal>

          <Modal
          visible={this.state.isShowAudio}>     
              <Audio />
              <Button 
              title="返回"
              onPress={this.showAudio}></Button>
          </Modal>

          <Modal
          visible={this.state.isShowDrum}>     
              <Drum />
              <Button 
              title="返回"
              onPress={this.showDrum}></Button>
          </Modal>

          <Modal
          visible={this.state.isShowVideo}>     
              <Video />
              <Button 
              title="返回"
              onPress={this.showVideo}></Button>
          </Modal>
      </>
      );
    }
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


