import create from './create';

const localData = (() => {
  const createNewPlayerData = (key) => {
    const playerData = create.newPlayer(key);
    localStorage.setItem(key, JSON.stringify(playerData));
    return ({ key: playerData });
  };

  const updatePlayerData = (key, value) => {
    new Promise((resolve, reject) => {
      if (localStorage.getItem(key)) {
        resolve(key, value);
      } else {
        reject(new Error('Wrong Player Name'));
      }
    }).then((key, value) => {
      localStorage.removeItem(key).setItem(key, JSON.stringify(value));
      return ({ key: value });
    }).catch((err) => {
      throw err;
    });
  };

  const retrievePlayerData = (key) => JSON.parse(localStorage.getItem(key));

  return {
    createNewPlayerData,
    updatePlayerData,
    retrievePlayerData,
  };
})();

module.exports = localData;
