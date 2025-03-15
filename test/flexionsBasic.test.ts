import { test, expect, describe } from 'vitest';
import { ZaliznyakIndex } from '../src';
import flexions from '../src/inflect/flexions';
import { cases } from './flexionsBasicCases';

describe.each(cases)('%s', (indexString, cases) => {
  const index = ZaliznyakIndex.fromString(indexString)!;

  describe.each(cases)(
    `%s`,
    (inflectionCase, expectedSingular, expectedPlural) => {
      test(`flexions[${indexString}](${inflectionCase}, sg) -> ${expectedSingular}`, () => {
        expect(
          flexions[index.type](index, { case: inflectionCase, number: 'sg' }),
        ).toBe(expectedSingular);
      });

      test(`flexions[${indexString}](${inflectionCase}, pl) -> ${expectedPlural}`, () => {
        expect(
          flexions[index.type](index, { case: inflectionCase, number: 'pl' }),
        ).toBe(expectedPlural);
      });
    },
  );
});
