// name: Bhavya Anil
// game: INCLUDE TITLE
// hours: 10 mins
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
let keyFIRE, keyRESET, keyLEFT, keyRIGHTl