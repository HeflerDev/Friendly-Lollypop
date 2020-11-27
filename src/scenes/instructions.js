import Phaser from 'phaser';
import domModule from '../modules/domModule';

export default class Instructions extends Phaser.Scene {
  constructor() {
    super('instructions');
    this.explanation =
      'This is a platform turn-based game. <br>' +
      'The game hud contains several items: The moves left, the Hp and the score counter. <br>' +
      'Every move you do, including attack, use one of your moves, and ' +
      'only reset when the turn end. Every turn you end and enemy you kill,' +
      'increment your score. <br>' +
      'But beware: When you turn ends it\'s the enemy time to play. <br>' +
      'Use WASD to move, if the character blink, means it was\'nt wasted any move because it was ' +
      'invalid. <br>' +
      'When near an enemy, SPACE to attack, and when there is no more moves, HOLD ENTER to ' +
      'end the turn.'

  }

  preload() {
    this.load.html('instructions');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.dom = domModule.CreateDOM(this)
     this.dom.render.container(width/2, height/3, 'instructions');
    this.dom.render.instructionsText(this.explanation).addEventListener('click', () => {
      this.scene.start('menu');
    });

  }
}
