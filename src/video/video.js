//sdq的视频提取
import React, { Component } from 'react'
import {CameraScreen} from './camera'
import {View,Text,StyleSheet} from 'react-native'
class Video extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageName : '视频提取',
        }
    }
    render(){
        return (
            <View style={styles.view}>
                <CameraScreen/>
            </View>
        )
    }
}

export default Video


const styles = StyleSheet.create({
    view: {
        backgroundColor: '#fdf2dc',
        flex:1,
        borderRadius:5,
        padding:2,
    },
  });
  