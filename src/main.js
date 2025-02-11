// name: Bhavya Anil
// game: Canine Chase
// hours: 12 hours
// creative tilt: WRITE JUSTIFICATION
// citations: background music from PixaBay trtasfiq

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640, 
    height: 740,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 350
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