import CoinSprites from '../assets/items/sCoins.png';

const coinsModule = (() => {
  const Coin = (scene, name = 'coin') => {
    const body = {
      spawnCoin() {
      },
    };

    const animations = {
      loadSprites() {
        scene.load.spritesheet(name, CoinSprites, { frameWidth: 32, frameHeight: 32 });
      },
      createSprites() {
        scene.anims.create({
          key: 'idle',
          frames: scene.anims.generateFrameNumbers(name, { start: 0, end: 7 }),
          frameRate: 1,
          repeat: -1,
        });
      },
    };
    return { body, animations };
  };
  return { Coin };
})();

export default coinsModule;
