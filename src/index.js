import Phaser from 'phaser';
import './style/master.scss';

import Menu from './scenes/menu';
import CaveStage from './scenes/caveStage';
import CreateCharacterMenu from './scenes/createCharacterMenu';
import LoadGameMenu from './scenes/loadGameMenu';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 512,
  parent: 'phaser-container',
  backgroundColor: 'rgb(80,20,50)',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Menu, CreateCharacterMenu, LoadGameMenu, CaveStage],
};

export default new Phaser.Game(config);
