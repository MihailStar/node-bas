import mod from './mod';

describe(mod, () => {
  test('mod(78, 78); // -> 0', () => {
    expect(mod(78, 78)).toBe(0);
  });

  test('mod(78, 33); // -> 12', () => {
    expect(mod(78, 33)).toBe(12);
  });

  test('mod(-78, 33); // -> 21', () => {
    expect(mod(-78, 33)).toBe(21);
  });

  test('mod(33, 33); // -> 0', () => {
    expect(mod(33, 33)).toBe(0);
  });

  test('mod(33, 78); // -> 33', () => {
    expect(mod(33, 78)).toBe(33);
  });

  test('mod(-33, 78); // -> 45', () => {
    expect(mod(-33, 78)).toBe(45);
  });
});
