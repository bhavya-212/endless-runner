class Bone extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.setScale(1.5);
    }


    update(){

    }
}