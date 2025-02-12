class Play extends Phaser.Scene{
    // defines platforms as phaser physics arcade group
    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    platforms;

    // defines dogSprite as a phaser physics arcade sprite
    /** @type {Phaser.Physics.Arcade.Sprite} */
    dogSprite;

    constructor(){
        super("playScene");
    }

    create(){
        //background image
        this.background = this.add.tileSprite(0, 0, 640, 740, 'background').setOrigin(0,0).setScrollFactor(1,0);
        
        //platform
        this.platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 5; i++){
            const x = Phaser.Math.Between(80, 400);
            const y = 150 * i;
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = this.platforms.create(x, y, 'bone-platform').setScale(0.5);
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const body = platform.body;
            body.updateFromGameObject();
       }
       
       //dog
       //this.dogSprite = new Dog(this, 240, 320, 'dog', 0, 'dog-left').setScale(3);
       this.dogSprite = this.physics.add.sprite(240, 320, 'dog-head').setScale(3);
       this.physics.add.collider(this.platforms, this.dogSprite);

       this.dogSprite.body.checkCollision.up = false;
       this.dogSprite.body.checkCollision.left = false;
       this.dogSprite.body.checkCollision.right = false;
       
       //this.cameras.main.startFollow(this.dogSprite);
       

       //rainbow
       this.rainbow = this.physics.add.group({
        classType: Rainbow
       });
       this.physics.add.collider(this.platforms, this.rainbow);
        
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
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = child;
            const screenHeight = this.sys.game.config.height;
            platform.y += 1.5;
            if (platform.y >= screenHeight){
                platform.y = -Phaser.Math.Between(50, 100);
                platform.x = Phaser.Math.Between(80, 400);
                platform.body.updateFromGameObject();
            }
            platform.body.updateFromGameObject();
        });

        //jumping mechanism
        const land = this.dogSprite.body.touching.down;
        if (land){
            this.dogSprite.setVelocityY(-300);
        }

        if (this.dogSprite.y <= 0){
            this.dogSprite.y = 0;
            this.dogSprite.setVelocityY(0);
        }

        //left and right movement
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && !land){
            this.dogSprite.setVelocityX(-400);
        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && !land){
            this.dogSprite.setVelocityX(400);
        }
        else if (!Phaser.Input.Keyboard.JustDown(keyLEFT) && !Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.dogSprite.setVelocityX(0);
        }
    }
}