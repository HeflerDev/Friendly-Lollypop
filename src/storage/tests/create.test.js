import { create } from '../createNew';

test('test', () => {
  expect(create.newPlayer('Sample'))
    .toEqual({
      name: 'Sample',
      points: 0,
      level: 1,
      xp: 0,
      stats: {
        maxHp: 10,
        maxMp: 10,
        maxEnergy: 100,
        for: 1,
        int: 1,
        dex: 1,
        free: 0,
      },
      situation: {
        currentHp: 10,
        currentMp: 10,
        currentEnergy: 100,
        effects: [],
      },
      inventory: {
        items: [],
        size: 20,
      },
      equipment: {
        head: {},
        chest: {},
        arms: {},
        legs: {},
        leftHand: {},
        rightHand: {},
      },
    });
});
