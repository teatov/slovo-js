import { STRESS, type ZaliznyakFeatures, type ZaliznyakIndex } from '.';

const SEP = /[\s,]*/.source;
const RE_GENDER = /(м|ж|с)/.source;
const RE_ANIMACY = /(о)?/.source;
const RE_TYPE = /(\d+)/.source;
const RE_MOBILE_VOWEL = /(\*)?/.source;
const RE_ALTERATIONS = /(°)?/.source;
const RE_STRESS = /([a-f]['"]?)/.source;
const RE_DEVIATION = /([①|②|③]+)?/.source;
const RE_IO_ALTERATION = /(ё)?/.source;

const INDEX_RE = new RegExp(
  '^' +
    RE_GENDER +
    RE_ANIMACY +
    SEP +
    RE_TYPE +
    RE_MOBILE_VOWEL +
    RE_ALTERATIONS +
    RE_STRESS +
    RE_DEVIATION +
    SEP +
    RE_IO_ALTERATION +
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

  let gender: ZaliznyakFeatures['gender'];

  switch (_gender) {
    case 'м':
      gender = 'm';
      break;
    case 'с':
      gender = 'n';
      break;
    case 'ж':
      gender = 'f';
      break;
    default:
      return null;
  }

  let animacy: ZaliznyakFeatures['animacy'];

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

  if (STRESS.includes(_stress as any)) {
    stress = _stress as ZaliznyakIndex['stress'];
  } else {
    return null;
  }

  const index: ZaliznyakIndex = {
    features: { gender, animacy },
    type,
    stress,
  };

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
