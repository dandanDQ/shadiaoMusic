import React, { Component } from 'react';
const Sound = require('react-native-sound');


export default class GenMusic {
    constructor(name) {
        this.name = name
    }
    genMusic(notes) {
        notes.forEach((note) => {
            let file = this.getFile(note);
            var playNote = new Sound(file, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }

                playNote.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                })
            })
        })
    }

    getFile(note) {
        let file = '';
        switch (note) {
            case 1:
                {
                    file = require('../piano/midi/1.mp3')
                    break
                }
            case 2:
                {
                    file = require('../piano/midi/2.mp3')
                    break
                }
            case 3:
                {
                    file = require('../piano/midi/3.mp3')
                    break
                }
            case 4:
                {
                    file = require('../piano/midi/4.mp3')
                    break
                }
            case 5:
                {
                    file = require('../piano/midi/5.mp3')
                    break
                }
            case 6:
                {
                    file = require('../piano/midi/6.mp3')
                    break
                }
            case 7:
                {
                    file = require('../piano/midi/7.mp3')
                    break
                }
            case 8:
                {
                    file = require('../piano/midi/8.mp3')
                    break
                }
            case 9:
                {
                    file = require('../piano/midi/9.mp3')
                    break
                }
            case 10:
                {
                    file = require('../piano/midi/10.mp3')
                    break
                }
            case 11:
                {
                    file = require('../piano/midi/11.mp3')
                    break
                }
            case 12:
                {
                    file = require('../piano/midi/12.mp3')
                    break
                }
            case 13:
                {
                    file = require('../piano/midi/13.mp3')
                    break
                }

        }
        return file
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
}