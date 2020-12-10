const localData = (() => {

  async function createNewPlayerData(obj) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(obj.name)) {
        reject(`${obj.name} is already assigned to the database`);
      } else if (obj.stats.free > 0) {
        reject('All points must be assigned');
      } else {
        resolve(obj);
      }
    }).then((obj) => { 
      localStorage.setItem(obj.name, JSON.stringify(obj))
      console.log('Data is Stored');
    });
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
