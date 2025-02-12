class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){
        //music
        this.loseMusic = this.sound.add('lose-music', {volume: 0.2});
       
        //background image
        this.background = this.add.tileSprite(0, 0, 640, 740, 'background').setOrigin(0,0).setScrollFactor(1,0);
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x000000).setOrigin(0,0);
        
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
       this.physics.add.collider(this.platforms, this.dogSprite, this.scoreIncrease, null, this);

       this.dogSprite.body.checkCollision.up = false;
       this.dogSprite.body.checkCollision.left = false;
       this.dogSprite.body.checkCollision.right = false;
       this.dogSprite.body.checkCollision.down = true;
        
       //keys
       keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
       keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //initialize score
        this.p1Score = 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'right'
        }

        //display timer
        this.textConfig = this.add.text(borderUISize*16 + borderPadding, borderUISize + borderPadding*4, `Score: ${this.remainingTime / 1000}`, {
            fontFamily: 'Courier New',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'right',
        }).setOrigin(0.5);
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig); 
        
        //game over flag
        this.gameOver = false;
        this.remainingTime = game.settings.gameTimer;

        //background looping music
        let backgroundMusic = this.sound.play('background-music', {volume: 0.2, loop: true});
       
        //play clock
        this.clock = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.remainingTime -= 1000;
                if (this.remainingTime <= 0){
                    this.clock.remove(false);
                    this.add.text(game.config.width / 2, game.config.height / 2, 'Game Over', scoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press up arrow for menu', scoreConfig).setOrigin(0.5);
                    this.gameOver = true;
                    this.sound.stopByKey('background-music');
                }
            },
            callbackScope: this,
            loop: true,
        });
    }

    //score
    scoreIncrease(dogSprite, platform){
        if (!this.gameOver) {
            this.p1Score += 10; // Increment score
            this.scoreLeft.setText(`Score: ${this.p1Score}`); 
            this.hasLanded = true;
        }
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
            this.jumpMusic = this.sound.add('jump-music', {volume: 0.05});
            this.jumpMusic.play();
            this.dogSprite.setVelocityY(-300);
            this.remainingTime += 4000;
            console.log(this.remainingTime);
        }

        if (this.dogSprite.y <= 0){
            this.dogSprite.y = 0;
            this.dogSprite.setVelocityY(0);
        }

        //lose music
        if (this.dogSprite.y >= this.sys.game.config.height - 50){
            if(!this.loseMusic.isPlaying){
                this.loseMusic.play();
            }
            this.dogSprite.setVelocityX(0);
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