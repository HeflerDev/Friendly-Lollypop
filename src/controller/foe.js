import BatSprite from '../assets/characters/bat.png';

const foe = (() => {

    const createNew = (scene) => {
        const bat = (id) => {
            const animations = () => {
                const loadSprites = () => {
                    scene.load.spritesheet(id, BatSprite, { frameWidth: 32, frameHeight: 32 });
                };

                const createSprites = () => {
                    scene.anims.create({
                        key: 'batIdle',
                        frames: scene.anims.generateFrameNumbers(id, { start: 0, end: 4 }),
                        framerate: 0.5,
                        repeat: -1
                    });
                };

                const animate = (body) => {
                   body.anims.play('batIdle');
                };

                return {
                    loadSprites,
                    animate,
                    createSprites
                }
            };
            const body = () => {
                const createBody = () => {
                    let foeBody = scene.physics.add.sprite(64, 336, id);
                    return foeBody;
                };
                return {
                    createBody
                }
            };
            return {
                animations,
                body
            }
        };
        return {
            bat
        }
    };
    return {
        createNew
    }
})();

export default foe;
