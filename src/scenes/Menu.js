class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('background-music', './assets/background-music.mp3');
    }

    create(){
        //game title
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '32px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text
        this.add.text(game.config.width/2, game.config.height/2, 'GAME', menuConfig).setOrigin(0.5).setDepth(1);
    }
}