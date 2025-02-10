// name: Bhavya Anil
// game: Canine Chase
// hours: 2 hrs
// creative tilt: WRITE JUSTIFICATION
// citations: background music from PixaBay trtasfiq

//'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640, 
    height: 480,
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         debug: true
    //     }
    // },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
let keyCOLLECT, keyUP, keyLEFT, keyRIGHT;
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;