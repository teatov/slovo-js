import type { Inflection } from '.';
import { CONSONANTS, FRICATIVES, VOWELS, type Letter } from '../letters';
import type { Slovo } from '../slovo';
import type { ZaliznyakIndex } from '../zaliznyak';

export default function (
  word: Slovo,
  inflection: Inflection,
  flexion: string,
): string {
  const { stem, index } = word;
  const { gender } = index.features;
  let vowel = '';
  let vowelPos = 0;
  let replacement = '';

  const lastChar = stem.at(-1) as Letter;
  const secondLastChar = stem.at(-2) as Letter;
  if (VOWELS.includes(lastChar)) {
    vowel = lastChar;
    vowelPos = stem.length - 1;
  } else if (VOWELS.includes(secondLastChar)) {
    vowel = secondLastChar;
    vowelPos = stem.length - 2;
  }
  const letterBeforeVowel = stem.at(vowelPos - 1) as Letter;

  if (gender === 'm' || (gender === 'f' && index.type === 8)) {
    if (
      word.lemma === stem + flexion ||
      (inflection.case === 'ins' && flexion === 'ью')
    ) {
      return stem;
    }

    switch (vowel) {
      case 'o':
        replacement = '';
        break;
      case 'и':
        replacement = 'ь';
        break;
      case 'е':
      case 'ё':
        if (VOWELS.includes(letterBeforeVowel)) {
          replacement = 'й';
        } else if (
          (gender === 'm' && index.type === 6) ||
          (gender === 'm' &&
            index.type === 3 &&
            CONSONANTS.includes(letterBeforeVowel) &&
            !FRICATIVES.includes(letterBeforeVowel)) ||
          letterBeforeVowel === 'л'
        ) {
          replacement = 'ь';
        } else {
          replacement = '';
        }
        break;
    }
  }

  // if ((gender === 'f' && index.type !== 8) || gender === 'n') {

  // }

  return (
    stem.substring(0, vowelPos) + replacement + stem.substring(vowelPos + 1)
  );
}
