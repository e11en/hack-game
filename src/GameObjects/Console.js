import Phaser from "phaser";

export default class Console extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'console');
        
        this.sprite = scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);

        this.body.setSize(55, 20);
        this.body.setOffset(5, 0);
        this.body.immovable = true;
    }

    update ()
    {

    }

    onCollision(player) {
        this.scene.scene.pause();

        // Show dialog
    }
}