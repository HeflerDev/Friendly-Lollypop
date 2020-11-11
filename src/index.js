import Phaser from 'phaser';

import Menu from './scenes/menu';
import Village from './scenes/village';
import VillageStage from './scenes/villageStage';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 520,
    parent: 'phaser-container',
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y : 300 },
            debug: false
        }
    },
    scene: [VillageStage, Village, Menu]
}

export default new Phaser.Game(config);
