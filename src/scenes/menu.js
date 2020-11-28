import Phaser from 'phaser';
import domModule from '../modules/domModule';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.html('menu-form');
  }

  create() {
    const { width } = this.scale;
    const { height } = this.scale;

    this.dom = domModule.CreateDOM(this);

    this.dom.render.container(width / 2, height / 2, 'game-menu');
    const btns = this.dom.render.menu('menu-form');
    btns.newGameBtn.addEventListener('click', () => {
      // When game starts
    });
    btns.loadGameBtn.addEventListener('click', () => {
      // When game is loaded
    });
    btns.instructionsBtn.addEventListener('click', () => {
      this.scene.start('instructions');
    });
    btns.creditsBtn.addEventListener('click', ()=> {
      // When Credits are accessed
    });
  }
}
