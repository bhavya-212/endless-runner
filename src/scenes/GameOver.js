class GameOver extends Phaser.Scene{
    constructor(){
        super("overScene");
    }

    create(data){
         let score = data.score;
         let highScore = data.highScore;
         
         //sprites
         this.add.image(game.config.width/2, game.config.height/2, 'rainbow').setOrigin(0.5, 0.7).setScale(1);
         this.add.image(game.config.width/2, game.config.height/2, 'bone-vertical').setOrigin(2.9,1.2).setScale(2);
         this.add.image(game.config.width/2, game.config.height/2, 'bone-vertical').setOrigin(-2,1.2).setScale(2);

        
         //game over title
        let titleConfig = {
            fontFamily: 'Courier New',
            fontSize: '50px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //over text
        let overConfig = {
            fontFamily: 'Courier New',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }

        //over text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, 'GAME OVER', titleConfig).setOrigin(0.5).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, 'GAME OVER', titleConfig).setOrigin(0.5).setDepth(1).setTint(0xFF0000).setBlendMode('SCREEN');
        this.add.text(game.config.width/2, game.config.height/2 + borderPadding, `Score: ${score}`, overConfig).setOrigin(0.5, -0.3).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 + borderPadding, `High Score: ${highScore}`, overConfig).setOrigin(0.5, -2).setDepth(1);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ↑ arrow for menu', overConfig).setOrigin(0.5, -6).setDepth(1);

         //define key
         keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

         //game over music
         this.overMusic = this.sound.add('over-music', {volume: 0.5, loop: true});
         this.overMusic.play();
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            this.overMusic.stop();
            this.scene.start('menuScene');
        }
    }
}