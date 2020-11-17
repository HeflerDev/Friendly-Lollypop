import Phaser from 'phaser';

import Background from '../assets/backgrounds/village.jpg';

export default class Village extends Phaser.Scene {
  constructor() {
    super('village');
  }

  preload() {
    this.load.image('background', Background);
  }

  create() {
    this.add.image(200, 300, 'background');
  }
}
