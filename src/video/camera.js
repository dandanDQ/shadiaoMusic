import React, { PureComponent } from 'react';
import { RNCamera } from 'react-native-camera';

import { StyleSheet, Text, TouchableOpacity, View  } from 'react-native';

export class CameraScreen extends PureComponent {
    constructor(props){
    super(props);
    this.state={
        isFlashOn:false,        //闪光灯
        isRecording:false,      //是否在录像
    }
    }
    toggleFlash(){
        this.setState({isFlashOn:!this.state.isFlashOn})
    }

    isFlashOn(){
        if (this.state.isFlashOn===false){
            return(
                <TouchableOpacity  onPress={()=>{this.toggleFlash()}}>
                    <Text style={{fontSize:30,fontFamily:'iconfont',color:'black'}}>&#xe633;</Text>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity  onPress={()=>{this.toggleFlash()}}>
                    <Text style={{fontSize:30,color:'white',fontFamily:'iconfont'}}>&#xe633;</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
        
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                    {({ camera, status }) => {
                        console.log(status);
                        return (
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                
                                {this.recordBtn(camera)}
                            </View>
                        );
                    }}
                </RNCamera>
            </View>
        );
    }

    recordBtn(camera){
        if (this.state.isRecording===false){
            return(
                <TouchableOpacity onPress={() => this.takeRecord(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> 摄像 </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.stopRecord(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> 停止 </Text>
                </TouchableOpacity>
            )
        }
    }
    //开始录像
    takeRecord= async function(camera){
        this.setState({isRecording:true});
        const options = { quality:RNCamera.Constants.VideoQuality["480p"],maxFileSize:(100*1024*1024) };
        const data = await camera.recordAsync(options);
        console.log(data);
        this.props.navigation.navigate('parentPage',{videoUrl:data.uri})
    };
    //停止录像
    stopRecord(camera){
        this.setState({isRecording:false});
        camera.stopRecording()
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
  },
  preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
  },
});