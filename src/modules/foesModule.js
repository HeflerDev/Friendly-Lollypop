import BatSprite from '../assets/characters/bat.png';
import create from '../storage/create';
import layerModule from './layerModule';

const foesModule = (() => {
  const Foe = (id, scene) => {
    const bat = {
      animations: {
        loadSprites() {
          scene.load.spritesheet(id, BatSprite, { frameWidth: 32, frameHeight: 32 });
        },
        animate(body) {
          body.anims.play('batIdle');
        },
        createSprites() {
          scene.anims.create({
            key: 'batIdle',
            frames: scene.anims.generateFrameNumbers(id, { start: 0, end: 3 }),
            framerate: 0.5,
            repeat: -1,
          });

          scene.anims.create({
            key: 'batDamage',
            frames: scene.anims.generateFrameNumbers(id, { start: 16, end: 19 }),
            framerate: 1.0,
            repeat: -1,
          });
        },
      },

      body: {
        spawnRandom() {
          const coord = scene.dinamicLayer.generateRandomFreeBlockPosition();
          console.log(coord)
          const body = scene.physics.add.sprite(coord.randX, coord.randY, id);
          const data = create.newAnimalData(id);
          const obj = { body, data };

          scene.enemies.push(obj);
          body.anims.play('batIdle');
          scene.physics.add.collider(body, scene.player.character.body, () => {
            scene.isColliding = true;
            scene.currentFoe = obj;
          });

          return {
            body,
            data: create.newAnimalData(id),
          };
        },

        spawnRandomDependingOnScore() {
          if (scene.score < 30) {
            if (scene.score % 8 === 0) {
              this.spawnRandom();
            }
          } else if (scene.score < 50) {
            if (scene.score % 6 === 0) {
              this.spawnRandom();
            }
          } else if (scene.score < 80) {
            if (scene.score % 4 === 0) {
                this.spawnRandom();
            }
          } else {
            if (scene.score % 2 === 0) {
              this.spawnRandom();
            }
          }
        }
      },

      behavior: {
        react: {
          move(foeBody, difference) {
            const result = [];
            if (difference.verifyX > 0) {
              result.push(+16);
            } else if (difference.verifyX < 0) {
              result.push(-16);
            } else {
              result.push(0);
            }

            if (difference.verifyY > 0) {
              result.push(+16);
            } else if (difference.verifyY < 0) {
              result.push(-16);
            } else {
              result.push(0);
            }

            const [posX, posY] = result;
            foeBody.x += posX;
            foeBody.y += posY;
          },
          attack(enemyBody, playerBody) {
            scene.physics.add.overlap(playerBody, enemyBody, () => {
              enemyBody.body.touching.none = false;
            });
            if (!enemyBody.body.touching.none) {
              scene.player.animations.playSprites(playerBody, 'takeDamage', 500);
              scene.player.information.situation.currentHp -= 1;
            }
          },
        },
      },
    };
    return {
      bat,
    };
  };
  return { Foe };
})();

export default foesModule;
