import { STRESS_VALUES, type ZaliznyakIndex } from '.';

const SEP = /[\s,]*/.source;
const GENDER = /(м|ж|с)/.source;
const ANIMACY = /(о)?/.source;
const TYPE = /(\d+)/.source;
const MOBILE_VOWEL = /(\*)?/.source;
const ALTERATIONS = /(°)?/.source;
const STRESS = /([a-f]['"]?)/.source;
const DEVIATION = /([①|②|③]+)?/.source;
const IO_ALTERATION = /(ё)?/.source;

const INDEX_RE = new RegExp(
  '^' +
    GENDER +
    ANIMACY +
    SEP +
    TYPE +
    MOBILE_VOWEL +
    ALTERATIONS +
    STRESS +
    DEVIATION +
    SEP +
    IO_ALTERATION +
    '$',
);

export default function (indexString: string): ZaliznyakIndex | null {
  const execArray = INDEX_RE.exec(indexString);

  if (!execArray) {
    return null;
  }

  const [
    _,
    _gender,
    _animacy,
    _type,
    mobileVowel,
    alternations,
    _stress,
    deviation,
    ioAlteration,
  ] = execArray;

  if (!_gender || !_type || !_stress) {
    return null;
  }

  let gender: ZaliznyakIndex['gender'];

  switch (_gender) {
    case 'м':
      gender = 'm';
      break;
    case 'ж':
      gender = 'f';
      break;
    case 'с':
      gender = 'n';
      break;
    default:
      return null;
  }

  let animacy: ZaliznyakIndex['animacy'];

  if (_animacy) {
    animacy = 'a';
  } else {
    animacy = 'ina';
  }

  let type: ZaliznyakIndex['type'];
  const typeNumber = Number(_type);

  if (typeNumber >= 0 && typeNumber <= 8) {
    type = typeNumber as ZaliznyakIndex['type'];
  } else {
    return null;
  }

  let stress: ZaliznyakIndex['stress'];

  if (STRESS_VALUES.includes(_stress as any)) {
    stress = _stress as ZaliznyakIndex['stress'];
  } else {
    return null;
  }

  const index: ZaliznyakIndex = { gender, animacy, type, stress };

  if (mobileVowel) {
    index.mobileVowel = true;
  }

  if (alternations) {
    index.alternations = true;
  }

  if (deviation) {
    switch (deviation) {
      case '①':
        index.deviation = '1';
        break;
      case '②':
        index.deviation = '2';
        break;
      case '①②':
        index.deviation = '12';
        break;
      case '③':
        index.deviation = '3';
        break;
      default:
        return null;
    }
  }

  if (ioAlteration) {
    index.ioAlternation = true;
  }

  return index;
}
