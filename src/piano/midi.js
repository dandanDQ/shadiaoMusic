export default function(note) {
    let file = '';
    switch (note) {
        case 1:
            {
                file = require('./midi/1.mp3')
                break
            }
        case 2:
            {
                file = require('./midi/2.mp3')
                break
            }
        case 3:
            {
                file = require('./midi/3.mp3')
                break
            }
        case 4:
            {
                file = require('./midi/4.mp3')
                break
            }
        case 5:
            {
                file = require('./midi/5.mp3')
                break
            }
        case 6:
            {
                file = require('./midi/6.mp3')
                break
            }
        case 7:
            {
                file = require('./midi/7.mp3')
                break
            }
        case 8:
            {
                file = require('./midi/8.mp3')
                break
            }
        case 9:
            {
                file = require('./midi/9.mp3')
                break
            }
        case 10:
            {
                file = require('./midi/10.mp3')
                break
            }
        case 11:
            {
                file = require('./midi/11.mp3')
                break
            }
        case 12:
            {
                file = require('./midi/12.mp3')
                break
            }
        case 13:
            {
                file = require('./midi/13.mp3')
                break
            }

    }
    return file
}