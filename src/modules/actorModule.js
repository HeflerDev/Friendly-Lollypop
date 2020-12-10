import Phaser from 'phaser';
import RogueSprite from '../assets/characters/rogue.png';

const actorModule = (() => {
  const PlayableActor = (dataObj, scene) => {

    const data = dataObj;

    const logic = {
      trackHealth(playerBody) {
        if (data.situation.currentHp <= 0) {
          if (data.situation.isAlive) { playerBody.anims.play('die', true); }
          data.die();
          setTimeout(() => {
            scene.scene.restart();
            scene.player.data.situation.isAlive = true;
            scene.player.data.situation.moves = 2;
            scene.player.data.situation.currentHp = scene.player.data.stats.maxHp;
            scene.score = 0;
          }, 3000);
        }
      },
    };

    const character = {
      body: null,
      createPlayer() {
        const pBody = scene.physics.add.sprite(120, 436, data.name);
        pBody.setBounce(0.1)
          .setCollideWorldBounds(true)
          .setSize(8, 28, 16)
          .setDepth(5);
        this.body = pBody;
      },
    };

    const animations = {

      loadSprites() {
        scene.load.spritesheet(data.name, RogueSprite, { frameWidth: 32, frameHeight: 32 });
      },
      createSprites() {
        scene.anims.create({
          key: 'idle',
          frames: scene.anims.generateFrameNumbers(data.name, { start: 0, end: 9 }),
          frameRate: 1,
          repeat: -1,
        });

        scene.anims.create({
          key: 'die',
          frames: scene.anims.generateFrameNumbers(data.name, { start: 40, end: 49 }),
          frameRate: 8,
          repeat: 0,
        });

        scene.anims.create({
          key: 'attack',
          frames: scene.anims.generateFrameNumbers(data.name, { start: 30, end: 39 }),
          frameRate: 20,
          repeat: 0,
        });

        scene.anims.create({
          key: 'blink',
          frames: scene.anims.generateFrameNumbers(data.name, { start: 50, end: 51 }),
          framerate: 0.5,
          repeat: -1,
        });

        scene.anims.create({
          key: 'white',
          frames: scene.anims.generateFrameNumbers(data.name, { start: 51, end: 51 }),
          framerate: 10,
          repeat: -1,
        });

        scene.anims.create({
          key: 'takeDamage',
          frames: scene.anims.generateFrameNumbers(data.name, { start: 52, end: 53 }),
          framerate: 0.5,
          repeat: -1,
        });
      },

      playSprites(body, spriteKey, miliseconds) {
        body.anims.play(spriteKey);
        scene.player.data.situation.isAlive = false;
        setTimeout(() => { data.situation.isAlive = true; }, miliseconds);
      },

    };

    const controls = {
      addKeys() {
        return scene.input.keyboard.addKeys('W,S,A,D,SPACE, ENTER');
      },
      movePlayer(playerBody, layer, playerMove, attackMove, turnEnd) {
        if (data.situation.isAlive) {
          if (Phaser.Input.Keyboard.JustDown(this.addKeys().ENTER)) {
            turnEnd();
          }
          if (scene.player.data.situation.moves < scene.player.data.stats.dex) {
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
                data.situation.isAlive = false;
                setTimeout(() => { data.situation.isAlive = true; }, 500);
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
                data.situation.isAlive = false;
                setTimeout(() => { data.situation.isAlive = true; }, 500);
              }
            } else if (Phaser.Input.Keyboard.JustDown(this.addKeys().S)) {
              if (!scene.dinamicLayer.isBlocked(playerBody).bellow) {
                playerBody.y += 16;
              }
              playerMove();
            } else if (data.situation.isAlive) {
              playerBody.anims.play('idle', true);
            }
          }
        }
      },
    };
    return {
      data,
      animations,
      character,
      controls,
      logic,
    };
  };
  return { PlayableActor };
})();

export default actorModule;
