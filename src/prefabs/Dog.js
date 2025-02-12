class Dog extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        
    }
}