import Phaser from 'phaser';

import actorModule from '../modules/actorModule';
import foesModule from '../modules/foesModule';
import stagesModule from '../modules/stagesModule';
import layerModule from '../modules/layerModule';
import hudModule from '../modules/hudModule';

export default class CaveStage extends Phaser.Scene {

  

  constructor() {
    super('cave-stage');
    this.score = 0;
    
    

    // Checkers
    this.isColliding = false;
    this.currentFo = null;

    // this.hud = hudModule.Hud(this.player.information, this);
  }

  init(data) {
    this.player = actorModule.PlayableActor(data, this);
    this.bat = foesModule.Foe('bat', this).bat;
    this.stage = stagesModule.Stage(this).cave;
    this.enemies = [];
  }

  preload() {
    // Actors Sprites 
    this.player.animations.loadSprites();
    this.bat.animations.loadSprites();
    // Stage
    this.stage.load();
  }

  create() {
    this.hud.elements.create(0, 0);
    this.level = this.stage.build();
    this.dinamicLayer = layerModule.Layer(this.level.layer).grid;

    this.player.character.createPlayer();
    this.player.animations.createSprites();

    this.bat.animations.createSprites();
    // Stage
    this.stage.build();
  }

  update() {
    this.player.controls.movePlayer(this.player.character.body, this.level.layer, () => {
      this.player.information.situation.moves += 1;

      if ( // Check if player is on a hazardous area
        this.dinamicLayer
          .tileIsDeadly(this.player.character.body, this.player.information.situation.isAlive)) {
        this.player.information.situation.currentHp -= 4;
      }
    }, () => { // When close Enough to attacj
      if (this.isColliding) {
        if (this.player.information.situation.moves <= this.player.information.stats.dex - 1) {
          this.player.animations.playSprites(this.player.character.body, 'attack', 500);
          this.currentFoe.body.anims.play('batDamage', true);
          const thisFoe = this.currentFoe;
          setTimeout(() => { thisFoe.body.anims.play('batIdle', true); }, 500);
          this.currentFoe.data.currentHp -= 1;
          this.player.information.situation.moves += 1;
        } else {
          this.player.animations.playSprites(this.player.character.body, 'blink', 500);
        }
      } else {
        this.player.animations.playSprites(this.player.character.body, 'blink', 500);
      }
    }, () => { // When is the enemy Turn
      this.enemies.forEach((enemy) => {
        if (enemy.body.active) {
          while (enemy.data.moves < enemy.data.stats.dex) {
            const positions = this.dinamicLayer.positioning(this.player.character.body, enemy.body);
            this.bat.behavior.react.move(enemy.body, positions);
            this.bat.behavior.react.attack(enemy.body, this.player.character.body);
            enemy.data.moves += 1;
          }
          enemy.data.moves = 0;
        }
      });
      this.score += 1;
      this.bat.body.spawnRandomDependingOnScore();
      this.player.information.situation.moves = 0;
    });
    if (this.currentFoe) { // Check if the foe is killed
      if (this.currentFoe.data.currentHp <= 0) {
        this.score += 5;
        this.currentFoe.body.destroy();
      }
    }
    this.hud.elements.update();
    this.isColliding = false;
    this.currentFoe = null;
    this.player.logic.trackHealth(this.player.character.body);
  }
}
