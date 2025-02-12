class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    create(){
         //sprites
         this.add.image(game.config.width/2, game.config.height/2, 'rainbow').setOrigin(0.5, 0.7).setScale(1);
         this.add.image(game.config.width/2, game.config.height/2, 'dog-head').setOrigin(0.5,1.2).setScale(2);
        //title text
        let titleConfig = {
            fontFamily: 'Courier New',
            fontSize: '50px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //credits title
        let creditsConfig = {
            fontFamily: 'Courier New',
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //credits text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, 'CREDITS', titleConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, 'CREDITS', titleConfig).setOrigin(0.5).setDepth(1).setTint(0xFF0000).setBlendMode('SCREEN');
        this.add.text(game.config.width/2, game.config.height/2, 'Background music by trtasfiq from PixaBay', creditsConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2, 'Menu music by soundbay from PixaBay', creditsConfig).setOrigin(0.5, -0.6).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ↑ arrow for menu', creditsConfig).setOrigin(0.5).setDepth(1);

         //define key
         keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            this.scene.start('menuScene');
        }
    }
}