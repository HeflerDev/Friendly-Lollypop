import sceneHelpers from './sceneHelpers';

import VillageStageTileMapImage from '../assets/tiles/tiles_image.png';
import VillageStageTileMap from '../assets/tiles/villageStageMap.json';
import MountainsBg from '../assets/backgrounds/mountain_background.png';
import Grid from '../assets/backgrounds/grid.png';

const stages = (() => {

    const village = (scene) => {

        const load = () => {
            scene.load.image('tiles', VillageStageTileMapImage);
            scene.load.tilemapTiledJSON('villageTiles', VillageStageTileMap);
            scene.load.image('background', MountainsBg);
            scene.load.image('grid', Grid);
        };

        const build = () => {
            const coord = sceneHelpers.getMeasures(scene);
            scene.add.image(coord.centerX, coord.centerY -120, 'background')
                .setScale(4);

            const stageTileMap = scene.make.tilemap({key: "villageTiles"});
            const tileset = stageTileMap.addTilesetImage("city_tiles", "tiles");
            const layer = stageTileMap.createDynamicLayer(2, tileset, -8, -50);
            layer.setCollisionByProperty({ collides: true });

            for (let i = 0; i < stageTileMap.layers.length -1 ; i++) {
                stageTileMap.createStaticLayer(i, "city_tiles", -8, -50);
                layer.setDepth(i);
            }
            return {
                stageTileMap,
                tileset,
                layer
            }
        };

        return {
            load,
            build
        }

    };

    return { village }

})();

export default stages;
