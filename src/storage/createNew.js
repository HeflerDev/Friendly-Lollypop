const createNew = (() => {
  const Player = (key) => ({
    name: key,
    type: 'Humanoid',
    points: 0,
    level: 1,
    xp: 0,
    stats: {
      for: 1,
      int: 1,
      dex: 1,
      free: 2,
      getMaxHp() { return (10 + this.for * 2) },
      getMaxMp() { return (10 + this.int * 2) },
      getMaxEnergy() { return (100 + this.dex * 10) },
    },
    situation: {
      currentHp: 10,
      currentMp: 10,
      currentEnergy: 100,
      moves: 0,
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

    setStatPoint: {
      addFor() {
        if (stats.free > 0) {
          stats.for += 1;
          stats.free -= 1;
        }
      },

      addInt() {
        if(stats.free > 0) {
          stats.int += 1;
          stats.free -= 1;
        }
      },

      addDex() {
        if (stats.free > 0) {
          stats.dex += 1;
          stats.free -= 1;
        }
      },
    },

    die() {
      this.situation.isAlive = false;
    },

    takeDamage(bruteDamage) {
      const damage = bruteDamage - this.stats.for;
      if (damage > 0) {
        this.situation.currentHp -= damage
        if (this.situation.currentHp <= 0) {
          this.die();
        }
      }
    },

    levelUp() {
      this.level += 1;
      this.stats.free += 2;
      this.xp = 0;
    },

    gainXp(amount) {
      const ceiling = this.level * 5;
      this.xp += amount;
      if (this.xp >= ceiling) {
        const rest = this.xp - ceiling;
        this.levelUp();
        this.xp += rest;
      }
    }

    lootItem(item) {
      if (this.inventory.items.length >= this.inventory.size) {
        this.inventory.push(item);
      };
    }

  });

  const SmallAnimal = (key, level) => ({
    name: key,
    level: level,
    isAlive: true,
    stats: {
      maxHp: 3,
      for: 1,
      int: 0,
      dex: 3,
    },
    currentHp: 3,
    moves: 0,
    initialize() {
      this.stats.maxHp = 3 + level + this.for;
      this.stats.for = Math.floor(1 + level/3);
      this.stats.dex = 3 + level
    };
  });

  const Item = (name, description = '', type, effects, weight) => {
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
    Player,
    SmallAnimal,
    Item,
  };
})();

module.exports = createNew;
