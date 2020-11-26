const domModule = (() => {

  const CreateDOM = (scene) => {
    const render = {
      'style': {
        'background': {
          'width': '50%',
          'height': '100%',
          'background-color': 'rgba(16, 16, 200, 0.5)',
        },
      },

      element(elementId, parent = null, type = 'div') {
        const div = document.createElement(element);
        if (elementId) {
          div.id = elementId;
        }
        if (parent) {
          document.getElementById(parent).appendChild(div);
        }
        return div;
      },

      container(x, y, name) {
        let el = document.createElement('div');
        el.id = name;
        scene.add.dom(x, y, el, this.style);
      },

      menu(parent) {
        const form = this.element('form', 'form-div');
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        const newGame = this.element('new-game-button', 'form', 'button')
        newGame.textContent = 'New Game';
        const instructions = this.element('instructions-button', 'form', 'button')
        instructions.textContent = 'Instructions';
        return {
          newGame,
          instructions
        }
      }

    }
  }

})();
