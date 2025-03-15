import { test, expect, describe } from 'vitest';
import { ZaliznyakIndex } from '../src';
import flexion from '../src/inflect/flexion';
import type { Inflection } from '../src/inflect';
import cases from './flextionBasicCases';

describe.each(cases)('flexion[%s]', (indexString, cases) => {
  const index = ZaliznyakIndex.fromString(indexString)!;
  describe.each(cases)(
    `flexion[${indexString}](%s) -> %s`,
    (inflection, expected) => {
      test('test', () => {
        const [inflectionCase, number] = inflection.split('-');
        expect(
          flexion[index.type](index, {
            case: inflectionCase as Inflection['case'],
            number: number as Inflection['number'],
          }),
        ).toBe(expected);
      });
    },
  );
});
