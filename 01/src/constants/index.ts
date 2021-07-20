const ALPHABET_LENGTH = 26;

const EXIT_CODE = {
  'Uncaught Fatal Exception': 1,
  'Invalid Argument': 9,
} as const;

const UNI_CODE = {
  'A': 65,
  'Z': 90,
  'a': 97,
  'z': 122,
} as const;

export { ALPHABET_LENGTH, EXIT_CODE, UNI_CODE as UNICODE };
