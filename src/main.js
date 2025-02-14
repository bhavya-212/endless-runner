// name: Bhavya Anil
// game: Rainbow Bridge
// hours: 28 hours
// creative tilt technical: I'm proud of the way I implemented the randomly generating platforms. 
//                I looped through all the platforms in the group and reset the platform's Y position to
//                a random value so that the recyled platform would be in a different position than before.
// creative tilt visual: I drew two backgrounds and made it so that after a certain amount of time, they would 
//                transition into the other. I used tweens in order to make this cool effect so it looks like
//                the day is going by (daytime background transitions to nighttime background).

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