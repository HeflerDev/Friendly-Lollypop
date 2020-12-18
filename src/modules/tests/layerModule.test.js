import layerModule from '../layerModule';

describe('creating new layer', () => {
  // Mock
  const scene = {
    getTileAtWorldXY(r, y, bool) {
      const properties = {
        collides: false
      }

      return {
        properties,
        x: r / 16,
        y: y / 16
      }
    }
  }
  ////////////////////////
  const level = layerModule.Layer(scene).grid;

  test('get position block position diference', () => {
    expect(level.positioning({x:64, y:64}, {x:128, y:128}))
      .toEqual({"verifyX": -4, "verifyY": -4});
  });

  test('get random free block', () => {
    expect(level.generateRandomFreeBlockPosition().randX % 4)
      .toBe(0);
  });
});
