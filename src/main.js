// name: Bhavya Anil
// game: Rainbow Bridge
// hours: 27 hours
// creative tilt: WRITE JUSTIFICATION

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 480, 
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            },
            debug: false
        }
    },
    scene: [Menu, Play, Credit, GameOver]
}

let game = new Phaser.Game(config);
let keyUP, keyLEFT, keyRIGHT, keyDOWN;
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;