import type { Inflection } from './inflect';
import inflect from './inflect';
import { VOWELS, type Letter } from './letters';
import { ZaliznyakIndex } from './zaliznyak';

/**
 * Основной класс для работы со словами
 */
export class Slovo {
  /**
   * Начальная форма слова - И. п. ед. ч. для существительных
   */
  lemma: string;

  /**
   * Индекс Зализняка данного слова
   */
  index: ZaliznyakIndex;

  /**
   * Графическая основа слова
   */
  stem: string;

  /**
   * Основной класс для работы со словами
   *
   * @param lemma Начальная форма слова - И. п. ед. ч. для существительных
   * @param index Индекс Зализняка данного слова
   */
  constructor(lemma: string, index: ZaliznyakIndex) {
    this.lemma = lemma;
    this.index = index;
    this.stem = Slovo.stem(lemma);
  }

  /**
   * Извлечь графическую основу слова из его начальной формы
   */
  static stem(lemma: string): string {
    const lemmaLower = lemma.toLowerCase();
    const lastLetter = lemmaLower.slice(-1) as Letter;

    if (
      VOWELS.includes(lastLetter) ||
      lastLetter === 'й' ||
      lastLetter === 'ь'
    ) {
      return lemmaLower.slice(0, -1);
    }

    return lemmaLower;
  }

  /**
   * Выполнить склонение слова по падежу и числу
   */
  inflect(inflection: Inflection) {
    return inflect(this, inflection);
  }
}

/**
 * @param lemma Начальная форма слова - И. п. ед. ч. для существительных
 * @param index Индекс Зализняка данного слова
 */
export function slovo(
  lemma: string,
  index: ZaliznyakIndex | string,
): Slovo | null {
  if (typeof index === 'string') {
    const indexObject = ZaliznyakIndex.fromString(index);
    if (!indexObject) {
      return null;
    }
    return new Slovo(lemma, indexObject);
  }

  return new Slovo(lemma, index);
}
