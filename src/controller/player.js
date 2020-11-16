import RogueSprite from '../assets/characters/rogue.png';
import ParseLayer from './parseLayer';
import Create from '../storage/create';

const Player = (() => {
    const play = Create.newPlayer('Johnny');

    const controls = (scene) => {
        return scene.input.keyboard.addKeys('W,S,A,D');
    }

    const initialize = (scene) => {

        const animations = () => {
            const loadSprites = () => {
                scene.load.spritesheet('player', RogueSprite, { frameWidth: 32, frameHeight: 32});
            };

            const createAnimations = () => {
                scene.anims.create({
                    key: 'idle',
                    frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
                    frameRate: 1,
                    repeat: -1
                });

                scene.anims.create({
                    key: 'die',
                    frames: scene.anims.generateFrameNumbers('player', { start: 40, end: 49 }),
                    frameRate: 8,
                    repeat: 0
                });

                scene.anims.create({
                    key: 'attack',
                    frames: scene.anims.generateFrameNumbers('player', { start: 30, end: 39 }),
                    frameRate: 60,
                    repeat: 0
                });
            };

            return {
                createAnimations,
                loadSprites
            }
        };

        const character = () => {
            const createPlayer = () => {
                let player = scene.physics.add.sprite(32, 336, 'player');
                player.setBounce(0.1)
                    .setCollideWorldBounds(true)
                    .setSize(8, 28, 16);
                return player;
            };
            return {
                createPlayer,
            }
        }

        const createMovement = (playerBody, layer) => {
           if (play.situation.isAlive) {
                if (Phaser.Input.Keyboard.JustDown(controls(scene).W)) {
                    if (ParseLayer.isBlocked(playerBody, layer).bellow) {
                        playerBody.y -= 32;
                    }
                }

                if (Phaser.Input.Keyboard.JustDown(controls(scene).D)) {
                    if (!ParseLayer.isBlocked(playerBody, layer).onRight) {
                        playerBody.anims.play('idle').flipX = false;
                        playerBody.x += 16;
                        if (!ParseLayer.isBlocked(playerBody, layer).bellow) {
                            playerBody.y += 16;
                        };
                    } else {
                        console.log('right is blocked')
                    }
                } else if (Phaser.Input.Keyboard.JustDown(controls(scene).A)) {
                    if (!ParseLayer.isBlocked(playerBody, layer).onLeft) {
                        playerBody.anims.play('idle').flipX = true;
                        playerBody.x -= 16;
                        if (!ParseLayer.isBlocked(playerBody, layer).bellow) {
                            playerBody.y += 16;
                        };
                    } else {
                        console.log('left is blocked');
                    }
                } else if (Phaser.Input.Keyboard.JustDown(controls(scene).S)) {
                    if (!ParseLayer.isBlocked(playerBody, layer).bellow) {
                        playerBody.y += 16;
                    };
                } else {
                        playerBody.anims.play('idle', true);
                }
                if (ParseLayer.isFatal(playerBody, layer, play.situation.isAlive)) {
                    play.situation.isAlive = false;
                    scene.input.keyboard.removeAllKeys(true);
                    playerBody.anims.play('die');
                }
           }
        };

        return {
            animations,
            createMovement,
            character
        }
    }


    return {
        initialize,
        controls
    }

})();

export default Player;
