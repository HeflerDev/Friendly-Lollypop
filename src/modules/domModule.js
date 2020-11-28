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

      instructionsText(txt) {
        this.element('instructions-container', 'instructions');
        this.element('txt', 'instructions-container', 'p').innerHTML = txt;
        const btn = this.element('return-btn', 'instructions-container', 'button');
        btn.textContent = 'Return';
        btn.style.backgroundColor = 'rgb(120, 0, 120)';
        btn.style.color = 'whitesmoke';
        btn.style.border = 'solid pink 2px';

        return btn;
      },

    };
    return { render };
  };
  return { CreateDOM };
})();

export default domModule;
