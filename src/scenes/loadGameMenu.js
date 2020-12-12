import Phaser from 'phaser';
import domModule from '../modules/domModule';

export default class LoadGameMenu extends Phaser.Scene {
  constructor() {
    super('load-game-menu');
  }

  init() {}

  create() {
    const width = this.scale.x;
    const height = this.scale.y;
    console.log('yay');
    this.dom = domModule.CreateDOM(this);
    this.dom.render.container(width / 2, height / 2, 'load-game');

    const loadGameMenu = this.dom.render.loadGameMenu();
    this.dom.addControllerOn.loadGameMenu(loadGameMenu);
  }

}

