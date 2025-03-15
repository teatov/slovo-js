import type { Slovo } from '../slovo';
import flexions from './flexions';

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
  case: 'nom' | 'gen' | 'dat' | 'acc' | 'ins' | 'prp';

  /**
   * Число
   *
   * - `sg` - единственное число
   * - `pl` - множественное число
   */
  number: 'sg' | 'pl';
}

/**
 * Выполнить словоизменение имени
 */
export default function (word: Slovo, inflection: Inflection): string {
  const { stem } = word;
  const flexion = flexions[word.index.type](word.index, inflection);
  return stem + flexion;
}
