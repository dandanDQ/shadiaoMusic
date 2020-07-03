import {AudioRecorder, AudioUtils} from 'react-native-audio'
import Sound from 'react-native-sound';
import React,{Component}  from 'react';
import GenMusic from '../genMusic/genMusic'

import {
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
const genMusic = new GenMusic('ddq')


export default class Audio extends Component{
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
            amp: [],
            audioRes: [],

            audioAsBase64: {
              amplitude: 0,
              content: '',
              aPath: '',
            },

            
        };

        this.prepareRecordingPath = this.prepareRecordingPath.bind(this);     //执行录音的方法
        this.checkPermission = this.checkPermission.bind(this);               //检测是否授权
        this.record = this.record.bind(this);                                 //录音saveAudio
        this.stop = this.stop.bind(this);                                     //停止
        this.play = this.play.bind(this);                                     //播放
        this.pause = this.pause.bind(this);                                   //暂停
        this.saveAudio = this.saveAudio.bind(this);                           //传出数据

        this.finishRecording = this.finishRecording.bind(this);
      }

    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 44100,
          Channels: 1,
          AudioQuality: "High",            //录音质量
          AudioEncoding: "aac",           //录音格式
          AudioEncodingBitRate: 32000,     //比特率
          IncludeBase64: true,
        });

    }

    //通过 this.props.getAudioMidis(this.state.audioRes)将结果传回app.js

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


        //111
        this.setState({audioRes:[]})
        let resAudio=[];
        for(let j=0;j<20;j++){
          let audio=genMusic.getNote(37,87)
          resAudio.push(audio)
        }
        this.setState({audioRes:resAudio})

        this.setState({pausedRecording: false, recording: true});
        if(this.state.pausedRecording){
            try {
                await AudioRecorder.resumeRecording();
            } catch (error) {
                console.error(error);
            }
        }
        else{
            try {
                await AudioRecorder.startRecording();
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

        this.setState({pausedRecording: false, stoppedRecording: true, recording: false});

        try {
            const filePath = await AudioRecorder.stopRecording();
            console.log(filePath);
            if (Platform.OS === 'android') {
            this.finishRecording(true, filePath);
            }
            //111
            //在这里调用函数返回数组
            this.props.getAudioMidis(this.state.audioRes)
            alert("成功完成录音！\n时长"+this.state.currentTime+"秒");
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

    saveAudio(){
        let sec = this.state.amp;
        var tmp = [];
        var max = 0, min = 90;
        let stride = sec.length/20.0;
        if(sec.length <20) stride = 1;
        for(let i=0; i+stride<sec.length; i+= stride){
            let sum = 0;
            for(let j=parseInt(i); j<i+stride; j++){
                sum += sec[j];
            }
            sum /= parseInt(i+stride-parseInt(i)+1);
            console.log(sum);
            if(sum>max) max = sum;
            if(sum<min) min = sum;
//            console.log(sum);
            tmp.push(sum);
        }
//        console.log("resssssssss");
        let mid = (max + min)/2, w = (max - min)/1.5;
        for(let i=0; i<tmp.length; i++){
            tmp[i] = (tmp[i] - mid)/w;
//            console.log(tmp[i]);
            this.state.audioRes.push(tmp[i]);
        }
//        console.log(this.state.audioRes);
    }

    componentDidMount () {
        // 页面加载完成后获取权限
        this.checkPermission().then((hasPermission) => {
            this.setState({ hasPermission });

            //如果未授权, 则执行下面的代码
            if (!hasPermission) return;
            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
            //        this.setState({currentTime: Math.floor(data.currentTime)});
                this.setState({currentTime: Math.floor(data.currentTime), audioAsBase64: {amplitude: data.amplitude}});
                this.state.amp.push(data.amplitude);
               // console.log(this.state.amp);
            };

            AudioRecorder.onFinished = (data) => {
                if (Platform.OS === 'ios') {
                  this.finishRecording(data.status === "OK", data.audioFileURL);
                }
                this.setState({audioAsBase64: {content: data.base64}});
//                this.saveAudio();
            };

        })
    // console.log(this.props.navigator)
    // console.log(audioPath)
    }

    render(){
        let { recording, pause, currentTime } = this.state
        let record;
        if(this.state.recording){
          record =  <TouchableHighlight
          onPress={this.pause}
          underlayColor='#a7b11c'
          style={styles.recorderWrapper}
          >
            <Image
            style={styles.mic}
            source={require('../img/sup.png')}></Image>
          </TouchableHighlight>
        }else{
          record =  <TouchableHighlight
          onPress={this.record}
          underlayColor='#a7b11c'
          style={styles.recorderWrapper}
          >
            <Image
            style={styles.mic}
            source={require('../img/start.png')}></Image>
          </TouchableHighlight>
        }
        return (
            <>
            <View style={styles.container}>
                
                <View style={styles.div}>
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
                <View style={styles.divMain}>{record}</View>
                </View>
            </>
          );
        }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fdf2dc',
    flexDirection:'column',
    alignSelf:'stretch',
    justifyContent:'center',
    flex:1,
  },
  div:{
    backgroundColor:'#fdf2dc',
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center',
    flex:2,
  },
  divMain:{
    backgroundColor:'#a7b11c',
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'center',
    flex:7,
  },
  recorderWrapper:{
    backgroundColor:'#ffffff',
    alignSelf:'center',
    borderRadius:20,
    margin:10
  },
  icon :{
    margin:10,
    width:40,
    height:40,
    alignSelf:'center',
  },
  mic :{
    margin:10,
    width:220,
    height:220,
    alignSelf:'center',
  },
});

