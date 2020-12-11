import AudioFile from '../assets/sound/Menu/increase.mp3';
import localData from '../storage/localData';

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
      // Helper to render an HTML element
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
        this.element('load-container', 'load-game', 'div', ['col-12', 'box']);
        localStorage.retrieveDatabase((character) => {
          this.element('character-container', 'load-container', 'div', 'minibox');
            this.element('character-name', 'character-container', 'div').textContent = character.name;
            this.element('character-level', 'character-container', 'div').textContent = character.level;
        });
        return { generateCharacterContainer };
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
        if (checker) { checker.remove() };
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
            plusBtn
          }
        }

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
          dex
        }

      },
    };

    const addControllerOn = {

      menu(btns) {
        const updateMenu = () => {
          scene.sound.play('select');
          document.getElementById('game-menu').firstChild.remove();
        }

        for (const [key, value] of Object.entries(btns)) {
          value.onmouseover = () => { scene.sound.play('buzz')};
        }

        btns.newGameBtn.addEventListener('click', () => {
          updateMenu();
          scene.scene.start('create-character');
        });

        btns.loadGameBtn.addEventListener('click', () => {
          scene.scene.start('load-game-menu');
        });

        btns.instructionsBtn.addEventListener('click', () => {
          updateMenu();
          scene.dom.render.menuText('Instructions Goes here', (btn) => {
            btn.addEventListener('click', () => {
              updateMenu();
              const newbtns = scene.dom.render.menu();
              this.menu(newbtns)
            });
          });
        });

        btns.creditsBtn.addEventListener('click', ()=> {
          updateMenu();
          scene.dom.render.menuText('Created By HeflerDev', (btn) => {
            btn.addEventListener('click', () => {
              updateMenu();
              const newbtns = scene.dom.render.menu();
              this.menu(newbtns)
            });
          });
        });
      },

      loadGameMenu() {
        
      },

      createCharacterTab(elements, playerObj, onSubmit) {

        let audio = new Audio(AudioFile);
        
        elements.force.plusBtn.addEventListener('click', () => { 
          playerObj.addFor();
          elements.force.counterNumber.textContent = playerObj.stats.for;
          elements.freePnts.textContent = playerObj.stats.free;
        audio.currentTime = 0;
          audio.play();
        });
        elements.force.minusBtn.addEventListener('click', () => { 
          playerObj.rmFor() 
          elements.force.counterNumber.textContent = playerObj.stats.for;
          elements.freePnts.textContent = playerObj.stats.free;
        audio.currentTime = 0;
          audio.play();
        });

        elements.inteligence.plusBtn.addEventListener('click', () => { 
          playerObj.addInt() 
          elements.inteligence.counterNumber.textContent = playerObj.stats.int;
          elements.freePnts.textContent = playerObj.stats.free;
        audio.currentTime = 0;
          audio.play();
        });
        elements.inteligence.minusBtn.addEventListener('click', () => { 
          playerObj.rmInt() 
          elements.inteligence.counterNumber.textContent = playerObj.stats.int;
          elements.freePnts.textContent = playerObj.stats.free;
        audio.currentTime = 0;
          audio.play();
        });
        
        elements.dex.plusBtn.addEventListener('click', () => { 
          playerObj.addDex() 
          elements.dex.counterNumber.textContent = playerObj.stats.dex;
          elements.freePnts.textContent = playerObj.stats.free;
        audio.currentTime = 0;
          audio.play();
        } );
        elements.dex.minusBtn.addEventListener('click', () => { 
          playerObj.rmDex() 
          elements.dex.counterNumber.textContent = playerObj.stats.dex;
          elements.freePnts.textContent = playerObj.stats.free;
        audio.currentTime = 0;
          audio.play();
        });

        elements.submitBtn.addEventListener('click', () => {
          playerObj.name = elements.nameInput.value; 
          onSubmit(playerObj);
        });
      }

    }
    return { render, addControllerOn };
  };
  return { CreateDOM };
})();

export default domModule;
