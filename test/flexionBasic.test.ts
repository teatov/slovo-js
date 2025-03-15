import { test, expect, describe } from 'vitest';
import { ZaliznyakIndex } from '../src';
import flexion from '../src/inflect/flexion';
import cases from './flextionBasicCases';

describe.each(cases)('%s', (indexString, cases) => {
  const index = ZaliznyakIndex.fromString(indexString)!;

  describe.each(cases)(
    `%s`,
    (inflectionCase, expectedSingular, expectedPlural) => {
      test(`flexion[${indexString}](${inflectionCase}, sg) -> ${expectedSingular}`, () => {
        expect(
          flexion[index.type](index, { case: inflectionCase, number: 'sg' }),
        ).toBe(expectedSingular);
      });

      test(`flexion[${indexString}](${inflectionCase}, pl) -> ${expectedPlural}`, () => {
        expect(
          flexion[index.type](index, { case: inflectionCase, number: 'pl' }),
        ).toBe(expectedPlural);
      });
    },
  );
});
