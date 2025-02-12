// name: Bhavya Anil
// game: Canine Chase
// hours: 16 hours
// creative tilt: WRITE JUSTIFICATION
// citations: background music from PixaBay trtasfiq

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
            debug: true
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
let keyUP, keyLEFT, keyRIGHT;
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;