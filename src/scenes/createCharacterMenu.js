import Phaser from 'phaser';
import domModule from '../modules/domModule';
import actorModule from '../modules/actorModule';
import createNew from '../storage/createNew';
import localData, {createNewPlayerData} from '../storage/localData';
import Sound from '../assets/sound/Menu/submit.mp3';

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
    const { height } = this.scale;

    this.dom = domModule.CreateDOM(this);

    this.dom.render.container(width/2, 0, 'game-menu');
    
    const elements = this.dom.render.createCharacterTab();
    this.dom.addControllerOn.createCharacterTab(elements, this.player.data, (playerObj) => {
      createNewPlayerData(this.player.data)
        .then(() => { 
          console.log(playerObj);
          console.log(JSON.parse(JSON.stringify(playerObj)));
          this.audio.currentTime = 0;
          this.audio.play();
          this.scene.start('cave-stage', this.player.data);
        })
        .catch((err) => { this.dom.render.errorMsg('error-container', err)});
    });
  }

}
