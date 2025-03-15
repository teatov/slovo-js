import { test, expect, describe } from 'vitest';
import slovo, { ZaliznyakIndex } from '../src';
import type { Inflection } from '../src/inflect';
import cases from './inflectBasicCases';

describe.each(cases)('slovo(%s, %s)', (lemma, indexString, cases) => {
  const word = slovo(lemma, indexString)!;

  describe.each(cases)(
    `inflect(%s) -> %s`,
    (inflection, expected) => {
      test('test', () => {
        const [inflectionCase, number] = inflection.split('-');

        expect(
          word.inflect({
            case: inflectionCase as Inflection['case'],
            number: number as Inflection['number'],
          }),
        ).toBe(expected);
      });
    },
  );
});
