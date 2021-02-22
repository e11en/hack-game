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

        this.speed = 0.5;
        this.sprite = scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.direction = directions.down;
    }

    update ()
    {
        this.setDirectionOnCursorDown();

        if (this.isAnyCursorDown()) {
            this.sprite.play({ key: 'walk-' + this.direction.key, repeat: -1 }, true);

            this.x += this.direction.x * this.speed;
            this.y += this.direction.y * this.speed;
        }
        else
            this.sprite.stop();
    }

    setDirectionOnCursorDown() {
        if (this.cursors.left.isDown)
            this.direction = directions.left;
        else if (this.cursors.right.isDown)
            this.direction = directions.right;

        if (this.cursors.up.isDown)
            this.direction = directions.up;
        else if (this.cursors.down.isDown)
            this.direction = directions.down;
    }

    isAnyCursorDown() {
        return this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown;
    }

    // onCollision(player, object) {
    //     console.log(player, object);
    //     player.body.velocity.x = 0;
    //     this.speed = 0;
    // }
}