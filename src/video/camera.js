import React, { PureComponent } from 'react';
import { RNCamera } from 'react-native-camera';

import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

//TODO　1.改成拍照，获取图像文件，根据某种规则生成ｎｏｔｅｓ数组
//TODO  2.找一下处理图片的库  canvas

export class CameraScreen extends PureComponent {
    constructor(props){
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.state={
        isFlashOn:false,        //闪光灯
        isRecording:false,      //是否在录像
        cameraPermission: false,

        photoAsBase64: {
          content: '',
          isPhotoPreview: false,
          photoPath: '',
        },
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
                    ref={ref => {
                        this.camera = ref;
                    }}
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
            <View>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> 拍摄 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    ImagePicker.openCamera({
                      width: 400,
                      height: 400,
                      cropping: true
                    }).then(image => {
                      console.log(image);
                    });
                    this.setState({photoAsBase64: { content: image.base64, isPhotoPreview: false, photoPath: image.uri }});
                }} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> ImagePicker </Text>
                </TouchableOpacity>
            </View>

            )
        } else {
            return (
            <View>
                <TouchableOpacity onPress={() => {camera.resumePreview();this.setState({isRecording:false});}} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> 重新拍照 </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.savePicture()} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> 确定 </Text>
                </TouchableOpacity>

            </View>
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

    takePicture = async function(camera){
        console.log("ddddddddd");
        this.setState({isRecording:true});
        let tt = this;
        const options = { quality: 0.5, base64: true ,pauseAfterCapture:true};
        const data = await this.camera.takePictureAsync(options);
        this.setState({
            photoAsBase64: { content: data.base64, isPhotoPreview: false, photoPath: data.uri }
        });
        console.log(this.state.photoAsBase64.photoPath);
//            alert("拍照成功！图片保存地址：\n"+data.uri)

    }

    //TODO: 跳转生成
    savePicture(){
        this.setState({isRecording:false});
        camera.resumePreview();
    }


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