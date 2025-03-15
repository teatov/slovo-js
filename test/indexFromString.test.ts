import { test, expect } from 'vitest';
import indexFromString from '../src/zaliznyak/indexFromString';
import { casesStandard, casesWiki } from './indexFromStringCases';

test.each(casesStandard)('indexFromString(%s) -> %s', (index, expected) => {
  expect(JSON.parse(JSON.stringify(indexFromString(index)))).toStrictEqual(
    expected,
  );
});

test.each(casesWiki)('indexFromString(%s) -> %s', (index, expected) => {
  expect(JSON.parse(JSON.stringify(indexFromString(index)))).toStrictEqual(
    expected,
  );
});

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
