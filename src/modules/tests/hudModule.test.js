import hudModule from '../hudModule';
import createNew from '../../storage/createNew';

describe('When dealing with the HUD', () => {
  const playerData = createNew.Player();
  const hud = hudModule.Hud(playerData, { score: 10 });

  test('it display the info correctly', () => {
    expect(hud.elements.gatherData().movesLeftText).toBe('Moves Left: 1');
    expect(hud.elements.gatherData().playerHpText).toBe('HP:10');
    expect(hud.elements.gatherData().movesMadeText).toBe('Score:10');
  });
});
