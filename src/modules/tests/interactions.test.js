const interactions = require('../interactions');
const create = require('../../storage/create');

describe('when leveling up', () => {
  const player = create.newPlayer('Sample');

  test('player stats update', () => {
    const upgradePlayer = interactions.levelUpPlayer(player);
    expect(upgradePlayer.stats.maxHp).toBe(13);
    expect(upgradePlayer.stats.maxMp).toBe(13);
    expect(upgradePlayer.stats.maxEnergy).toBe(105);
    expect(() => interactions.levelUpPlayer(1)).toThrow(Error);
  });
});

describe('when looting', () => {
  const player = create.newPlayer('Sample');
  const item = create.newItem(
    'Golden Pendant',
    'A golden Pendant',
    'necklace',
    [{ chr: 1 }],
    0.5,
  );
  const playerLooting = interactions.lootItem(player, item);

  test('player grabs the item', () => {
    expect(playerLooting.inventory.items).toContain(item);
  });
});
