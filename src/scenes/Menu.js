class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('background-music', './assets/background-music.mp3');
    }

    create(){
        //title text
        let titleConfig = {
            fontFamily: 'Courier New',
            fontSize: '50px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //directions text
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2 - borderPadding*2, 'CANINE CHASE', titleConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2 - borderPadding*2, 'CANINE CHASE', titleConfig).setOrigin(0.5).setDepth(1).setTint(0x8B0000).setBlendMode('SCREEN');
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (C) to collect treats', menuConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ↑ arrow to start', menuConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*-4 - borderPadding*-4, 'Bhavya Anil 2025', menuConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*-4 - borderPadding*-4, 'Bhavya Anil 2025', menuConfig).setOrigin(0.5).setDepth(1).setTint(0x8B0000).setBlendMode('SCREEN'); 
        
        //define key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            this.scene.start('playScene');
        }
    }
}