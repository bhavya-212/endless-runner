class Bone extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(0.3);
    }

    update(){
        
    }
}