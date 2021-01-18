const sceneHelpers = (() => {
  const getMeasures = (scene) => ({
    width: scene.scale.width,
    height: scene.scale.height,
    centerX: scene.scale.width / 2,
    centerY: scene.scale.height / 2,
  });

  return {
    getMeasures,
  };
})();

export default sceneHelpers;
