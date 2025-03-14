import { vowels, type Letter } from './letters';
import type { ZaliznyakIndex } from './zaliznyak';

/**
 * Основной класс для работы со словами
 */
export class Slovo {
  /**
   * Словарная форма слова - И. п. ед. ч. для существительных
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
   * @param lemma Словарная форма слова - И. п. ед. ч. для существительных
   * @param index Индекс Зализняка данного слова
   */
  constructor(lemma: string, index: ZaliznyakIndex) {
    this.lemma = lemma;
    this.index = index;
    this.stem = Slovo.stem(lemma);
  }

  /**
   * Извлечение основы слова из его словарной формы
   */
  static stem(lemma: string): string {
    const lastLetter = lemma.slice(-1) as Letter;

    if (
      vowels.includes(lastLetter) ||
      lastLetter === 'й' ||
      lastLetter === 'ь'
    ) {
      return lemma.slice(0, -1);
    }

    return lemma;
  }
}

/**
 * @param lemma Словарная форма слова - И. п. ед. ч. для существительных
 * @param index Индекс Зализняка данного слова
 */
export function slovo(lemma: string, index: ZaliznyakIndex) {
  return new Slovo(lemma, index);
}
