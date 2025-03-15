import { STRESS, ZaliznyakIndex, type ZaliznyakFeatures } from '.';

const SEP = /[\s,]*/.source;
const RE_GENDER = /([мсжmnf])/.source;
const RE_ANIMACY = /(о|[ina]+)?/.source;
const RE_TYPE = /(\d+)/.source;
const RE_MOBILE_VOWEL = /(\*)?/.source;
const RE_ALTERATIONS = /(°)?/.source;
const RE_STRESS = /([a-f]['"]?)/.source;
const RE_DEVIATION = /([①②③(123)]+)?/.source;
const RE_IO_ALTERATION = /(ё)?/.source;

const INDEX_RE = new RegExp(
  '^' +
    RE_GENDER +
    SEP +
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
    case 'm':
      gender = 'm';
      break;
    case 'с':
    case 'n':
      gender = 'n';
      break;
    case 'ж':
    case 'f':
      gender = 'f';
      break;
    default:
      return null;
  }

  let animacy: ZaliznyakFeatures['animacy'];

  if (_animacy && ['о', 'a'].includes(_animacy)) {
    animacy = 'a';
  } else if (!_animacy || _animacy === 'ina') {
    animacy = 'ina';
  } else {
    return null;
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

  const index = new ZaliznyakIndex({
    features: { gender, animacy },
    type,
    stress,
  });

  if (mobileVowel) {
    index.mobileVowel = true;
  }

  if (alternations) {
    index.alternations = true;
  }

  if (deviation) {
    switch (deviation) {
      case '①':
      case '(1)':
        index.deviation = '1';
        break;
      case '②':
      case '(2)':
        index.deviation = '2';
        break;
      case '①②':
      case '(1)(2)':
        index.deviation = '12';
        break;
      case '③':
      case '(3)':
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
