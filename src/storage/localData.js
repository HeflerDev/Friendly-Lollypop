import playerData from './playerData';

const localData = (() => {

    const createNewPlayerData = (key) => {
        const playerData = {
            'name': key,
            'points': {
                'level': 1,
                'xp': 0
            },
            'situation': {
                'currentHp': 10,
                'currentMp': 10,
                'currentEnergy': 100,
                'buffs': [],
                'debuffs': []
            },
            'stats': {
                'maxHp': 10,
                'maxMp': 10,
                'maxEnergy': 100,
                'for': 1,
                'int': 1,
                'dex': 1,
                'free': 0
            },
            'inventory': []
        };
        localStorage.setItem(key, JSON.stringify(playerData));
        return({ key: value });
    };

    const updatePlayerData = (key, value) => {
        new Promise((resolve, reject) => {
            if (localStorage.getItem(key)) {
                resolve(key, value);
            } else {
                reject('No value match input on localStorage');
            }
        }).then((key, value) => {
            localStorage.removeItem(key).seItem(key, JSON.stringify(value));
            return ( { key: value } );
        }).catch((err) => {
            throw new Error(err);
        })

    };

    const retrievePlayerData = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    return {
        createNewPlayerData,
        updatePlayerData,
        retrievePlayerData
    }
})();

module.exports = localData
