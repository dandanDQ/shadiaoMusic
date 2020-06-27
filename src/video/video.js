//sdq的视频提取
import React, { Component } from 'react'
import Record from '../record/record'

import {View,Text} from 'react-native'
class Video extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageName : '视频提取',
        }
    }
    render(){
        return (
            <View>
                <Record/>
                <Text>视频提取</Text>
            </View>
        )
    }
}

export default Video