import React, { PureComponent } from 'react';
import { Base64 } from 'js-base64';

import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class CameraScreen extends PureComponent {
    constructor(props){
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.pickPicture = this.pickPicture.bind(this);
    this.savePicture = this.savePicture.bind(this);
    this.state={
        isRecording:false,      //是否在录像
        cameraPermission: false,
        haveGottenImage: false,
        photoRes: [],

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
                onPress={() => {this.takePicture();}}>
                    <Image
                    style={styles.cameraIcon}
                    source={require('../img/camera.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.album}
                onPress={() => {this.pickPicture();}}>
                     <Image
                    style={styles.photoIcon}
                    source={require('../img/photo.png')}></Image>
                </TouchableOpacity>
            </View>
        );
    }

  
    takePicture = async function(camera){
        let tt = this;
        ImagePicker.openCamera({
            path: 'my-file-path.jpg',
            width: 400,
            height: 400,
            cropping: true,
            includeBase64:true
        }).then(image => {
            tt.setState({haveGottenImage: true, photoAsBase64: { content: image.data, isPhotoPreview: false, photoPath: image.path }});
            this.savePicture();
            alert("拍照成功！\n");
        });
    }

    pickPicture(){
        let tt = this;
        ImagePicker.openPicker({
            multiple: false,
            cropping: true,
            includeBase64:true
        }).then(image => {
            tt.setState({haveGottenImage: true, photoAsBase64: { content: image.data, isPhotoPreview: false, photoPath: image.path }});
            this.savePicture();
            alert("成功选取照片！\n");
        });
    }

    //TODO: 跳转生成
    savePicture(){
        let pix = Base64.toUint8Array(this.state.photoAsBase64.content);
        var tmp = [];
        let stride = pix.length/20.0;
        if(pix.length <20) stride = 1;
        var max = 0, min = 255;
        for(let i=0; i+stride<pix.length; i+= stride){
            let sum = 0;
            for(let j=parseInt(i); j<i+stride; j++){
                sum += pix[j];
            }
            sum /= parseInt(i+stride-parseInt(i)+1);
            if(sum>max) max = sum;
            if(sum<min) min = sum;
            tmp.push(sum);
        }
        let mid = (max + min)/2, w = max - min;
        for(let i=0; i<tmp.length; i++){
            tmp[i] = parseInt((tmp[i] - min)/w*52+36);
            this.state.photoRes.push(tmp[i]);
        }
        this.props.getVideoMidis(this.state.photoRes)
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