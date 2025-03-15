import type { GenderFlexion, Flexion } from '.';

const singular: GenderFlexion = (animacy, inflectionCase) => {
  switch (inflectionCase) {
    case 'nom':
      return { m: 'ь', n: 'е', f: 'я' };
    case 'gen':
      return { m: 'я', n: 'я', f: 'и' };
    case 'dat':
      return { m: 'ю', n: 'ю', f: 'е' };
    case 'acc':
      switch (animacy) {
        case 'ina':
          return {
            m: singular(animacy, 'nom').m,
            n: singular(animacy, 'nom').n,
            f: 'ю',
          };
        case 'a':
          return {
            m: singular(animacy, 'gen').m,
            n: singular(animacy, 'nom').n,
            f: 'ю',
          };
      }
    case 'ins':
      return { m: 'ем', n: 'ем', f: 'ей' };
    case 'prp':
      return { m: 'е', n: 'е', f: 'е' };
  }
};

const plural: GenderFlexion = (animacy, inflectionCase) => {
  switch (inflectionCase) {
    case 'nom':
      return { m: 'и', n: 'я', f: 'и' };
    case 'gen':
      return { m: 'ей', n: 'ь', f: 'ь' };
    case 'dat':
      return { m: 'ям', n: 'ям', f: 'ям' };
    case 'acc':
      switch (animacy) {
        case 'ina':
          return plural(animacy, 'nom');
        case 'a':
          return plural(animacy, 'gen');
      }
    case 'ins':
      return { m: 'ями', n: 'ями', f: 'ями' };
    case 'prp':
      return { m: 'ях', n: 'ях', f: 'ях' };
  }
};

const flexion: Flexion = (index, inflection) => {
  const { gender, animacy } = index.features;
  switch (inflection.number) {
    case 'sg':
      return singular(animacy, inflection.case)[gender];
    case 'pl':
      return plural(animacy, inflection.case)[gender];
  }
};

export default flexion;
