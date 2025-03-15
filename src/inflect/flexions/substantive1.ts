import type { GenderFlexion, Flexion } from '.';

const singular: GenderFlexion = (animacy, inflectionCase) => {
  switch (inflectionCase) {
    case 'nom':
      return { m: '', n: 'о', f: 'а' };
    case 'gen':
      return { m: 'а', n: 'а', f: 'ы' };
    case 'dat':
      return { m: 'у', n: 'у', f: 'е' };
    case 'acc':
      switch (animacy) {
        case 'ina':
          return {
            m: singular(animacy, 'nom').m,
            n: singular(animacy, 'nom').n,
            f: 'у',
          };
        case 'a':
          return {
            m: singular(animacy, 'gen').m,
            n: singular(animacy, 'nom').n,
            f: 'у',
          };
      }
    case 'ins':
      return { m: 'ом', n: 'ом', f: 'ой' };
    case 'prp':
      return { m: 'е', n: 'е', f: 'е' };
  }
};

const plural: GenderFlexion = (animacy, inflectionCase) => {
  switch (inflectionCase) {
    case 'nom':
      return { m: 'ы', n: 'а', f: 'ы' };
    case 'gen':
      return { m: 'ов', n: '', f: '' };
    case 'dat':
      return { m: 'ам', n: 'ам', f: 'ам' };
    case 'acc':
      switch (animacy) {
        case 'ina':
          return plural(animacy, 'nom');
        case 'a':
          return plural(animacy, 'gen');
      }
    case 'ins':
      return { m: 'ами', n: 'ами', f: 'ами' };
    case 'prp':
      return { m: 'ах', n: 'ах', f: 'ах' };
  }
};

const flexion: Flexion = (index, inflection) => {
  const { gender, animacy } = index.paradigm;
  switch (inflection.number) {
    case 'sg':
      return singular(animacy, inflection.case)[gender];
    case 'pl':
      return plural(animacy, inflection.case)[gender];
  }
};

export default flexion;
