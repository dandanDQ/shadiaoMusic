import React, { PureComponent } from 'react';

import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export class CameraScreen extends PureComponent {
    constructor(props){
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.state={
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
                style={styles.takephoto}
                onPress={() => {
                    let tt = this;
                    ImagePicker.openCamera({
                        path: 'my-file-path.jpg',
                        width: 400,
                        height: 400,
                        cropping: true,
                        includeBase64:true
                    }).then(image => {
                      console.log(image);
                        tt.setState({photoAsBase64: { content: image.data, isPhotoPreview: false, photoPath: image.path }});
                    });
                }}>
                    <Image
                    style={styles.cameraIcon}
                    source={require('../img/camera.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.album}
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
                    style={styles.photoIcon}
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
  cameraIcon :{
    margin:10,
    width:80,
    height:80,
    alignSelf:'center',
    backgroundColor: '#f2af22',
  },
  takephoto:{
    backgroundColor: '#f2af22',
    margin:20,
    borderRadius:20,
    flex:1,
    justifyContent:'center'
  },
  album:{
    backgroundColor: '#985978',
    borderRadius:20,
    flex:1,
    margin:20,
    justifyContent:'center'
  },
  photoIcon:{
    margin:10,
    width:75,
    height:75,
    alignSelf:'center',
    backgroundColor: '#985978',
  }
});