import type { Slovo } from '../slovo';
import flexions from './flexions';

export const CASE = ['nom', 'gen', 'dat', 'acc', 'ins', 'prp'] as const;
export const NUMBER = ['sg', 'pl'] as const;

/**
 * Репрезентация словоизменения имени
 */
export interface Inflection {
  /**
   * Падеж
   *
   * - `nom` - именительный падеж (кто? что?)
   * - `gen` - родительный падеж (кого? чего?)
   * - `dat` - дательный падеж (кому? чему?)
   * - `acc` - винительный падеж (кого? что?)
   * - `ins` - творительный падеж (кем? чем?)
   * - `prp` - предложный падеж (о ком? о чём? в ком? в чём?)
   */
  case: (typeof CASE)[number];

  /**
   * Число
   *
   * - `sg` - единственное число
   * - `pl` - множественное число
   */
  number: (typeof NUMBER)[number];
}

/**
 * Выполнить склонение слова по падежу и числу
 */
export default function (word: Slovo, inflection: Inflection): string {
  const { stem, index } = word;
  const flexion = flexions[index.type](index, inflection);
  return stem + flexion;
}
