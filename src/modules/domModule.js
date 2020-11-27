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

      element(elementId, parent = null, type = 'div') {
        const div = document.createElement(type);
        if (elementId) {
          div.id = elementId;
        }
        if (parent) {
          document.getElementById(parent).appendChild(div);
        }
        return div;
      },

      container(x, y, name) {
        const el = document.createElement('div');
        el.id = name;
        scene.add.dom(x, y, el, this.style.background);
      },

      menu() {
        const form = this.element('form', 'menu-form');
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        document.getElementById('menu-form').appendChild(form);
        const newGame = this.element('new-game-button', 'form', 'button');
        newGame.textContent = 'New Game';
        newGame.style.backgroundColor = 'rgb(120, 0, 120)';
        newGame.style.color = 'whitesmoke';
        newGame.style.border = 'solid pink 2px';
        const instructions = this.element('instructions-button', 'form', 'button');
        instructions.textContent = 'Instructions';
        instructions.style.backgroundColor = 'rgb(120, 0, 120)';
        instructions.style.color = 'whitesmoke';
        instructions.style.border = 'solid pink 2px';
        return {
          newGame,
          instructions,
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
