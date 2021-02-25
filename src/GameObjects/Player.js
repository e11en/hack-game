import Phaser from "phaser";

const directions = {
    up: {key: "up", x: 0, y: -2, opposite: "down"},
    right: {key: "right", x: 2, y: 0, opposite: "left"},
    down: {key: "down", x: 0, y: 2, opposite: "up"},
    left: {key: "left", x: -2, y: 0, opposite: "right"},
};

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        this.speed = 100;
        this.sprite = scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.direction = directions.down;
        //this.isInteracting
    }

    update ()
    {
        this.move();
    }

    move() {
        this.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.scene.player.body.setVelocityX(-this.speed);
            this.direction = directions.left;
        }  
        else if (this.cursors.right.isDown) {
            this.scene.player.body.setVelocityX(this.speed);
            this.direction = directions.right;
        }

        if (this.cursors.up.isDown) {
            this.scene.player.body.setVelocityY(-this.speed);
            this.direction = directions.up;
        }
        else if (this.cursors.down.isDown) {
            this.scene.player.body.setVelocityY(this.speed);
            this.direction = directions.down;
        }

        this.scene.player.body.velocity.normalize().scale(this.speed);

        if (this.isAnyCursorDown()) {
            this.sprite.play({ key: 'walk-' + this.direction.key, repeat: -1 }, true);
        }
        else
            this.sprite.stop();
    }

    isAnyCursorDown() {
        return this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown;
    }

    onCollision(player, object) {
        console.log(player, object);
    }
}