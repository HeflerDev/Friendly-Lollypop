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
            if (information.situation.isAlive) { playerBody.anims.play('die', true) };
            information.situation.isAlive = false;
        }
      },
    };

    const body = {
      createPlayer() {
        const pBody = scene.physics.add.sprite(32, 336, name);
        pBody.setBounce(0.1)
          .setCollideWorldBounds(true)
          .setSize(8, 28, 16);
        return pBody;
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
            key: 'takeDamage',
              frames: scene.anims.generateFrameNumbers(name, { start: 52, end: 53 }),
              framerate: 0.5,
              repeat: -1,
          });
      },

        playSprites(body, spriteKey, miliseconds) {
          body.anims.play(spriteKey);
          scene.player.information.situation.isAlive = false;
          setTimeout(() => { information.situation.isAlive = true }, miliseconds);
        }

    };

    const controls = {
      addKeys() {
        return scene.input.keyboard.addKeys('W,S,A,D,SPACE, ENTER');
      },
      movePlayer(playerBody, layer, hostileMoves, attackMove) {
        if (information.situation.isAlive) {
          if (Phaser.Input.Keyboard.JustDown(this.addKeys().W)) {
            if (scene.dinamicLayer.isBlocked(playerBody, layer).bellow) {
              playerBody.y -= 32;
              hostileMoves();
            }
          }

          if (Phaser.Input.Keyboard.JustDown(this.addKeys().SPACE)) {
            attackMove();
          }

          if (Phaser.Input.Keyboard.JustDown(this.addKeys().ENTER)) {
            console.log('kk');
          }

          if (Phaser.Input.Keyboard.JustDown(this.addKeys().D)) {
            if (!scene.dinamicLayer.isBlocked(playerBody).onRight) {
              playerBody.anims.play('idle').flipX = false;
              playerBody.x += 16;
              hostileMoves();
              if (!scene.dinamicLayer.isBlocked(playerBody).bellow) {
                playerBody.y += 16;
              }
            } else {
              playerBody.anims.play('blink');
              information.situation.isAlive = false;
              setTimeout(() => { information.situation.isAlive = true; }, 500);
            }
          } else if (Phaser.Input.Keyboard.JustDown(this.addKeys().A)) {
            if (!scene.dinamicLayer.isBlocked(playerBody).onLeft) {
              playerBody.anims.play('idle').flipX = true;
              playerBody.x -= 16;
              hostileMoves();
              if (!scene.dinamicLayer.isBlocked(playerBody).bellow) {
                playerBody.y += 16;
              }
            } else {
              playerBody.anims.play('blink');
              information.situation.isAlive = false;
              setTimeout(() => { information.situation.isAlive = true; }, 500);
            }
          } else if (Phaser.Input.Keyboard.JustDown(this.addKeys().S)) {
            hostileMoves();
            if (!scene.dinamicLayer.isBlocked(playerBody).bellow) {
              playerBody.y += 16;
            }
          } else {
            if (information.situation.isAlive) {
              playerBody.anims.play('idle', true);
            }
          }
          if (scene.dinamicLayer.isFatal(playerBody, information.situation.isAlive)) {
            information.situation.isAlive = false;
            scene.input.keyboard.removeAllKeys(true);
            playerBody.anims.play('die');
          }
        }
      },
    };
    return {
      information,
      body,
      animations,
      controls,
      logic,
    };
  };
  return { Player };
})();

export default playerModule;
