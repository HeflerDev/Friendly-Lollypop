import Phaser from 'phaser';
import domModule from '../modules/domModule';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.html('menu-form');
  }

  create(){
    const width = this.scale.width;
    const height = this.scale.height;

    this.dom = domModule.CreateDOM(this);


    this.dom.render.container(width/2, height/2, 'menu-form');
    const btns = this.dom.render.menu('menu-form');
    btns.newGame.addEventListener('click', () => {
      this.scene.start('cave-stage');
    });
    btns.instructions.addEventListener('click', () => {
      this.scene.start('instructions');
    });
  }
}
