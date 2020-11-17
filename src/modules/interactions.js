const interactions = (() => {
  const levelUpPlayer = (player) => {
    if (typeof player === 'object') {
      player.stats.maxHp += 3;
      player.stats.maxMp += 3;
      player.stats.maxEnergy += 5;
    } else {
      throw new Error('Parameter must be Object');
    }
    return player;
  };

  const lootItem = (player, loot) => {
    if (typeof player !== 'object' && !Array.isArray(loot)) {
      throw new Error('Invalid Parameters');
    }
    player.inventory.items.push(loot);
    return player;
  };

  return {
    levelUpPlayer,
    lootItem,
  };
})();

module.exports = interactions;
