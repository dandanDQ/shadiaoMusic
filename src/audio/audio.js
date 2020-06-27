//小诸的根据声音提取音乐

import React, { Component } from 'react'
import Record from '../record/record'
import {
    View,
    Text,
  } from 'react-native';


  class Audio extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageName : '音频提取',
        }
    }

    render(){
        return (
            <View>
                <Record/>
                <Text>音频提取</Text>
            </View>
        )
    }
}
  
export default Audio