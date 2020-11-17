import create from './create';

const localData = (() => {
  const createNewPlayerData = (key) => {
    playerData = create.newPlayer(key);
    localStorage.setItem(key, JSON.stringify(playerData));
    return ({ key: playerData });
  };

  const updatePlayerData = (key, value) => {
    new Promise((resolve, reject) => {
      if (localStorage.getItem(key)) {
        resolve(key, value);
      } else {
        reject('No value match input on localStorage');
      }
    }).then((key, value) => {
      localStorage.removeItem(key).setItem(key, JSON.stringify(value));
      return ({ key: value });
    }).catch((err) => {
      throw new Error(err);
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
