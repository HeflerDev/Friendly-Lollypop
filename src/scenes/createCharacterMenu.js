import Phaser from 'phaser';
import domModule from '../modules/domModule';
import playerModule from '../modules/playerModule';
import createNew from '../storage/createNew';

export default class CreateCharacter extends Phaser.Scene {
  constructor() {
    super('create-character');

  }

  preload() {
    this.load.html('create-form');
  }

  create() {
    const { width } = this.scale;
    const { height } = this.scale;

    this.player = createNew.Player('Sample');

    this.dom = domModule.CreateDOM(this);
    this.dom.render.container(width/2, 0, 'game-menu');
    const elements = this.dom.render.createCharacterTab();
    this.dom.addControllerOn.createCharacterTab(elements, player);
  }

}
