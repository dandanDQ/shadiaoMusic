import React, { PureComponent } from 'react';

import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';



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


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    let tt = this;
                    ImagePicker.openCamera({
                        path: 'my-file-path.jpg',
                        width: 400,
                        height: 400,
                        cropping: true,
                        includeBase64:true
                    }).then(image => {
//                        console.log(image);
                        tt.setState({photoAsBase64: { content: image.data, isPhotoPreview: false, photoPath: image.path }});
                    });
                }}>
                    <Image
                    style={styles.icon}
                    source={require('../img/camera.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    let tt = this;
                    ImagePicker.openPicker({
                        multiple: false,
                        includeBase64:true
                    }).then(image => {
//                      console.log(image);
                        tt.setState({photoAsBase64: { content: image.data, isPhotoPreview: false, photoPath: image.path }});
                    });
                }}>
                     <Image
                    style={styles.photo}
                    source={require('../img/photo.png')}></Image>
                </TouchableOpacity>
            </View>
        );
    }

  
    takePicture = async function(camera){
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

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fdf2dc',
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
  icon :{
    margin:10,
    width:60,
    height:60,
    alignSelf:'center',
    backgroundColor: '#fdf2dc',
  },
  button:{
    backgroundColor: '#fdf2dc',
  },
  photo:{
    margin:10,
    width:45,
    height:45,
    alignSelf:'center',
    backgroundColor: '#fdf2dc',
  }
});