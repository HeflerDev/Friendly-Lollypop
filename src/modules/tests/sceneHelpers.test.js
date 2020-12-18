import sceneHelpers from '../sceneHelpers';

describe('on use', () => {

  const scene = {
    scale: {
      width: 600,
      height: 800
    },
  }
  
  test('get measures', () => {
    expect(sceneHelpers.getMeasures(scene).width).toBe(600);
    expect(sceneHelpers.getMeasures(scene).height).toBe(800);
    expect(sceneHelpers.getMeasures(scene).centerX).toBe(300);
    expect(sceneHelpers.getMeasures(scene).centerY).toBe(400);
  });
});
