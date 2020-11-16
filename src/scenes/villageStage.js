import Phaser from 'phaser';

import Player from '../controller/player';
import foe from '../controller/foe';
import stages from '../controller/stages';
import ParseLayer from '../controller/parseLayer';

var playerChar = null;
var playerBody = null;
var stage = null;
var stageInst = null;
var bat = null;
var foeBody;
export default class VillageStage extends Phaser.Scene {
    constructor() {
        super('villagestage');
        bat = foe.createNew(this).bat('bat');
        playerChar = Player.initialize(this);
        stageInst = stages.village(this);
    }

    preload() {
        bat.animations().loadSprites();
        playerChar.animations().loadSprites();
        stageInst.load();
    }

    create() {
        stage = stageInst.build();

        playerBody = playerChar.character().createPlayer();
        playerChar.animations().createAnimations();

        bat.animations().createSprites();
        foeBody = bat.body().createBody();
        bat.animations().animate(foeBody);
    }

    update() {
        playerChar.createMovement(playerBody, stage.layer);
        ParseLayer.hasFoe(playerBody, foeBody, stage.layer);
    }

}
