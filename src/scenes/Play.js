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
            const platform = this.platforms.create(x, y, 'bone-platform');
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const body = platform.body;
            body.updateFromGameObject();
       }
       
       //dog
       //this.dogSprite = new Dog(this, 320, 370, 'dog', 0, 'dog-left').setScale(3);
       this.dogSprite = this.physics.add.sprite(240, 320, 'dog-head').setScale(3);
       //this.dogSprite.setGravityY(300);
       this.physics.add.collider(this.platforms, this.dogSprite);

       this.dogSprite.body.checkCollision.up = false;
       this.dogSprite.body.checkCollision.left = false;
       this.dogSprite.body.checkCollision.right = false;
       
       this.cameras.main.startFollow(this.dogSprite);

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
            const scrollY = this.cameras.main.scrollY;
            if (platform.y >= scrollY + 700){
                platform.y = scrollY - Phaser.Math.Between(50, 100);
                platform.body.updateFromGameObject();
            }
        });

        //jumping mechanism
        const touchDown = this.dogSprite.body.touching.down;
        if (touchDown){
            this.dogSprite.setVelocityY(-300);
        }

        //left and right movement
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && touchDown){
            this.dogSprite.setVelocityX(-800);
        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && touchDown){
            this.dogSprite.setVelocityX(800);
        }
        else if (!Phaser.Input.Keyboard.JustDown(keyLEFT) && !Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.dogSprite.setVelocityX(0);
        }
    }
}