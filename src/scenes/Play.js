class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){
        //background image
        this.background = this.add.tileSprite(0, 0, 640, 740, 'background').setOrigin(0,0).setScale(7);
        
        //dog
        this.dogSprite = new Dog(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'dog-left').setOrigin(0.5,0.5).setScale(3);

        //platform
        // this.platform = this.physics.add.sprite(0, height/4 * 3, 'rainbow')
        // this.platform.setX(Phaser.Math.Between(0 + this.platform.width/2, width - this.platform.width/2))
        // this.platform.body.setImmovable(true)
        // this.platform.body.checkCollision.down = false
        // this.platform.body.velocity.x = 100
        // this.platform.body.collideWorldBounds = true
        // this.platform.setBounce(1)

        //keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        //platform moving
        // if (this.platform.x - this.platform.width/2 <= 0){
        //     this.platform.body.velocity.x = Math.abs(this.platform.body.velocity.x)
        // }
        // if (this.platform.x + this.platform.width/2 >= width){
        //     this.platform.body.velocity.x = -Math.abs(this.platform.body.velocity.x)
        // }
        //moving  background
        this.background.tilePositionX -= 0.2;
    }
}