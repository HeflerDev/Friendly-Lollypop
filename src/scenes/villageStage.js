import Phaser from 'phaser';
import sceneHelpers from './sceneHelpers';

import BatSprite from '../assets/characters/bat.png';
import RogueSpriteRight from '../assets/characters/rogue_right.png';
import RogueSpriteLeft from '../assets/characters/rogue_left.png';

import VillageStageTileMapImage from '../assets/tiles/tiles_image.png';
import VillageStageTileMap from '../assets/tiles/villageStageMap.json';

let player;

let keyUp;
let keyLeft;
let keyRight;
let keySpace;

export default class VillageStage extends Phaser.Scene {
    constructor() {
        super('village-stage');
    }

    preload() {
        this.load.image('tiles', VillageStageTileMapImage);
        this.load.tilemapTiledJSON("villageTiles", VillageStageTileMap);

        this.load.spritesheet('bat', BatSprite, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player-right', RogueSpriteRight, { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player-left', RogueSpriteLeft, { frameWidth: 32, frameHeight: 32});
    }

    create() {

        const coord = sceneHelpers.getMeasures(this);

        const stageTileMap = this.make.tilemap({ key: "villageTiles"});
        stageTileMap.addTilesetImage("city_tiles", "tiles");

        for (let i = 0; i < stageTileMap.layers.length; i++) {
            const layer = stageTileMap
                .createStaticLayer(i, "city_tiles", 0, -50);
            layer.setDepth(i);
            // layer.scale = 3;

        }




        player = this.physics.add.sprite(coord.centerX, coord.centerY, 'player');
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player-right', { start: 0, end: 9 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player-right', { start: 20, end: 29 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player-left', { start: 29, end: 20 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 19}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('player-right', { start: 30, end: 39 }),
            frameRate: 60,
            repeat: 1
        })

        keyUp = this.input.keyboard.addKey('w');
        keyLeft = this.input.keyboard.addKey('a');
        keyRight = this.input.keyboard.addKey('d');
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (keyRight.isDown) {
            player.setVelocityX(100);
            player.anims.play('right', true);
        } else if (keyLeft.isDown) {
            player.setVelocityX(-100);
            player.anims.play('left', true);
        } else if (keyUp.isDown) {
            player.setVelocityY(-100);
        } else if (keySpace.isDown && keySpace.getDuration() < 200) {
            player.anims.play('attack', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('idle', true);
        }
    }

}
