import { test, expect, describe } from 'vitest';
import slovo from '../src';
import { cases } from './inflectMobileVowelCases';

describe.each(cases)('%s, %s', (lemma, indexString, cases) => {
  const word = slovo(lemma, indexString)!;

  describe.each(cases)(
    `%s`,
    (inflectionCase, expectedSingular, expectedPlural) => {
      test(`slovo(${lemma}, ${indexString}).inflect(${inflectionCase}, sg) -> ${expectedSingular}`, () => {
        expect(word.inflect({ case: inflectionCase, number: 'sg' })).toBe(
          expectedSingular,
        );
      });

      test(`slovo(${lemma}, ${indexString}).inflect(${inflectionCase}, pl) -> ${expectedPlural}`, () => {
        expect(word.inflect({ case: inflectionCase, number: 'pl' })).toBe(
          expectedPlural,
        );
      });
    },
  );
});
