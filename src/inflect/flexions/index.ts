import type { Inflection } from '..';
import type { ZaliznyakIndex, SubstantiveDeclension } from '../../zaliznyak';
import substantive1 from './substantive1';
import substantive2 from './substantive2';

export type Flexion = (index: ZaliznyakIndex, inflection: Inflection) => string;

export type GenderFlexion = (
  animacy: SubstantiveDeclension['animacy'],
  inflectionCase: Inflection['case'],
) => Record<SubstantiveDeclension['gender'], string>;

/**
 * Функции для получения окончания по типу склонения
 */
const flexions: Record<ZaliznyakIndex['type'], Flexion> = {
  0: () => '',
  1: substantive1,
  2: substantive2,
  3: (index, inflection) => substantive1(index, inflection).replace('ы', 'и'),
  4: (index, inflection) => {
    if (inflection.case === 'gen' && inflection.number === 'pl') {
      switch (index.paradigm.gender) {
        case 'm':
          return 'ей';
        case 'n':
        case 'f':
          return '';
      }
    }
    return substantive1(index, inflection).replace('ы', 'и');
  },
  5: (index, inflection) => substantive1(index, inflection).replace('o', 'e'),
  6: (index, inflection) => {
    if (inflection.case === 'gen' && inflection.number === 'pl') {
      switch (index.paradigm.gender) {
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
    if (inflection.case === 'gen' && inflection.number === 'pl') {
      switch (index.paradigm.gender) {
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
        index.paradigm.gender === 'f') ||
      (inflection.case === 'prp' && inflection.number === 'sg')
    ) {
      return 'и';
    }
    return substantive2(index, inflection).replace('ь', 'й');
  },
  8: () => '',
};

export default flexions;
