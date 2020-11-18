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

    this.bat = foesModule.Foe('bat', this).bat;
    this.enemies = [];

  }

  preload() {
    this.bat.animations.loadSprites();
    this.player.animations.loadSprites();
    this.stage.load();
  }

  create() {

    this.map = this.stage.build();

    this.playerBody = this.player.body.createPlayer();
    this.player.animations.createSprites();

      this.bat.animations.createSprites();
      this.enemies.push(this.bat.body.createBody(200, 200))
      this.enemies.push(this.bat.body.createBody(300, 300))
      this.enemies.push(this.bat.body.createBody(400, 400))

      this.enemies.forEach((enemy) => {
        this.bat.animations.animate(enemy.body);
      });

  }

  update() {
    this.player.controls.movePlayer(this.playerBody, this.map.layer, () => {
        const fo = this.enemies.push(this.bat.body.createBody(250, 250))
        this.bat.animations.animate(this.enemies[fo-1].body);
      if (this.swapTurns()) {
        this.enemies.forEach((enemy) => {
            while(this.foeTurn(enemy)) {
                const result = this.bat.behavior.react(parseLayer.positioning(
                    this.playerBody,
                    enemy.body,
                    this.map.layer
                ));
                const [resultX, resultY] = result;
                enemy.body.x += resultX;
                if (!parseLayer.isBlocked(enemy.body, this.map.layer).bellow) {
                    enemy.body.y += resultY;
                }
            }
        });
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

  foeTurn(foe) {
    if (foe.data.moves < foe.data.stats.dex) {
      foe.data.moves += 1;
      return true;
    }
    foe.data.moves = 0;
    return false;
  }
}
