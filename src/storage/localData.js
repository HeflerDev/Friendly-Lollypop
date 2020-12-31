import fs from 'fs';

const localData = (() => {
  /* eslint-disable */
  async function createNewPlayerData(obj) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(obj.name)) {
        reject(`'${obj.name}' is unavaiable`);
      } else if (obj.name === '') {
        reject('Name must not be empty');
      } else if (obj.stats.free > 0) {
        reject('All points must be assigned');
      } else {
        resolve(obj);
      }
    }).then((obj) => {
      localStorage.setItem(obj.name, JSON.stringify(obj));
    });
  }
  /* eslint-enable */
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

  const retrieveDatabase = (callback) => {
    Object.keys(localStorage).forEach((item, index) => {
      callback(index, JSON.parse(localStorage.getItem(item)));
    });
  };

  return {
    createNewPlayerData,
    updatePlayerData,
    retrievePlayerData,
    retrieveDatabase,
  };
})();

export default localData;
