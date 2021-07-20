import { encode, decode } from './сaesar-cipher';
import { ALPHABET_LENGTH } from './constants';

describe(encode, () => {
  test('encode("a", 3); // -> "d"', () => {
    expect(encode('a', 3)).toBe('d');
    expect(encode('a', 3 + ALPHABET_LENGTH * 3)).toBe('d');
  });

  test('encode("a", -3); // -> "x"', () => {
    expect(encode('a', -3)).toBe('x');
    expect(encode('a', -3 + ALPHABET_LENGTH * 3)).toBe('x');
  });

  test('encode("some text", 7);', () => {
    expect(encode('This is secret. Message about "_" symbol!', 7)).toBe(
      'Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!'
    );
    expect(
      encode(
        'This is secret. Message about "_" symbol!',
        7 + ALPHABET_LENGTH * 3
      )
    ).toBe('Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!');
  });

  test('encode("some text", -1);', () => {
    expect(encode('This is secret. Message about "_" symbol!', -1)).toBe(
      'Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!'
    );
    expect(
      encode(
        'This is secret. Message about "_" symbol!',
        -1 + ALPHABET_LENGTH * 3
      )
    ).toBe('Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!');
  });
});

describe(decode, () => {
  test('decode("x", -3); // -> "a"', () => {
    expect(decode('x', -3)).toBe('a');
    expect(decode('x', -3 + ALPHABET_LENGTH * 3)).toBe('a');
  });

  test('decode("d", 3); // -> "a"', () => {
    expect(decode('d', 3)).toBe('a');
    expect(decode('d', 3 + ALPHABET_LENGTH * 3)).toBe('a');
  });

  test('decode("some text", 7);', () => {
    expect(decode('Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!', 7)).toBe(
      'This is secret. Message about "_" symbol!'
    );
    expect(
      decode(
        'Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!',
        7 + ALPHABET_LENGTH * 3
      )
    ).toBe('This is secret. Message about "_" symbol!');
  });

  test('decode("some text", -1);', () => {
    expect(decode('Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!', -1)).toBe(
      'This is secret. Message about "_" symbol!'
    );
    expect(
      decode(
        'Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!',
        -1 + ALPHABET_LENGTH * 3
      )
    ).toBe('This is secret. Message about "_" symbol!');
  });
});
