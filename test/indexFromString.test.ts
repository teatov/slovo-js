import { test, expect } from 'vitest';
import indexFromString from '../src/zaliznyak/indexFromString';
import type { ZaliznyakIndex } from '../src/zaliznyak';

test.each([
  [
    'м 1a',
    { declension: { gender: 'm', animacy: 'ina' }, type: 1, stress: 'a' },
  ],
  [
    'мо 2b',
    { declension: { gender: 'm', animacy: 'a' }, type: 2, stress: 'b' },
  ],
  [
    'жо   3*a',
    {
      declension: { gender: 'f', animacy: 'a' },
      type: 3,
      stress: 'a',
      mobileVowel: true,
    },
  ],
  [
    'с, 7°c',
    {
      declension: { gender: 'n', animacy: 'ina' },
      type: 7,
      stress: 'c',
      alternations: true,
    },
  ],
  [
    'ж 5*°f',
    {
      declension: { gender: 'f', animacy: 'ina' },
      type: 5,
      stress: 'f',
      mobileVowel: true,
      alternations: true,
    },
  ],
  [
    'жо, 4e①',
    {
      declension: { gender: 'f', animacy: 'a' },
      type: 4,
      stress: 'e',
      deviation: '1',
    },
  ],
  [
    'со  , 6*d②',
    {
      declension: { gender: 'n', animacy: 'a' },
      type: 6,
      stress: 'd',
      mobileVowel: true,
      deviation: '2',
    },
  ],
  [
    'м 7°b①②',
    {
      declension: { gender: 'm', animacy: 'ina' },
      type: 7,
      stress: 'b',
      alternations: true,
      deviation: '12',
    },
  ],
  [
    'ж  ,,, \t  , \n  ,   1c③',
    {
      declension: { gender: 'f', animacy: 'ina' },
      type: 1,
      stress: 'c',
      deviation: '3',
    },
  ],
  [
    'м 1a ё',
    {
      declension: { gender: 'm', animacy: 'ina' },
      type: 1,
      stress: 'a',
      ioAlternation: true,
    },
  ],
  [
    'м1aё',
    {
      declension: { gender: 'm', animacy: 'ina' },
      type: 1,
      stress: 'a',
      ioAlternation: true,
    },
  ],
] as [string, ZaliznyakIndex][])(
  'indexFromString(%s) -> %s',
  (index, expected) => {
    expect(indexFromString(index)).toStrictEqual(expected);
  },
);

test.each([
  '',
  ' ',
  'м',
  'о',
  'м 9a',
  'м 99a',
  'м 1g',
  'м 1i',
  "м 1a'",
  'м 1b"',
  'м 1a①①',
  'м 1a①②③',
  'м 1a②①',
  '_м 1*°a①',
  'м _1*°a①',
  'м 1_*°a①',
  'м 1*°a_①',
  'м 1*°a①_',
  'м 1a_ё',
] as string[])('indexFromString(%s) -> null', (index) => {
  expect(indexFromString(index)).toBeNull();
});
