import Phaser from 'phaser';
import sceneHelpers from './sceneHelpers';
import layerParser from '../controller/layerParser';

import MountainsBg from '../assets/backgrounds/mountain_background.png';
import Grid from '../assets/backgrounds/grid.png';

import BatSprite from '../assets/characters/bat.png';
import RogueSprite from '../assets/characters/rogue_right.png';

import VillageStageTileMapImage from '../assets/tiles/tiles_image.png';
import VillageStageTileMap from '../assets/tiles/villageStageMap.json';

var player;

let keyUp;
let keyLeft;
let keyRight;
let keySkip;
let keySpace;

let stageTileMap;
let tileset;
let layer;

let isAlive = true;

const tile_size = 48;


export default class VillageStage extends Phaser.Scene {
    constructor() {
        super('village-stage');
    }

    preload() {
        this.load.image('tiles', VillageStageTileMapImage);
        this.load.tilemapTiledJSON("villageTiles", VillageStageTileMap);

        this.load.image('background', MountainsBg);
        this.load.image('grid', Grid);

        this.load.spritesheet('bat', BatSprite, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player', RogueSprite, { frameWidth: 32, frameHeight: 32});
    }

    create() {

        const coord = sceneHelpers.getMeasures(this);

        this.add.image(coord.centerX, coord.centerY -120, 'background')
            .setScale(4);

        stageTileMap = this.make.tilemap({key: "villageTiles"});
        tileset = stageTileMap.addTilesetImage("city_tiles", "tiles");
        layer = stageTileMap.createDynamicLayer(2, tileset, -8, -50);
        layer.setCollisionByProperty({ collides: true });


        for (let i = 0; i < stageTileMap.layers.length - 1; i++) {
            stageTileMap.createStaticLayer(i, "city_tiles", -8, -50);
            layer.setDepth(i);
        }

        player = this.physics.add.sprite(32, 336, 'player');
        player.setBounce(0.1)
            .setCollideWorldBounds(true)
            .setScale(1)
            .setSize(8, 28, 16);

        this.physics.add.collider(player, layer);

        this.add.image(6,12, 'grid');

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 20, end: 29 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('player', { start: 40, end: 49 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 29, end: 20 }),
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
            frames: this.anims.generateFrameNumbers('player', { start: 30, end: 39 }),
            frameRate: 60,
            repeat: 1
        })

        keyUp = this.input.keyboard.addKey('w');
        keyLeft = this.input.keyboard.addKey('a');
        keyRight = this.input.keyboard.addKey('d');
        keySkip =  this.input.keyboard.addKey('s');
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    update() {

        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            if (!layerParser.isBlocked(player, layer).onRight) {
                    player.x += 16;
                    player.anims.play('right', true).flipX = false;
                if (!layerParser.isBlocked(player, layer).bellow){
                    player.y += 16;
                }
            } else {
                console.log('Right is Blocked');
            }
        } else if (Phaser.Input.Keyboard.JustDown(keyLeft)) {
            if (!layerParser.isBlocked(player, layer).onLeft) {
                player.x -= 16;
                player.anims.play('left', true).flipX = true;
                if (!layerParser.isBlocked(player, layer).bellow){
                    player.y += 16;
                }
            } else {
                console.log('Left is Blocked');
            }
        } else if (keySpace.isDown && keySpace.getDuration() < 200) {
            player.anims.play('attack', true);
        } else {
            player.setVelocityX(0);
            if (isAlive) {
                player.anims.play('idle', true);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keySkip)) {
            if ( !layerParser.isBlocked(player, layer).bellow) {
                player.y += 16;
            } else {
                console.log('Player is touching the ground');
            }
        };

        if (Phaser.Input.Keyboard.JustDown(keyUp)) {
            if ( layerParser.isBlocked(player, layer).bellow) {
                player.y -= 32;
            } else {
                console.log('Player is In the Air');
            }
        }

        if (layerParser.isFatal(player, layer, isAlive)) {
            isAlive = false;
            this.input.keyboard.removeAllKeys(true);
            player.anims.play('die');
        };


    }

}
