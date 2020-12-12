import Phaser from 'phaser';
import domModule from '../modules/domModule';
import actorModule from '../modules/actorModule';
import createNew from '../storage/createNew';
import Sound from '../assets/sound/Menu/submit.mp3';
import localData from '../storage/localData';

export default class CreateCharacter extends Phaser.Scene {
  constructor() {
    super('create-character');
  }

  preload() {
    this.player = actorModule.PlayableActor(createNew.Player(), this);
    this.audio = new Audio(Sound);
  }

  create() {
    const { width } = this.scale;

    this.dom = domModule.CreateDOM(this);

    this.dom.render.container(width / 2, 0, 'game-menu');

    const elements = this.dom.render.createCharacterTab();
    this.dom.addControllerOn.createCharacterTab(elements, this.player.data, () => {
      localData.createNewPlayerData(this.player.data)
        .then(() => {
          this.audio.currentTime = 0;
          this.audio.play();
          this.scene.start('cave-stage', this.player.data);
        })
        .catch((err) => { this.dom.render.errorMsg('error-container', err); });
    });
  }
}
