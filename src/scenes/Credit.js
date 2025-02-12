class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    create(){
         //sprites
         this.add.image(game.config.width/2, game.config.height/2, 'rainbow').setOrigin(0.5, 0.7).setScale(1);
         this.add.image(game.config.width/2, game.config.height/2, 'dog-head').setOrigin(0.5,1.2).setScale(2);
        
         //credits title
        let titleConfig = {
            fontFamily: 'Courier New',
            fontSize: '50px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //credits text
        let creditsConfig = {
            fontFamily: 'Courier New',
            fontSize: '15px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }
        let credits1Config = {
            fontFamily: 'Courier New',
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //credits text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, 'CREDITS', titleConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, 'CREDITS', titleConfig).setOrigin(0.5).setDepth(1).setTint(0xFF0000).setBlendMode('SCREEN');
        this.add.text(game.config.width/2, game.config.height/2, 'Background music by Denys_Brodovskyi from PixaBay', creditsConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 + borderPadding, 'Menu music by Soundbay from PixaBay', creditsConfig).setOrigin(0.5, -0.3).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 + borderPadding, 'Credit music by Good_B_Music from PixaBay', creditsConfig).setOrigin(0.5, -2).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ↑ arrow for menu', credits1Config).setOrigin(0.5, -6).setDepth(1);

         //define key
         keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

         //credit music
         this.creditMusic = this.sound.add('credit-music', {volume: 0.2, loop: true});
         this.creditMusic.play();
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            this.creditMusic.stop();
            this.scene.start('menuScene');
        }
    }
}