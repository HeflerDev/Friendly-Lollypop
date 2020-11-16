
// Library
import Phaser from 'phaser';

// Assets
// Images
import MountainsBg from '../assets/backgrounds/mountain_background.png';
import Grid from '../assets/backgrounds/grid.png';

import player from '../controller/player';
import stages from '../controller/stages';
import parseLayer from '../controller/parseLayer';

var playerBody = null;
var stage = null;

export default class VillageStage extends Phaser.Scene {
    constructor() {
        super('villagestage');
    }

    preload() {
        player.initialize(this).animations().loadSprites();
        stages.village(this).load();
    }

    create() {
        stage = stages.village(this).build();
        playerBody = player.initialize(this).character().createPlayer();
        player.initialize(this).animations().createAnimations();
    }

    update() {
        player.initialize(this).createMovement(playerBody, stage.layer);
    }

}
