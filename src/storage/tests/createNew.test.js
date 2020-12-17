const createNew = require('../createNew');

test('test', () => {
  expect(typeof (createNew.Player())).toBe('object');

  expect(typeof (createNew.SmallAnimal('Sample'))).toBe('object')
});
