const sceneHelpers = (() => {

    const getMeasures = (scene) => {
        return {
            'width': scene.scale.width,
            'height': scene.scale.height,
            'centerX': scene.scale.width/2,
            'centerY': scene.scale.width/2
        }
    }

    return {
        getMeasures
    }
})();

export default sceneHelpers;
