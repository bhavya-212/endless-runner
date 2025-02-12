class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){
        //background image
        this.background = this.add.tileSprite(0, 0, 640, 740, 'background').setOrigin(0,0).setScrollFactor(1,0);
        
        //platforms and rainbows
        this.platforms = this.physics.add.staticGroup();
        this.rainbows = this.physics.add.group({
            classType: Rainbow
        });
        for (let i = 0; i < 5; i++){
            const x = Phaser.Math.Between(80, 400);
            const y = 150 * i;
            const platform = this.platforms.create(x, y, 'bone-platform').setScale(0.5);
            platform.body.updateFromGameObject();
            if (Phaser.Math.Between(0,1) === 0){
                const rainbow = new Rainbow(this, x, y -10, 'rainbow');
                this.rainbows.add(rainbow);
                platform.rainbow = rainbow;
            }
       }

       //dog
       //this.dogSprite = new Dog(this, 240, 320, 'dog', 0, 'dog-left').setScale(3);
       this.dogSprite = this.physics.add.sprite(240, 320, 'dog-head').setScale(3);
       this.physics.add.collider(this.platforms, this.dogSprite);

       this.dogSprite.body.checkCollision.up = false;
       this.dogSprite.body.checkCollision.left = false;
       this.dogSprite.body.checkCollision.right = false;
       this.dogSprite.body.checkCollision.down = true;
        
       //keys
       keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
       keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

       //background music
       let backgroundMusic = this.sound.play('background-music', {volume: 0.05, loop: true});
    }

    update(){
        //moving  background
        this.background.tilePositionX -= 0.2;

        //random platforms and rainbows
        this.platforms.children.iterate(child => {
            const platform = child;
            const screenHeight = this.sys.game.config.height;
            platform.y += 2;
            if (platform.rainbow){
                platform.rainbow.y += 1;
            }
            if (platform.y >= screenHeight){
                platform.y = -Phaser.Math.Between(50, 100);
                platform.x = Phaser.Math.Between(80, 400);
                if (platform.rainbow){
                    platform.rainbow.y = platform.y - 10;
                    platform.rainbow.x = platform.x;
                }
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
            this.dogSprite.setVelocityX(-200);
        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && !land){
            this.dogSprite.setVelocityX(200);
        }
        else if (!Phaser.Input.Keyboard.JustDown(keyLEFT) && !Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.dogSprite.setVelocityX(0);
        }
    }
}