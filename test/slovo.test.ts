import { test, expect } from 'vitest';
import { Slovo } from '../src';

test.each([
  ['акула', 'акул'],
  ['лыжня', 'лыжн'],
  ['ведро', 'ведр'],
  ['бельё', 'бель'],
  ['край', 'кра'],
  ['тополь', 'топол'],
  ['поезд', 'поезд'],
  ['стол', 'стол'],
])('Slovo.stem(%s) -> %s', (lemma, expected) => {
  expect(Slovo.stem(lemma)).toBe(expected);
});
