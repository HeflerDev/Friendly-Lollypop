const create = (() => {
  const newPlayerData = (key) => ({
    name: key,
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
      isAlive: true,
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

    const newAnimalData = (key) => ({
        name:key,
        stats: {
            maxHp: 3,
            for:1,
            int:0,
            dex:3,
        },
        currentHp:3
    });

  const newItem = (name, description = '', type, effects, weight) => {
    if (
      typeof name === 'string'
            && typeof description === 'string'
            && typeof type === 'string'
            && Array.isArray(effects)
    ) {
      return {
        name,
        description,
        type,
        effects,
        weight,
      };
    }
    throw new Error('Invalid Parameter Format');
  };

  return {
      newPlayerData,
      newAnimalData,
      newItem
  };
})();

module.exports = create;
