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
  Platform,
  TouchableHighlight,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Audio from './audio/audio'
import Drum from './drum/drum'
import Video from './video/video'
import GenMusic from './genMusic/genMusic'
import Piano from './piano/Piano'
import Record from './record/record'

const Sound=require('react-native-sound')
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
    let tt=this;
    var rand = 0.5;
    var rate = 1.0;
    for(let i=1;i<20;i++){
      setTimeout(function(){
          let note=genMusic.getNote(36,88)
          notes.push(note)

          tt.onPlay(note,note);
      },rate*800*(Math.random() * rand + (1-rand))*i)
    }
//    genMusic.genMusic(notes)
  }

  onPlay(note,midi){
    console.log("开始啦")
    console.log(note,"__",midi)
    Sound.setCategory('Playback');
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.

    let file = genMusic.getFile(midi);
    var whoosh = new Sound(file, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      whoosh.play();
    });
    }

  
  render(){
    return (
      <>
          <View style={styles.view}>

            <View style={styles.upWrapper}>
              <View style={styles.buttonsWrapper}>
                  <TouchableHighlight
                  onPress={this.showVideo}
                  underlayColor='#a7b11c'
                  style={styles.video}
                  >
                    <Image
                    style={styles.icon}
                    source={require('./img/video.png')}></Image>
                  </TouchableHighlight>

                  <TouchableHighlight
                  onPress={this.showAudio}
                  underlayColor='#a7b11c'
                  style={styles.audio}
                  >
                    <Image
                    style={styles.icon}
                    source={require('./img/mic.png')}></Image>
                  </TouchableHighlight>

                  <TouchableHighlight
                  onPress={this.showPiano}
                  underlayColor='#a7b11c'
                  style={styles.piano}
                  >
                    <Image
                    style={styles.icon}
                    source={require('./img/piano.png')}></Image>
                  </TouchableHighlight>
                </View>

                <View style={styles.musics}>
                    <Image
                      style={styles.music}
                        source={require('./img/music.png')}></Image>
                    <Image
                      style={styles.music}
                        source={require('./img/music.png')}></Image>
                    <Image
                      style={styles.music}
                        source={require('./img/music.png')}></Image>
                </View>
              </View>

              <View style={styles.playWrapper}>
                <TouchableHighlight
                onPress={this.genMusic}
                underlayColor='#a7b11c'
                style={styles.genMusic}
                >
                  <Image
                  style={styles.icon}
                  source={require('./img/play.png')}></Image>
                </TouchableHighlight>
              </View>
          </View>

          
          <Modal
          visible={this.state.isShowPiano}
          >    
           <Record/>
           <View
            style={styles.pianoWrapper}>
                <Piano
                onPlayNoteInput={this.onPlay}
                onStopNoteInput={this.onPlay}
                firstNote='c2'
                lastNote='e3'/>
                <Piano
                onPlayNoteInput={this.onPlay}
                onStopNoteInput={this.onPlay}
                firstNote='c3'
                lastNote='e4'/>
                <Piano
                onPlayNoteInput={this.onPlay}
                onStopNoteInput={this.onPlay}
                firstNote='c4'
                lastNote='e5'/>
                <Piano
                onPlayNoteInput={this.onPlay}
                onStopNoteInput={this.onPlay}
                firstNote='c5'
                lastNote='e6'/>
            </View>
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
    flex:1
  },
  headerText:{
    fontSize:30,
    textAlign:'center',
    padding:50,
    fontWeight: '700',
    color: '#555555'
  },
  upWrapper:{
    flexDirection:'row',
    flex:11,

  },
  musics:{
      flex:2,
      justifyContent:'space-around',
      paddingBottom:100,
      paddingTop:60,
      marginLeft:-30
  },
  buttonsWrapper :{
    alignContent:'center',
    alignItems:'flex-start',
    flex:1
  },
  icon :{
    margin:10,
    width:60,
    height:60,
    alignSelf:'center',
  },
  video:{
    width:80,
    height:80,
    backgroundColor:'#f2af22',
    justifyContent:'center',
    borderRadius:20,
    margin:20,
    marginTop:80
  },
  audio:{
    width:80,
    height:80,
    backgroundColor:'#d93732',
    justifyContent:'center',
    borderRadius:20,
    margin:20,
  },
  piano:{
    width:80,
    height:80,
    backgroundColor:'#985978',
    justifyContent:'center',
    margin:20,
    borderRadius:20,
  },
  genMusic:{
    width:120,
    height:120,
    backgroundColor:'#fdf2dc',
    justifyContent:'center',
    borderRadius:20,
  },
  playWrapper:{
    backgroundColor:'#a7b11c',
    flex:4,
    alignItems:'center',
    justifyContent:'center'
  },
  music:{
    width:220,
    height:80,
  },
  pianoWrapper:{
    backgroundColor:'red',
    flex:1
  }
});


