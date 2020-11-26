import Phaser from 'phaser';
import domModule from './domModule';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
    this.sizing = {
      'width': this.scale.width,
      'height': this.scale.height,
      'centerX': this.scale.width/2,
      'centerY':this.scale.height/2
    };
  }

  preload() {
    this.load.html('menu-form');
  }

  create(){
    this.dom = domModule.createDOM(this);

    const btns = this.dom.render.container(this.sizing.centerX, this.sizing.centerY, 'menu-form');
    btns.newGame.addEventListener('click', () => {

    });
    btns.instructions.addEventListener('click', () => {

    });
  }
}
