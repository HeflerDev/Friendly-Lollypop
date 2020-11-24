// Base Library
import Phaser from 'phaser';
// Project Modules
import playerModule from '../modules/playerModule';
import foesModule from '../modules/foesModule';
import stagesModule from '../modules/stagesModule';
import layerModule from '../modules/layerModule';
import hudModule from '../modules/hudModule';

export default class VillageStage extends Phaser.Scene {
  constructor() {
    super('villagestage');

    this.score = 0;

    this.player = playerModule.Player('Johnny', this);
    this.playerBody = null;
    this.stage = stagesModule.Stage(this).village;

    this.map = null;
    this.dinamicLayer = null;

    this.bat = foesModule.Foe('bat', this).bat;
    this.enemies = [];

    this.isColliding = false;
    this.currentFoe = null;

    this.hud = hudModule.Hud(this.player.information, this);
  }

  preload() {
    this.bat.animations.loadSprites();
    this.player.animations.loadSprites();
    this.stage.load();
  }

  create() {
    this.hud.elements.create(0, 0);
    this.map = this.stage.build();
    this.dinamicLayer = layerModule.Layer(this.map.layer).grid

    this.playerBody = this.player.body.createPlayer();
    this.player.animations.createSprites();

    this.bat.animations.createSprites();


  }


  update() {
    this.player.controls.movePlayer(this.playerBody, this.map.layer, () => {
      if (this.swapTurns()) {
        this.enemies.forEach((enemy) => {
          while (this.foeTurn(enemy)) {
            if (enemy.body.active) {
                const positions = this.dinamicLayer.positioning(this.playerBody, enemy.body);
                this.bat.behavior.react.move(enemy.body, positions);
                this.bat.behavior.react.attack(enemy.body, this.playerBody);
            }
          }
        });
          this.score += 1;
          this.bat.body.spawnRandomDependingOnScore();
      }
    }, () => {
      if (this.isColliding) {
        if (this.player.information.situation.moves <= this.player.information.stats.dex - 1) {
          if (!this.dinamicLayer.isBlocked(this.playerBody).bellow) {
            this.playerBody.y += 16;
          };
          this.player.animations.playSprites(this.playerBody, 'attack', 500);
          this.currentFoe.body.anims.play('batDamage', true);
          const thisFoe = this.currentFoe;
          setTimeout(() => { thisFoe.body.anims.play('batIdle', true) }, 500);
          this.currentFoe.data.currentHp -= 1;
          this.player.information.situation.moves += 1;
        } else {
          this.player.animations.playSprites(this.playerBody, 'blink', 500);
        }
      } else {
        this.player.animations.playSprites(this.playerBody, 'blink', 500);
      }
    });
    if (this.currentFoe) {
      if (this.currentFoe.data.currentHp <= 0) {
        this.score += 5;
        this.currentFoe.body.destroy();
      }
    }
    if (this.overLap != null) {
      this.overLap.destroy();
    }

    this.isColliding = false;
    this.currentFoe = null;
    this.player.logic.trackHealth(this.playerBody);
    this.hud.elements.update();
            // console.log(this.enemies);
  }

  swapTurns() {
    const info = this.player.information;
    if (info.situation.moves < info.stats.dex - 1) {
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
