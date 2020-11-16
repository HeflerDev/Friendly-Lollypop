import BatSprite from '../assets/characters/bat.png';
import parseLayer from './parseLayer';

const foe = (() => {

    const createNew = (scene) => {
        const Bat = (id) => {

            const info = {
                hp: 5,
                dmg: 2,
                isAlive: true
            };

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

            const behavior = (difference) => {
                let result = [];
                if (difference.verifyX > 0) {
                    result.push(+8);
                } else if (difference.verifyX < 0) {
                    result.push(-8);
                } else {
                    result.push(0);
                }

                if (difference.verifyY > 0) {
                    result.push(+8);
                } else if (difference.verifyY < 0) {
                    result.push(-8);
                } else {
                    result.push(0);
                }

                return result;
            };

            return {
                behavior,
                info,
                animations,
                body
            }
        };
        return {
            Bat
        }
    };
    return {
        createNew
    }
})();

export default foe;
