import Phaser from 'phaser';

import Menu from '../src/scenes/menu';


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
    scene: [Menu]
}

export default new Phaser.Game(config);
