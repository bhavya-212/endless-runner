class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){
        //background image
        this.background = this.add.tileSprite(0, 0, 640, 740, 'background').setOrigin(0,0);
        
        //platform
        this.platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 5; i++){
            const x = Phaser.Math.Between(150, 400);
            const y = 150 * i;
            const platform = this.platforms.create(x, y, 'rainbow');
            platform.scale = 0.5
            const body = platform.body;
            body.updateFromGameObject();
       }
       
       //dog
       this.dogSprite = this.physics.add.sprite(240, 320, 'dog-left').setScale(2);
       this.physics.add.collider(this.platforms, this.dogSprite);

       this.dogSprite.body.checkCollision.up = false;
       this.dogSprite.body.checkCollision.left = false;
       this.dogSprite.body.checkCollision.right = false;
        
       //keys
       keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        //moving  background
        this.background.tilePositionX -= 0.2;

        //platform
        this.platforms.children.iterate(child => {
            const platform = child;
            platform.y += 1.5;
            if (platform.y >= 740){
                platform.y = Phaser.Math.Between(-100, -50);
                platform.x = Phaser.Math.Between(150, 400);
                platform.body.updateFromGameObject();
            }
        });

        //jumping mechanism
        const touchDown = this.dogSprite.body.touching.down;
        if (touchDown){
            this.dogSprite.setVelocityY(-200);
        }
    }
}