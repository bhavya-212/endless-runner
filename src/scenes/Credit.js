class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
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

        //credits title
        let creditsConfig = {
            fontFamily: 'Courier New',
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //credits text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2.5 - borderPadding*2, 'CREDITS', titleConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2.5 - borderPadding*2, 'CREDITS', titleConfig).setOrigin(0.5).setDepth(1).setTint(0xFF0000).setBlendMode('SCREEN');
        this.add.text(game.config.width/2, game.config.height/2, 'Background music by trtasfiq from PixaBay', creditsConfig).setOrigin(0.5).setDepth(1);
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