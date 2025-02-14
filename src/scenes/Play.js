class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){
        //music
        this.loseMusic = this.sound.add('lose-music', {volume: 0.2});
        this.loseMusicPlaying = false;
       
        //background image
        this.background = this.add.tileSprite(0, 0, 640, 740, 'background').setOrigin(0,0).setScrollFactor(1,0);
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x000000).setOrigin(0,0);

        //score
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
        this.gameOver = false;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'right'
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, `Score: ${this.score}`, scoreConfig);

        //background looping music
        this.backgroundMusic = this.sound.add('background-music', {volume: 0.2, loop: true});
        this.backgroundMusic.play();

        //prevent multiplying scores
        this.touchingPlatform = false;
        this.touchedPlatform = false;
        
        //platforms and rainbows
        this.platforms = this.physics.add.staticGroup();
        this.bones = this.physics.add.group({
            classType: Bone
        });
        this.physics.add.collider(this.platforms, this.bones);
        for (let i = 0; i < 5; i++){
            const x = Phaser.Math.Between(80, 400);
            const y = 150 * i;
            const platform = this.platforms.create(x, y, 'rainbow').setScale(0.4);
            platform.body.setSize(platform.width, platform.height);
            platform.body.setOffset(platform.displayWidth*0.25, platform.displayHeight*0.25);
            platform.body.updateFromGameObject();
       }

       //dog
       this.dogSprite = this.physics.add.sprite(240, 320, 'dog-head').setScale(2.5);
       this.physics.add.collider(this.platforms, this.dogSprite, this.touchPlatform, null, this);

       this.dogSprite.body.checkCollision.up = false;
       this.dogSprite.body.checkCollision.left = false;
       this.dogSprite.body.checkCollision.right = false;
       this.dogSprite.body.checkCollision.down = true;
        
       //keys
       keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
       keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    //increase score
    touchPlatform(dogSprite, platform){
        if(this.dogSprite.body.touching.down && !this.touchedPlatform && !this.gameOver){
            this.score +=5;
            console.log(this.score);
            this.updateScoreDisplay();
            this.touchingPlatform = true;
        }
    }

    //reset dog touching platform
    resetPlatform(){
        this.touchingPlatform = false;
    }

    //score update
    updateScoreDisplay(){
        this.scoreLeft.setText(`Score: ${this.score}`);
    }

    //rainbow over platform
    abovePlatform(sprite){
        const y = sprite.y - sprite.displayHeight;
        const bone = this.bones.get(sprite.x, y, 'bone-platform');
        this.add.existing(bone);
        bone.body.setSize(bone.width, bone.height);
        return bone;
    }
    update(){
        //moving  background
        this.background.tilePositionX -= 0.2;

        //random platforms and rainbows
        this.platforms.children.iterate(child => {
            const platform = child;
            const screenHeight = this.sys.game.config.height;
            platform.y += 2;
            if (platform.y >= screenHeight){
                platform.y = -Phaser.Math.Between(50, 100);
                platform.x = Phaser.Math.Between(80, 400);
                platform.body.updateFromGameObject();
                this.abovePlatform(platform);
            }
            platform.body.updateFromGameObject();
        });

        //jumping mechanism
        const land = this.dogSprite.body.touching.down;
        if (land){
            this.jumpMusic = this.sound.add('jump-music', {volume: 0.05});
            this.jumpMusic.play();
            this.dogSprite.setVelocityY(-310);
            this.resetPlatform();
        }

        if (this.dogSprite.y <= 0){
            this.dogSprite.y = 0;
            this.dogSprite.setVelocityY(0);
        }

        //lose music
        if (this.dogSprite.y >= this.sys.game.config.height - 50 && !this.loseMusicPlaying){
            this.gameOver = true;
            this.backgroundMusic.stop();
            this.loseMusic.play();
            this.loseMusicPlaying = true;
            this.dogSprite.setVelocityX(0);
            if (this.score > this.highScore){
                this.highScore = this.score;
                localStorage.setItem('highScore', this.highScore);
            }
            this.scene.start('overScene', {score: this.score, highScore: this.highScore});
        }

        //left and right movement
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && !land){
            this.dogSprite.setVelocityX(-800);
            this.dogSprite.anims.play('dog-left', true);
        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && !land){
            this.dogSprite.setVelocityX(800);
            this.dogSprite.anims.play('dog-right', true);
        }
        else if (!Phaser.Input.Keyboard.JustDown(keyLEFT) && !Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.dogSprite.setVelocityX(0);
        }

        //dog touching platform
        this.touchedPlatform = this.touchingPlatform;
    }
}