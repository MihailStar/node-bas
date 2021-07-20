import { UNICODE, ALPHABET_LENGTH } from './constants';
import mod from './utilities/mod';

type Action = 'encode' | 'decode';

/**
 * Кодирует / декодирует шифром Цезаря
 * @example
 * сaesarCipher('a', 3, 'encode'); // -> 'd'
 * сaesarCipher('a', -3, 'encode'); // -> 'x'
 * сaesarCipher('d', 3, 'decode'); // -> 'a'
 * сaesarCipher('x', -3, 'decode'); // -> 'a'
 */
function сaesarCipher(
  text: string,
  shift: number,
  action: Action = 'encode'
): string {
  let result = '';

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const charCode = text.charCodeAt(index);
    let charCase: null | 'lower' | 'upper' = null;
    let charCodeWithShift = charCode;

    if (charCode >= UNICODE.A && charCode <= UNICODE.Z) {
      charCase = 'upper';
    }

    if (charCode >= UNICODE.a && charCode <= UNICODE.z) {
      charCase = 'lower';
    }

    if (charCase === null) {
      result += char;
      continue;
    }

    charCodeWithShift -= charCase === 'upper' ? UNICODE.A : UNICODE.a;
    charCodeWithShift = mod(
      action === 'decode'
        ? charCodeWithShift - shift
        : charCodeWithShift + shift,
      ALPHABET_LENGTH
    );
    charCodeWithShift += charCase === 'upper' ? UNICODE.A : UNICODE.a;

    result += String.fromCharCode(charCodeWithShift);
  }

  return result;
}

/**
 * Кодирует шифром Цезаря
 * @example
 * encode('a', 3); // -> 'd'
 * encode('a', -3); // -> 'x'
 */
function encode(text: string, shift: number): string {
  return сaesarCipher(text, shift, 'encode');
}

/**
 * Декодирует шифром Цезаря
 * @example
 * decode('d', 3); // -> 'a'
 * decode('x', -3); // -> 'a'
 */
function decode(text: string, shift: number): string {
  return сaesarCipher(text, shift, 'decode');
}

export { encode, decode, Action };
export default сaesarCipher;
