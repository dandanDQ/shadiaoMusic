/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {AudioRecorder, AudioUtils} from 'react-native-audio'
import Sound from 'react-native-sound';
import React,{Component}  from 'react';
import {
  NativeModules,
  SafeAreaView,
  TouchableHighlight,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  PermissionsAndroid,
} from 'react-native';

var AudioRecorderManager = NativeModules.AudioRecorderManager;

export default class Record extends Component{
    constructor(props){
        super(props);
        this.state = {
          currentTime: 0.0,                                                   //开始录音到现在的持续时间
          recording: false,                                                   //是否正在录音
          stoppedRecording: false,                                            //是否停止了录音
          pausedRecording: false,                                            //是否停止了录音
          finished: false,                                                    //是否完成录音
          audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',          //路径下的文件名
          hasPermission: undefined,
        };

        this.prepareRecordingPath = this.prepareRecordingPath.bind(this);     //执行录音的方法
        this.checkPermission = this.checkPermission.bind(this);               //检测是否授权
        this.record = this.record.bind(this);                                 //录音
        this.stop = this.stop.bind(this);                                     //停止
        this.play = this.play.bind(this);                                     //播放
        this.pause = this.pause.bind(this);                                   //暂停
        this.finishRecording = this.finishRecording.bind(this);
      }

    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Low",            //录音质量
          AudioEncoding: "aac",           //录音格式
          AudioEncodingBitRate: 32000     //比特率
        });
    }

    checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': '获取录音权限',
      'message': 'XXX正请求获取麦克风权限用于录音,是否准许'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        // alert(result);     //结果: granted ,    PermissionsAndroid.RESULTS.GRANTED 也等于 granted
        return (result === true || PermissionsAndroid.RESULTS.GRANTED)
      })
    }

    async record() {
        // 如果正在录音
        if (this.state.recording) {
          alert('正在录音中!');
          return;
        }

        //如果没有获取权限
        if (!this.state.hasPermission) {
          alert('没有获取录音权限!');
          return;
        }

        //如果暂停获取停止了录音
        if(this.state.stoppedRecording){
          this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({recording: true});
if(this.state.pausedRecording){
        try {
            await AudioRecorder.resumeRecording();
//            AudioRecorderManager.startRecording();
  
          } catch (error) {
            console.error(error);
        }
}
else{
        try {
            await AudioRecorder.startRecording();
//            AudioRecorderManager.startRecording();
  
          } catch (error) {
            console.error(error);
        }
}
    }

    async pause() {
    if (!this.state.recording) {
        alert('没有录音, 无需停止!');
        return;
      }

      this.setState({pausedRecording:  true, recording: false});

      try {

        await AudioRecorder.pauseRecording();
        // 在安卓中, 暂停就等于停止
//        if (Platform.OS === 'android') {
//          const filePath = await AudioRecorder.stopRecording();
//          this.finishRecording(true, filePath);
//          return filePath;
//        }
      } catch (error) {
        console.error(error);
      }
    }

    async stop() {
    // 如果没有在录音
    if (!this.state.recording&&!this.state.pausedRecording) {
      alert('没有录音, 无需停止!');
      return;
    }

    this.setState({pausedRecording: false,stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }

    }

    async play() {
        // 如果在录音 , 执行停止按钮
        if (this.state.recording) {
          await this.stop();
        }

        // 使用 setTimeout 是因为, 为避免发生一些问题 react-native-sound中
        setTimeout(() => {
          var sound = new Sound(this.state.audioPath, '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            }
          });

          setTimeout(() => {
            sound.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          }, 100);
        }, 100);
    }

    finishRecording(didSucceed, filePath) {
      this.setState({ finished: didSucceed });
      console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }

    componentDidMount () {

    // 页面加载完成后获取权限
    this.checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      //如果未授权, 则执行下面的代码
      if (!hasPermission) return;
      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = (data) => {
        if (Platform.OS === 'ios') {
          this.finishRecording(data.status === "OK", data.audioFileURL);
        }
      };

    })
    // console.log(this.props.navigator)
    // console.log(audioPath)
    }

    render(){
    let { recording, pause, currentTime } = this.state
    return (
        <>
        <View style={styles.container}>
          <TouchableHighlight
            onPress={this.record}
            underlayColor='#a7b11c'
            style={styles.recorderWrapper}
            >
              <Image
              style={styles.icon}
              source={require('../img/start.png')}></Image>
            </TouchableHighlight>

            <TouchableHighlight
            onPress={this.pause}
            underlayColor='#a7b11c'
            style={styles.recorderWrapper}
            >
              <Image
              style={styles.icon}
              source={require('../img/sup.png')}></Image>
            </TouchableHighlight>

            <TouchableHighlight
            onPress={this.stop}
            underlayColor='#a7b11c'
            style={styles.recorderWrapper}
            >
              <Image
              style={styles.icon}
              source={require('../img/stop.png')}></Image>
            </TouchableHighlight>

            <TouchableHighlight
            onPress={this.play}
            underlayColor='#a7b11c'
            style={styles.recorderWrapper}
            >
              <Image
              style={styles.icon}
              source={require('../img/play2.png')}></Image>
            </TouchableHighlight>
            </View>
        </>
      );
    }
}


const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignSelf:'center',
  },
  recorderWrapper:{
    backgroundColor:'#fdf2dc',
    alignSelf:'stretch',
    borderRadius:40,
    margin:10


  },
  icon :{
    margin:10,
    width:40,
    height:40,
    alignSelf:'center',
  },
});

//export default Record