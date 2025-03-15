import { test, expect } from 'vitest';
import indexFromString from '../src/zaliznyak/indexFromString';
import type { ZaliznyakIndex } from '../src/zaliznyak';

test.each([
  [
    'м 1a',
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 1,
      stress: 'a',
    },
  ],
  [
    'мо 2b',
    {
      features: { gender: 'm', animacy: 'a' },
      declension: 'sub',
      type: 2,
      stress: 'b',
    },
  ],
  [
    'жо   3*a',
    {
      features: { gender: 'f', animacy: 'a' },
      declension: 'sub',
      type: 3,
      stress: 'a',
      mobileVowel: true,
    },
  ],
  [
    'с, 7°c',
    {
      features: { gender: 'n', animacy: 'ina' },
      declension: 'sub',
      type: 7,
      stress: 'c',
      alternations: true,
    },
  ],
  [
    'ж 5*°f',
    {
      features: { gender: 'f', animacy: 'ina' },
      declension: 'sub',
      type: 5,
      stress: 'f',
      mobileVowel: true,
      alternations: true,
    },
  ],
  [
    'жо, 4e①',
    {
      features: { gender: 'f', animacy: 'a' },
      declension: 'sub',
      type: 4,
      stress: 'e',
      deviation: '1',
    },
  ],
  [
    'со  , 6*d②',
    {
      features: { gender: 'n', animacy: 'a' },
      declension: 'sub',
      type: 6,
      stress: 'd',
      mobileVowel: true,
      deviation: '2',
    },
  ],
  [
    'м 7°b①②',
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 7,
      stress: 'b',
      alternations: true,
      deviation: '12',
    },
  ],
  [
    'ж  ,,, \t  , \n  ,   1c③',
    {
      features: { gender: 'f', animacy: 'ina' },
      declension: 'sub',
      type: 1,
      stress: 'c',
      deviation: '3',
    },
  ],
  [
    'м 1a ё',
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 1,
      stress: 'a',
      ioAlternation: true,
    },
  ],
  [
    'м1aё',
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 1,
      stress: 'a',
      ioAlternation: true,
    },
  ],
] as [string, ZaliznyakIndex][])(
  'indexFromString(%s) -> %s',
  (index, expected) => {
    expect(JSON.parse(JSON.stringify(indexFromString(index)))).toStrictEqual(
      expected,
    );
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

