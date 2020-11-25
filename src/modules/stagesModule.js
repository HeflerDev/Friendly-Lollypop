import sceneHelpers from './sceneHelpers';

import VillageStageTileMapImage from '../assets/tiles/tiles_image.png';
import VillageStageTileMap from '../assets/tiles/villageStageMap.json';
import MountainsBg from '../assets/backgrounds/mountain_background.png';

import CaveStageTileMapImage from '../assets/tiles/caves.png';
import CaveStageTileMap from '../assets/tiles/caveStageMap.json';

import Grid from '../assets/backgrounds/grid.png';

const stagesModule = (() => {
  const Stage = (scene) => {
    const village = {
      load() {
        scene.load.image('tiles', VillageStageTileMapImage);
        scene.load.tilemapTiledJSON('villageTiles', VillageStageTileMap);
        scene.load.image('background', MountainsBg);
        scene.load.image('grid', Grid);
      },
      build() {
        const coord = sceneHelpers.getMeasures(scene);
        scene.add.image(coord.centerX, coord.centerY - 120, 'background')
          .setScale(4);

        const stageTileMap = scene.make.tilemap({ key: 'villageTiles' });
        const tileset = stageTileMap.addTilesetImage('city_tiles', 'tiles');
        const layer = stageTileMap.createDynamicLayer(2, tileset, -8, -50);
        layer.setCollisionByProperty({ collides: true });

        for (let i = 0; i < stageTileMap.layers.length - 1; i++) {
          stageTileMap.createStaticLayer(i, 'city_tiles', -8, -50);
          layer.setDepth(i);
        }
          return {
              stageTileMap,
              tileset,
              layer
          }
      },
    };

    const cave = {
      load() {
        scene.load.image('tiles', CaveStageTileMapImage);
        scene.load.tilemapTiledJSON('caveTiles', CaveStageTileMap);
      },
      build() {
        const coord = sceneHelpers.getMeasures(scene);

        const stageTileMap = scene.make.tilemap({ key: 'caveTiles' });
        const tileset = stageTileMap.addTilesetImage('sheet', 'tiles');
        const layer = stageTileMap.createDynamicLayer(3, tileset, 0, 0);
        layer.setCollisionByProperty({ collides: true });

        for (let i = 0; i < stageTileMap.layers.length - 1; i++) {
          stageTileMap.createStaticLayer(i, 'sheet', 0, 0);
          layer.setDepth(i);
        }
          return {
              stageTileMap,
              tileset,
              layer
          }

      },
    }
    return { village, cave };
  };
  return { Stage };
})();

export default stagesModule;
