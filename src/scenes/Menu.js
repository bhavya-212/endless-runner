class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.image('dog-head', './assets/dog.png');
        this.load.image('bone', './assets/bone.png');
        this.load.image('bone-platform', './assets/bone-platform.png');
        this.load.image('rainbow', './assets/rainbow.png');
        this.load.image('background', './assets/background.png');
        this.load.audio('background-music', './assets/background-music.mp3');
        this.load.audio('menu-music', './assets/menu-music.mp3');
        this.load.audio('credit-music', './assets/credit-music.mp3');
        this.load.audio('jump-music', './assets/jump.wav');
        this.load.audio('lose-music', './assets/lose.wav');
        this.load.path = './assets/';
        // this.load.spritesheet('dog', 'dog-sheet.png', {
        //     frameWidth: 32,
        //     frameHeight: 32,
        // });
    }

    create(){
        //  //dog spritesheet
        //  this.anims.create({
        //     key: 'dog-left',
        //     frameRate: 8,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('dog', {start: 1, end: 0}),
        // });
        // this.anims.create({
        //     key: 'dog-right',
        //     frameRate: 8,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('dog', {start: 3, end: 2}),
        // });

        // dog and bone sprites
        this.add.image(game.config.width/2, game.config.height/2, 'rainbow').setOrigin(0.5, 1).setScale(1);
        this.add.image(game.config.width/2, game.config.height/2, 'dog-head').setOrigin(0.5,-2.7).setScale(2);
        this.add.image(game.config.width/2, game.config.height/2, 'bone').setOrigin(1.5,-3.8).setScale(1.5);
        this.add.image(game.config.width/2, game.config.height/2, 'bone').setOrigin(-0.5,-3.8).setScale(1.5);

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
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //name text
        let nameConfig = {
            fontFamily: 'Courier New',
            fontSize: '15px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*1.5 - borderPadding*2, 'RAINBOW BRIDGE', titleConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*1.5 - borderPadding*2, 'RAINBOW BRIDGE', titleConfig).setOrigin(0.5).setDepth(1).setTint(0xFF0000).setBlendMode('SCREEN');
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move and ↑ arrow to jump', menuConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ↑ arrow to start and ↓ for credits', menuConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*-4 - borderPadding*-4, 'Bhavya Anil 2025', nameConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*-4 - borderPadding*-4, 'Bhavya Anil 2025', nameConfig).setOrigin(0.5).setDepth(1).setTint(0x8B0000).setBlendMode('SCREEN'); 
        
        //define key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //menu music
        this.menuMusic = this.sound.add('menu-music', {volume: 0.5, loop: true});
        this.menuMusic.play();
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            this.menuMusic.stop();
            // game.settings = {
            //     gameTimer: 60000
            // }
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.menuMusic.stop();
            this.scene.start('creditScene');
        }
    }
}