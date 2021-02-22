import Phaser from "phaser";

import Player from "./GameObjects/Player";
import Console from "./GameObjects/Console";

export default class Scene extends Phaser.Scene {
    constructor() {
        super({ key: "Scene" });

        this.player = null;
        this.objects = null;
    }

    preload() {
        this.load.image('background', 'assets/map/level1.png');
        this.load.image('console', 'assets/objects/console.png');
        this.load.spritesheet('player', 'assets/characters/player/player.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2);

        var consolie = new Console(this, 100, 300);
        this.player = new Player(this, 300, 300);

        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('player', { frames: [0,1,2]}),
            frameRate: 10
        });
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('player', { frames: [3,4,5]}),
            frameRate: 10
        });
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('player', { frames: [6,7,8]}),
            frameRate: 10
        });
        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('player', { frames: [9,10,11]}),
            frameRate: 10
        });

        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, consolie);
        //this.physics.add.overlap(this.player, consolie, (player, consolie) => {player.body.velocity.x = 0; this.input.disabled = true}, null, this);

    }

    update() {
        this.player.update();
    }
}