import Phaser from 'phaser';
import domModule from '../modules/domModule';

import Buzz from '../assets/sound/Menu/buzz.mp3';
import SelectSound from '../assets/sound/Menu/select.mp3';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.html('menu-form');
    this.load.audio('buzz', Buzz);
    this.load.audio('select', SelectSound);
  }

  create() {
    const { width } = this.scale;
    const { height } = this.scale;

    this.dom = domModule.CreateDOM(this);

    this.dom.render.container(width / 2, height / 2, 'game-menu');

    const btns = this.dom.render.menu('menu-form');
    this.dom.addControllerOn.menu(btns);

  }
}
