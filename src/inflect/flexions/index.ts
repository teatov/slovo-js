import type { Inflection } from '..';
import type { ZaliznyakIndex, ZaliznyakFeatures } from '../../zaliznyak';
import substantive1 from './substantive1';
import substantive2 from './substantive2';

export type Flexion = (index: ZaliznyakIndex, inflection: Inflection) => string;

export type GenderFlexion = (
  animacy: ZaliznyakFeatures['animacy'],
  inflectionCase: Inflection['case'],
) => Record<ZaliznyakFeatures['gender'], string>;

/**
 * Функции для получения окончания по типу склонения
 */
const flexions: Record<ZaliznyakIndex['type'], Flexion> = {
  0: () => '',

  1: substantive1,

  2: substantive2,

  3: (index, inflection) => substantive1(index, inflection).replace('ы', 'и'),

  4: (index, inflection) => {
    if (
      (inflection.case === 'gen' ||
        (index.features.animacy === 'a' && inflection.case === 'acc')) &&
      inflection.number === 'pl'
    ) {
      switch (index.features.gender) {
        case 'm':
          return 'ей';
        case 'n':
        case 'f':
          return '';
      }
    }
    return substantive1(index, inflection).replace('ы', 'и').replace('о', 'е');
  },

  5: (index, inflection) => substantive1(index, inflection).replace('о', 'е'),

  6: (index, inflection) => {
    if (
      (inflection.case === 'gen' ||
        (index.features.animacy === 'a' && inflection.case === 'acc')) &&
      inflection.number === 'pl'
    ) {
      switch (index.features.gender) {
        case 'm':
          return 'ев';
        case 'n':
        case 'f':
          return 'й';
      }
    }
    return substantive2(index, inflection).replace('ь', 'й');
  },

  7: (index, inflection) => {
    if (
      (inflection.case === 'gen' ||
        (index.features.animacy === 'a' && inflection.case === 'acc')) &&
      inflection.number === 'pl'
    ) {
      switch (index.features.gender) {
        case 'm':
          return 'ев';
        case 'n':
        case 'f':
          return 'й';
      }
    }
    if (
      (inflection.case === 'dat' &&
        inflection.number === 'sg' &&
        index.features.gender === 'f') ||
      (inflection.case === 'prp' && inflection.number === 'sg')
    ) {
      return 'и';
    }
    return substantive2(index, inflection).replace('ь', 'й');
  },

  8: (index, inflection) => {
    switch (inflection.number) {
      case 'sg':
        switch (inflection.case) {
          case 'nom':
          case 'acc':
            return 'ь';
          case 'gen':
          case 'dat':
          case 'prp':
            return 'и';
          case 'ins':
            switch (index.features.gender) {
              case 'f':
                return 'ью';
              case 'm':
              case 'n':
                return 'ем';
            }
        }
      case 'pl':
        if (
          inflection.case === 'gen' ||
          (index.features.animacy === 'a' && inflection.case === 'acc')
        ) {
          return 'ей';
        } else {
          return substantive2(index, inflection);
        }
    }
  },
};

export default flexions;
