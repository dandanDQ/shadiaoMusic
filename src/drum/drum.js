//张聚聚的鼓点

import React, { Component } from 'react'
import Record from '../record/record'
import {View,Text} from 'react-native'
class Drum extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageName : '重力感应鼓点',
        }
    }
    render(){
        return (
            <View>
                <Record/>
                <Text>重力感应鼓点</Text>
            </View>
        )
    }
}

export default Drum