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
import Video from './video/video'
import GenMusic from './genMusic/genMusic'
import Piano from './piano/Piano'
import Record from './record/record'
import Slider from '@react-native-community/slider';

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
      rand:0.5,
      time:1.0,
      pianoMidis:[],//用户弹琴记录
    }
  }
  
  
  switchPiano = ()=>{
    this.setState({isShowPiano: !this.state.isShowPiano})
  }
  showAudio = ()=>{
    this.setState({isShowAudio: !this.state.isShowAudio})
  }
  showDrum = ()=>{
    this.setState({isShowDrum: !this.state.isShowDrum})
  }
  showVideo = ()=>{
    this.setState({isShowVideo: !this.state.isShowVideo})
  }
  
  closePiano = ()=>{
    this.setState({isShowPiano: !this.state.isShowPiano})
    this.setState({pianoMidis:[]})
  }


  genMusic = ()=> {
    let tt=this;
    for(let i=0;i<tt.state.pianoMidis.length;i++){
      setTimeout(function(){
        let file = genMusic.getFile(tt.state.pianoMidis[i])
        var whoosh = new Sound(file, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          whoosh.play();
        });
      },tt.state.time*1000*(Math.random() * tt.state.rand*0.2 + 1)*i) //速度在1-5之间调整
    }
    
    // for(let i=1;i<20;i++){
    //   setTimeout(function(){
    //       let note=genMusic.getNote(36,88)
    //       notes.push(note)
    //       tt.onPlay(note,note);
    //   },tt.state.rate*800*(Math.random() * tt.state.rand + (1- tt.state.rand))*i)
    // }
  }

  onPlay = (note,midi)=>{
    console.log(note,"__",midi)
    Sound.setCategory('Playback');

    let file = genMusic.getFile(midi);
    var whoosh = new Sound(file, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      whoosh.play();
    });
    }

    onEnd = (note,midi)=>{
      console.log(note,"__",midi)
  
      let pianoMidis = [...this.state.pianoMidis]
      pianoMidis.push(midi)
      this.setState({pianoMidis:pianoMidis})
  
      }
      changeRand = (val) => {
        this.setState({rand:val})
      }
      changeRate = (val) => {
        this.setState({time: 1/val})
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
                  onPress={this.switchPiano}
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
              <View style={styles.randomWrapper}>
                <Text style={styles.randText}>Random</Text>
                <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={20}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={1}
                onValueChange={this.changeRand}
                />
              </View>
              <View style={styles.randomWrapper}>
                <Text style={styles.randText}>  Speed  </Text>
                <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={20}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={1}
                onValueChange={this.changeRate}
                />
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
          <View style={styles.header}>
            <TouchableHighlight
              onPress={this.closePiano}
              underlayColor='#a7b11c'
              style={styles.homeWrapper}
              >
              <Image
              style={styles.home}
              source={require('./img/home.png')}></Image>
             </TouchableHighlight>
              <TouchableHighlight
              onPress={this.switchPiano}
              underlayColor='#a7b11c'
              style={styles.checkWrapper}
              >
              <Image
              style={styles.home}
              source={require('./img/check.png')}></Image>
             </TouchableHighlight>
          </View>
          
           <Record/>
           <View
            style={styles.pianoWrapper}>
                <Piano
                onPlayNoteInput={this.onPlay}
                onStopNoteInput={this.onEnd}
                firstNote='c2'
                lastNote='e3'/>
                <Piano
                onPlayNoteInput={this.onPlay}
                onStopNoteInput={this.onEnd}
                firstNote='c3'
                lastNote='e4'/>
                <Piano
                onPlayNoteInput={this.onPlay}
                onStopNoteInput={this.onEnd}
                firstNote='c4'
                lastNote='e5'/>
                <Piano
                onPlayNoteInput={this.onPlay}
                onStopNoteInput={this.onEnd}
                firstNote='c5'
                lastNote='e6'/>
            </View>
            
         </Modal>

          <Modal
          visible={this.state.isShowAudio}>     
             <View style={styles.header}>
            <TouchableHighlight
              onPress={this.showAudio}
              underlayColor='#a7b11c'
              style={styles.homeWrapper}
              >
              <Image
              style={styles.home}
              source={require('./img/home.png')}></Image>
             </TouchableHighlight>
              <TouchableHighlight
              onPress={this.showAudio}
              underlayColor='#a7b11c'
              style={styles.checkWrapper}
              >
              <Image
              style={styles.home}
              source={require('./img/check.png')}></Image>
             </TouchableHighlight>
          </View>
            <Audio />
          </Modal>

          <Modal
          visible={this.state.isShowVideo}>     
             
             <View style={styles.header}>
            <TouchableHighlight
              onPress={this.showVideo}
              underlayColor='#a7b11c'
              style={styles.homeWrapper}
              >
              <Image
              style={styles.home}
              source={require('./img/home.png')}></Image>
             </TouchableHighlight>
              <TouchableHighlight
              onPress={this.showVideo}
              underlayColor='#a7b11c'
              style={styles.checkWrapper}
              >
              <Image
              style={styles.home}
              source={require('./img/check.png')}></Image>
             </TouchableHighlight>
          </View>
            <Video />
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
  header:{
    flexDirection:'row',
    backgroundColor:'#fdf2dc',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    alignContent:'space-between'
  },
  upWrapper:{
    flexDirection:'row',
    flex:11,

  },
  musics:{
      flex:2,
      justifyContent:'space-around',
      paddingBottom:35,
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
  },
  homeWrapper:{
    width:60,
    height:60,
    backgroundColor:'#985978',
    margin:10,
    borderRadius:20,
  },
  checkWrapper:{
    width:60,
    height:60,
    backgroundColor:'#985978',
    margin:10,
    borderRadius:20,
  },
  home:{
    margin:10,
    width:40,
    height:40,
    alignSelf:'center',
  },
  slider:{
    width:280,
    height:5,
    alignSelf:'center',
  },
  randText:{
    color:'#555555',
    fontSize:15,
    fontWeight:"bold",
    alignSelf:'center',
  },
  randomWrapper:{
    flexDirection:'row',
    padding:20,
    height:5,
  }
});


