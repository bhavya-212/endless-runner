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
        this.background = this.add.tileSprite(0, 0, 640, 740, 'background').setOrigin(0,0);
        
        //platform
        this.platforms = this.physics.add.staticGroup();
        let lastPlatformY = 740;
        let lastPlatformX = 320;
        for (let i = 0; i < 5; i++){
            const minX = lastPlatformX - 150;
            const maxX = lastPlatformX + 150;
            const x = Phaser.Math.Between(minX, maxX);
            const minGap = 100;
            const maxGap = 200;
            const y = Phaser.Math.Between(lastPlatformY - maxGap, lastPlatformY - minGap);
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = this.platforms.create(x, y, 'bone-platform');
            platform.body.updateFromGameObject();
            lastPlatformY = y;
            lastPlatformX = x;
       }
       
       //dog
       this.dogSprite = this.physics.add.sprite(320, 370, 'dog-left').setScale(3);
       this.dogSprite.setGravityY(300);
       this.physics.add.collider(this.platforms, this.dogSprite);

       this.dogSprite.body.checkCollision.up = true;
       this.dogSprite.body.checkCollision.left = true;
       this.dogSprite.body.checkCollision.right = true;

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
        const scrollY = this.cameras.main.scrollY;
        this.platforms.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = child;
            if (platform.y >= scrollY + 700){
                platform.y = scrollY - Phaser.Math.Between(50, 100);
                platform.x = Phaser.Math.Between(30, 500);
                platform.body.updateFromGameObject();
            }
            platform.y += 1.2;
        });

        //jumping mechanism
        const touchDown = this.dogSprite.body.touching.down;
        if (Phaser.Input.Keyboard.JustDown(keyUP) && touchDown){
            this.dogSprite.setVelocityY(-350);
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

        // if (this.dogSprite.y > 740){
        //     this.dogSprite.setY(740);
        //     this.dogSprite.setVelocityY(0);
        // }
    }
}