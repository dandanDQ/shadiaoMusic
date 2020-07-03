import React, { Component } from 'react';
const Sound = require('react-native-sound');
Sound.setCategory('Playback');

export default class GenMusic {
    constructor(name) {
        this.name = name
    }


    //传入数组，播放音乐
    genMusic(midis) {
        midis.forEach((midi, index) => {
            let file = this.getFile(midi);
            var playNote = new Sound(file, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                playNote.play((success) => {
                    if (success) {
                        console.log(index, 'successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                    playNote.release();
                })
            })
        })
    }

    getNote(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }



    // TODO 3.

    //getFile函数用于获取音频文件，
    getFile(midi) {
        let file = '';
        console.log("in genMusic getFile:", midi)
        switch (midi) {
            case 36:
                {
                    file = require('../piano/midi/c2.m4a')
                    break
                }
            case 37:
                {
                    file = require('../piano/midi/c2m.m4a')
                    break
                }
            case 38:
                {
                    file = require('../piano/midi/d2.m4a')
                    break
                }
            case 39:
                {
                    file = require('../piano/midi/d2m.m4a')
                    break
                }
            case 40:
                {
                    file = require('../piano/midi/e2.m4a')
                    break
                }
            case 41:
                {
                    file = require('../piano/midi/f2.m4a')
                    break
                }
            case 42:
                {
                    file = require('../piano/midi/f2m.m4a')
                    break
                }
            case 43:
                {
                    file = require('../piano/midi/g2.m4a')
                    break
                }
            case 44:
                {
                    file = require('../piano/midi/g2m.m4a')
                    break
                }
            case 45:
                {
                    file = require('../piano/midi/a2.m4a')
                    break
                }
            case 46:
                {
                    file = require('../piano/midi/a2m.m4a')
                    break
                }
            case 47:
                {
                    file = require('../piano/midi/b2.m4a')
                    break
                }
            case 48:
                {
                    file = require('../piano/midi/c3.m4a')
                    break
                }
            case 49:
                {
                    file = require('../piano/midi/c3m.m4a')
                    break
                }
            case 50:
                {
                    file = require('../piano/midi/d3.m4a')
                    break
                }
            case 51:
                {
                    file = require('../piano/midi/d3m.m4a')
                    break
                }
            case 52:
                {
                    file = require('../piano/midi/e3.m4a')
                    break
                }
            case 53:
                {
                    file = require('../piano/midi/f3.m4a')
                    break
                }
            case 54:
                {
                    file = require('../piano/midi/f3m.m4a')
                    break
                }
            case 55:
                {
                    file = require('../piano/midi/g3.m4a')
                    break
                }
            case 56:
                {
                    file = require('../piano/midi/g3m.m4a')
                    break
                }
            case 57:
                {
                    file = require('../piano/midi/a3.m4a')
                    break
                }
            case 58:
                {
                    file = require('../piano/midi/a3m.m4a')
                    break
                }
            case 59:
                {
                    file = require('../piano/midi/b3.m4a')
                    break
                }
            case 60:
                {
                    file = require('../piano/midi/c4.m4a')
                    break
                }
            case 61:
                {
                    file = require('../piano/midi/c4m.m4a')
                    break
                }
            case 62:
                {
                    file = require('../piano/midi/d4.m4a')
                    break
                }
            case 63:
                {
                    file = require('../piano/midi/d4m.m4a')
                    break
                }
            case 64:
                {
                    file = require('../piano/midi/e4.m4a')
                    break
                }
            case 65:
                {
                    file = require('../piano/midi/f4.m4a')
                    break
                }
            case 66:
                {
                    file = require('../piano/midi/f4m.m4a')
                    break
                }
            case 67:
                {
                    file = require('../piano/midi/g4.m4a')
                    break
                }
            case 68:
                {
                    file = require('../piano/midi/g4m.m4a')
                    break
                }
            case 69:
                {
                    file = require('../piano/midi/a4.m4a')
                    break
                }
            case 70:
                {
                    file = require('../piano/midi/a4m.m4a')
                    break
                }
            case 71:
                {
                    file = require('../piano/midi/b4.m4a')
                    break
                }
            case 72:
                {
                    file = require('../piano/midi/c5.m4a')
                    break
                }
            case 73:
                {
                    file = require('../piano/midi/c5m.m4a')
                    break
                }
            case 74:
                {
                    file = require('../piano/midi/d5.m4a')
                    break
                }
            case 75:
                {
                    file = require('../piano/midi/d5m.m4a')
                    break
                }
            case 76:
                {
                    file = require('../piano/midi/e5.m4a')
                    break
                }
            case 77:
                {
                    file = require('../piano/midi/f5.m4a')
                    break
                }
            case 78:
                {
                    file = require('../piano/midi/f5m.m4a')
                    break
                }
            case 79:
                {
                    file = require('../piano/midi/g5.m4a')
                    break
                }
            case 80:
                {
                    file = require('../piano/midi/g5m.m4a')
                    break
                }
            case 81:
                {
                    file = require('../piano/midi/a5.m4a')
                    break
                }
            case 82:
                {
                    file = require('../piano/midi/a5m.m4a')
                    break
                }
            case 83:
                {
                    file = require('../piano/midi/b5.m4a')
                    break
                }
            case 84:
                {
                    file = require('../piano/midi/c6.m4a')
                    break
                }
            case 85:
                {
                    file = require('../piano/midi/c6m.m4a')
                    break
                }
            case 86:
                {
                    file = require('../piano/midi/d6.m4a')
                    break
                }
            case 87:
                {
                    file = require('../piano/midi/d6m.m4a')
                    break
                }
            case 88:
                {
                    file = require('../piano/midi/e6.m4a')
                    break
                }

        }
        return file
    }
}