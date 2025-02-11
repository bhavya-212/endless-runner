class Play extends Phaser.Scene{
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
            const platform = this.platforms.create(x, y, 'rainbow').setScale(0.7);
            platform.body.updateFromGameObject();
            lastPlatformY = y;
            lastPlatformX = x;
       }
       
       //dog
       this.dogSprite = this.physics.add.sprite(240, 320, 'dog-left').setScale(2);
       this.dogSprite.setGravityY(300);
       this.physics.add.collider(this.platforms, this.dogSprite);

       this.dogSprite.body.checkCollision.up = true;
       this.dogSprite.body.checkCollision.left = true;
       this.dogSprite.body.checkCollision.right = true;

       //bone
       this.bone = this.physics.add.group({
        classType: Bone
       });
       this.physics.add.collider(this.platforms, this.bone);
        
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
                platform.x = Phaser.Math.Between(30, 500);
                platform.body.updateFromGameObject();
            }
        });

        //jumping mechanism
        const touchDown = this.dogSprite.body.touching.down;
        if (Phaser.Input.Keyboard.JustDown(keyUP) && touchDown){
            this.dogSprite.setVelocityY(-200);
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

        if (this.dogSprite.y > 740){
            this.dogSprite.setY(740);
            this.dogSprite.setVelocityY(0);
        }
    }
}