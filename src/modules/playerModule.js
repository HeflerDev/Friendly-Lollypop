import Phaser from 'phaser';
import RogueSprite from '../assets/characters/rogue.png';
import layerModule from './layerModule';
import create from '../storage/create';

const playerModule = (() => {
  const Player = (name, scene) => {
    const information = create.newPlayerData(name);

    const logic = {
      trackHealth(playerBody) {
        if (information.situation.currentHp <= 0) {
          if (information.situation.isAlive) { playerBody.anims.play('die', true); }
          information.situation.isAlive = false;
          setTimeout(() => { scene.endGame = true }, 3000);
        }
      },
    };

    const character = {
      body: null,
      createPlayer() {
        const pBody = scene.physics.add.sprite(120, 436, name);
        pBody.setBounce(0.1)
          .setCollideWorldBounds(true)
          .setSize(8, 28, 16)
          .setDepth(5);
        this.body = pBody;
      },
    };

    const animations = {

      loadSprites() {
        scene.load.spritesheet(name, RogueSprite, { frameWidth: 32, frameHeight: 32 });
      },
      createSprites() {
        scene.anims.create({
          key: 'idle',
          frames: scene.anims.generateFrameNumbers(name, { start: 0, end: 9 }),
          frameRate: 1,
          repeat: -1,
        });

        scene.anims.create({
          key: 'die',
          frames: scene.anims.generateFrameNumbers(name, { start: 40, end: 49 }),
          frameRate: 8,
          repeat: 0,
        });

        scene.anims.create({
          key: 'attack',
          frames: scene.anims.generateFrameNumbers(name, { start: 30, end: 39 }),
          frameRate: 20,
          repeat: 0,
        });

        scene.anims.create({
          key: 'blink',
          frames: scene.anims.generateFrameNumbers(name, { start: 50, end: 51 }),
          framerate: 0.5,
          repeat: -1,
        });

        scene.anims.create({
          key: 'white',
          frames: scene.anims.generateFrameNumbers(name, { start: 51, end: 51 }),
          framerate: 10,
          repeat: -1
        });

        scene.anims.create({
          key: 'takeDamage',
          frames: scene.anims.generateFrameNumbers(name, { start: 52, end: 53 }),
          framerate: 0.5,
          repeat: -1,
        });
      },

      playSprites(body, spriteKey, miliseconds) {
        body.anims.play(spriteKey);
        scene.player.information.situation.isAlive = false;
        setTimeout(() => { information.situation.isAlive = true; }, miliseconds);
      },

    };

    const controls = {
      addKeys() {
        return scene.input.keyboard.addKeys('W,S,A,D,SPACE, ENTER');
      },
      movePlayer(playerBody, layer, playerMove, attackMove, turnEnd) {
        if (information.situation.isAlive) {
          if (Phaser.Input.Keyboard.JustDown(this.addKeys().ENTER)) {
            turnEnd();
          }
          if (scene.player.information.situation.moves < scene.player.information.stats.dex) {
            if (Phaser.Input.Keyboard.JustDown(this.addKeys().W)) {
              if (scene.dinamicLayer.isBlocked(playerBody).bellow) {
                playerBody.y -= 32;
                playerMove();
              }
            }

            if (Phaser.Input.Keyboard.JustDown(this.addKeys().SPACE)) {
              if (scene.dinamicLayer.isBlocked(playerBody).bellow) {
                attackMove();
              } else {
                scene.player.animations.playSprites(playerBody, 'blink', 500);
              }
            }


            if (Phaser.Input.Keyboard.JustDown(this.addKeys().D)) {
              if (!scene.dinamicLayer.isBlocked(playerBody).onRight) {
                playerBody.anims.play('idle').flipX = false;
                playerBody.x += 16;
                if (!scene.dinamicLayer.isBlocked(playerBody).bellow) {
                  playerBody.y += 16;
                }
                playerMove();
              } else {
                playerBody.anims.play('blink');
                information.situation.isAlive = false;
                setTimeout(() => { information.situation.isAlive = true; }, 500);
              }
            } else if (Phaser.Input.Keyboard.JustDown(this.addKeys().A)) {
              if (!scene.dinamicLayer.isBlocked(playerBody).onLeft) {
                playerBody.anims.play('idle').flipX = true;
                playerBody.x -= 16;
                if (!scene.dinamicLayer.isBlocked(playerBody).bellow) {
                  playerBody.y += 16;
                }
                playerMove();
              } else {
                playerBody.anims.play('blink');
                information.situation.isAlive = false;
                setTimeout(() => { information.situation.isAlive = true; }, 500);
              }
            } else if (Phaser.Input.Keyboard.JustDown(this.addKeys().S)) {
              if (!scene.dinamicLayer.isBlocked(playerBody).bellow) {
                playerBody.y += 16;
              }
              playerMove();
            } else if (information.situation.isAlive) {
              playerBody.anims.play('idle', true);
            }
          } else {
            scene.player.animations.playSprites(playerBody, 'white', 500);
          }
        }
      },
    };
    return {
      information,
      animations,
      character,
      controls,
      logic,
    };
  };
  return { Player };
})();

export default playerModule;
