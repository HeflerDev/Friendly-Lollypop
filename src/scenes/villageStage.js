import Phaser from 'phaser';

import playerModule from '../modules/playerModule';
import foesModule from '../modules/foesModule';
import stagesModule from '../modules/stagesModule';
import parseLayer from '../modules/parseLayer';

export default class VillageStage extends Phaser.Scene {
  constructor() {
    super('villagestage');
    this.player = playerModule.Player('Johnny', this);
    this.playerBody = null;
    this.stage = stagesModule.Stage(this).village;
    this.map = null;
    this.foe = foesModule.Foe('bat', this).bat;
    this.foeBody = null;
  }

  preload() {
    this.foe.animations.loadSprites();
    this.player.animations.loadSprites();
    this.stage.load();
  }

  create() {
    this.map = this.stage.build();

    this.playerBody = this.player.body.createPlayer();
    this.player.animations.createSprites();

    this.foe.animations.createSprites();
    this.foeBody = this.foe.body.createBody(336, 336);
    const bd = this.foe.body.createBody(304, 336);
      this.foe.animations.animate(bd);
    this.foe.animations.animate(this.foeBody);
  }

  update() {
    this.player.controls.movePlayer(this.playerBody, this.map.layer, () => {
      if (this.swapTurns()) {
        while (this.foeTurn()) {
          const result = this.foe.behavior.react(parseLayer.positioning(
            this.playerBody,
            this.foeBody,
            this.map.layer,
          ));
          const [resultX, resultY] = result;
          this.foeBody.x += resultX;
          if (!parseLayer.isBlocked(this.foeBody, this.map.layer).bellow) {
            this.foeBody.y += resultY;
          }
        }
      }
    });
  }

  swapTurns() {
    const info = this.player.information;
    if (info.situation.moves < info.stats.dex) {
      this.player.information.situation.moves += 1;
      return false;
    }
    this.player.information.situation.moves = 0;
    return true;
  }

  foeTurn() {
    const info = this.foe.information;
    if (info.moves < info.stats.dex) {
      this.foe.information.moves += 1;
      return true;
    }
    this.foe.information.moves = 0;
    return false;
  }
}
