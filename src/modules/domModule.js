import AudioFile from '../assets/sound/Menu/increase.mp3';
import localData from '../storage/localData';
import apiData from '../storage/apiData';

const domModule = (() => {
  const CreateDOM = (scene) => {
    const render = {
      style: {
        background: {
          width: '50%',
          'background-color': 'rgba(16, 16, 200, 0.5)',
          border: 'solid rgb(56, 0, 56)',
          padding: '5px',
          'text-align': 'center',
          color: 'whitesmoke',
        },
        button: {
          'background-color': 'rgb(120, 0, 120)',
          border: 'solid pink 2px',
        },
      },

      element(elementId, parent = null, type = 'div', elementClass) {
        const div = document.createElement(type);
        if (elementId) {
          div.id = elementId;
        }
        if (Array.isArray(elementClass)) {
          elementClass.forEach((item) => {
            div.classList.add(item);
          });
        } else {
          div.classList.add(elementClass);
        }
        if (parent) {
          document.getElementById(parent).appendChild(div);
        }
        return div;
      },
      // Render the first element of the page, on the top of the phaser
      container(x, y, name) {
        const el = document.createElement('div');
        el.classList.add('flex-grid');
        el.id = name;
        scene.add.dom(x, y, el, this.style.background);
      },

      menu() {
        this.element('menu-container', 'game-menu', 'div', ['col-12', 'box']);
        this.element('row-one', 'menu-container', 'div', ['col-12', 'minibox', 'between']);
        const newGameBtn = this.element('new-game-button', 'row-one', 'button', 'col-5');
        newGameBtn.textContent = 'New Game';
        const loadGameBtn = this.element('load-game-button', 'row-one', 'button', 'col-5');
        loadGameBtn.textContent = 'Load Game';
        this.element('row-two', 'menu-container', 'div', ['col-12', 'minibox']);
        const instructionsBtn = this.element('instructions-button', 'row-two', 'button', 'col-6');
        instructionsBtn.textContent = 'Instructions';
        const creditsBtn = this.element('instructions-button', 'row-two', 'button', 'col-6');
        creditsBtn.textContent = 'Credits';
        return {
          newGameBtn,
          loadGameBtn,
          instructionsBtn,
          creditsBtn,
        };
      },

      loadGameMenu() {
        const listeners = [];
        this.element('load-container', 'load-game', 'div', ['col-12', 'box']);
        this.element('info-container', 'load-container', 'div', ['minibox', 'around']);
        this.element('char-name-text', 'info-container', 'div').textContent = 'Name';
        this.element('char-level-text', 'info-container', 'div').textContent = 'Level';
        localData.retrieveDatabase((index, character) => {
          const box = this.element(`character-container-${index}`, 'load-container', 'div', ['minibox', 'char-container']);
          this.element(`character-name-${index}`, `character-container-${index}`, 'div').textContent = character.name;
          this.element(`character-level-${index}`, `character-container-${index}`, 'div').textContent = character.level;
          listeners.push([box, character.name]);
        });
        return listeners;
      },

      scoreBoardMenu() {
        const scoreNames = [];
        const scorePoints = [];
        this.element('board-container', 'score-board');// game-menu
        this.element('board-header-container', 'board-container', 'div', 'box');
        this.element('board-header', 'board-header-container', 'h2').textContent = 'Score Board';
        this.element('scores-container', 'board-container', 'div', 'box');
        apiData.getData().then((data) => {
          const sortable = [];
          const results = data.result;
          results.forEach((item) => { sortable.push([item.user, item.score]); });
          const sorted = sortable.sort((a, b) => b[1] - a[1]);

          sorted.splice(0, 10).forEach((item, index) => {
            const [user, score] = item;
            this.element(`scores-${index}`, 'scores-container', 'div', ['minibox', 'around']);
            scoreNames.push(this.element(`scores-name-${index}`, `scores-${index}`, 'div'));
            scorePoints.push(this.element(`scores-points-${index}`, `scores-${index}`, 'div'));
            scoreNames[index].textContent = user;
            scorePoints[index].textContent = score;
          });
        });

        this.element('btns-container', 'board-container', 'div', ['box']);
        this.element('btns-c', 'btns-container', 'div', ['minibox', 'around']);
        const resetBtn = this.element('btns-reset-game', 'btns-c', 'button');
        const menuBtn = this.element('btns-menu-game', 'btns-c', 'button');
        resetBtn.textContent = 'Reset';
        menuBtn.textContent = 'Menu';
        return {
          resetBtn,
          menuBtn,
        };
      },

      menuText(txt, returnBtn) {
        this.element('instructions-container', 'game-menu');
        this.element('txt', 'instructions-container', 'p').innerHTML = txt;
        const btn = this.element('return-btn', 'instructions-container', 'button');
        btn.textContent = 'Return';
        btn.style.backgroundColor = 'rgb(120, 0, 120)';
        btn.style.color = 'whitesmoke';
        btn.style.border = 'solid pink 2px';
        returnBtn(btn);
      },

      errorMsg(parentId, msg) {
        const checker = document.getElementById(parentId).firstChild;
        if (checker) { checker.remove(); }
        this.element('error-msg', parentId, 'p', 'error-message').textContent = msg;
      },

      createCharacterTab() {
        const createStatsContainer = (label) => {
          this.element(`${label}-container`, 'stats-container', 'div', ['minibox', 'col-12', 'between']);
          this.element(`${label}-label`, `${label}-container`, 'div', 'noClass')
            .textContent = label;
          const counterNumber = this.element(`${label}-counter`, `${label}-container`, 'div', 'noClass');
          counterNumber.textContent = '1';
          this.element(`${label}-btns-container`, `${label}-container`, 'div', 'noClass');
          const minusBtn = this.element(`${label}--`, `${label}-btns-container`, 'button', 'noClass');
          minusBtn.textContent = '-';
          const plusBtn = this.element(`${label}++`, `${label}-btns-container`, 'button', 'noClass');
          plusBtn.textContent = '+';

          return {
            counterNumber,
            minusBtn,
            plusBtn,
          };
        };

        this.element('create-tab', 'game-menu', 'div', ['col-12']);
        this.element('name-container', 'create-tab', 'div', ['minibox', 'col-12']);
        const label = this.element('name-label', 'name-container', 'label', 'noClass');
        label.textContent = 'Character Name: ';
        const nameInput = this.element('name-input', 'name-container', 'input', 'noClass');
        nameInput.placeholder = 'Somethin Here';

        this.element('stats-container', 'create-tab', 'div', ['box', 'col-12']);
        const force = createStatsContainer('Force');
        const inteligence = createStatsContainer('Inteligence');
        const dex = createStatsContainer('Dex');
        this.element('free-points-container', 'stats-container', 'div', ['minibox']);
        this.element('free-points-text', 'free-points-container', 'div').textContent = 'Free Points: ';
        const freePnts = this.element('free-points-number', 'free-points-container', 'div');
        freePnts.textContent = 2;

        const errorWarnings = this.element('error-container', 'create-tab', 'div', ['box', 'col-12']);

        this.element('submit-container', 'create-tab', 'div', ['box', 'col-12']);
        const submitBtn = this.element('submit-btn', 'submit-container', 'button');
        submitBtn.textContent = 'Create Character';

        return {
          submitBtn,
          errorWarnings,
          freePnts,
          nameInput,
          force,
          inteligence,
          dex,
        };
      },
    };

    const addControllerOn = {

      menu(btns) {
        const updateMenu = () => {
          scene.sound.play('select');
          document.getElementById('game-menu').firstChild.remove();
        };
        /* eslint-disable */
        for (const [, value] of Object.entries(btns)) {
          value.onmouseover = () => { scene.sound.play('buzz'); };
        }
        /* eslint-enable */

        btns.newGameBtn.addEventListener('click', () => {
          updateMenu();
          scene.scene.start('create-character');
        });

        btns.loadGameBtn.addEventListener('click', () => {
          scene.scene.start('load-game-menu');
        });

        btns.instructionsBtn.addEventListener('click', () => {
          const url = 'https://github.com/HeflerDev/Microverse-Project-Phaser-Game/tree/feature/main#how-to-play';
          window.open(url, '_blank');
        });

        btns.creditsBtn.addEventListener('click', () => {
          updateMenu();
          scene.dom.render.menuText('Created By HeflerDev', (btn) => {
            btn.addEventListener('click', () => {
              updateMenu();
              const newbtns = scene.dom.render.menu();
              this.menu(newbtns);
            });
          });
        });
      },

      scoreBoardMenu(btns) {
        btns.resetBtn.addEventListener('click', () => {
          const playerData = scene.player.data;

          playerData.situation.currentHp = 10;
          playerData.situation.moves = playerData.stats.dex;
          playerData.situation.isAlive = true;
          scene.score = 0;
          if (scene.enemies.length > 0) {
            scene.enemies.forEach((foe) => {
              foe.body.destroy();
            });
          }
          scene.scene.restart();
        });
        btns.menuBtn.addEventListener('click', () => {
          const playerData = scene.player.data;

          playerData.situation.currentHp = 10;
          playerData.situation.moves = playerData.stats.dex;
          playerData.situation.isAlive = true;
          scene.score = 0;
          if (scene.enemies.length > 0) {
            scene.enemies.forEach((foe) => {
              foe.body.destroy();
            });
          }
          scene.scene.restart();
          scene.scene.start('menu-scene');
        });
      },

      loadGameMenu(btns) {
        btns.forEach((item) => {
          const [listener, charName] = item;
          listener.addEventListener('click', () => {
            const player = localData.retrievePlayerData(charName);
            scene.scene.start('cave-stage', player);
          });
        });
      },

      createCharacterTab(elements, playerObj, onSubmit) {
        const audio = new Audio(AudioFile);

        elements.force.plusBtn.addEventListener('click', () => {
          scene.player.logic.addFor();
          elements.force.counterNumber.textContent = scene.player.data.stats.for;
          elements.freePnts.textContent = scene.player.data.stats.free;
          audio.currentTime = 0;
          audio.play();
        });
        elements.force.minusBtn.addEventListener('click', () => {
          scene.player.logic.rmFor();
          elements.force.counterNumber.textContent = scene.player.data.stats.for;
          elements.freePnts.textContent = scene.player.data.stats.free;
          audio.currentTime = 0;
          audio.play();
        });

        elements.inteligence.plusBtn.addEventListener('click', () => {
          scene.player.logic.addInt();
          elements.inteligence.counterNumber.textContent = playerObj.stats.int;
          elements.freePnts.textContent = playerObj.stats.free;
          audio.currentTime = 0;
          audio.play();
        });
        elements.inteligence.minusBtn.addEventListener('click', () => {
          scene.player.logic.rmInt();
          elements.inteligence.counterNumber.textContent = playerObj.stats.int;
          elements.freePnts.textContent = playerObj.stats.free;
          audio.currentTime = 0;
          audio.play();
        });

        elements.dex.plusBtn.addEventListener('click', () => {
          scene.player.logic.addDex();
          elements.dex.counterNumber.textContent = playerObj.stats.dex;
          elements.freePnts.textContent = playerObj.stats.free;
          audio.currentTime = 0;
          audio.play();
        });

        elements.dex.minusBtn.addEventListener('click', () => {
          scene.player.logic.rmDex();
          elements.dex.counterNumber.textContent = playerObj.stats.dex;
          elements.freePnts.textContent = playerObj.stats.free;
          audio.currentTime = 0;
          audio.play();
        });

        elements.submitBtn.addEventListener('click', () => {
          scene.player.data.name = elements.nameInput.value;
          onSubmit(scene.player.data);
        });
      },

    };
    return { render, addControllerOn };
  };
  return { CreateDOM };
})();

export default domModule;
