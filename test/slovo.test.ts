import { test, expect } from 'vitest';
import slovo, { Slovo, ZaliznyakIndex } from '../src';

test.each([
  ['акула', 'акул'],
  ['лыжня', 'лыжн'],
  ['ведро', 'ведр'],
  ['бельё', 'бель'],
  ['край', 'кра'],
  ['тополь', 'топол'],
  ['поезд', 'поезд'],
  ['стол', 'стол'],
  ['СТОЛ', 'стол'],
  ['Стол', 'стол'],
])('Slovo.stem(%s) -> %s', (lemma, expected) => {
  expect(Slovo.stem(lemma)).toBe(expected);
});

test.each([
  [
    'кошка',
    'жо 3*a',
    {
      lemma: 'кошка',
      stem: 'кошк',
      index: {
        features: { gender: 'f', animacy: 'a' },
        declension: 'sub',
        type: 3,
        stress: 'a',
        mobileVowel: true,
      },
    },
  ],
  [
    'ведро',
    'с 1*d, ё',
    {
      lemma: 'ведро',
      stem: 'ведр',
      index: {
        features: { gender: 'n', animacy: 'ina' },
        declension: 'sub',
        type: 1,
        stress: 'd',
        mobileVowel: true,
        ioAlternation: true,
      },
    },
  ],
] as [string, string, Slovo][])(
  'slovo(%s, %s) -> %s',
  (lemma, index, expected) => {
    const word = slovo(lemma, index);
    expect(word).toBeInstanceOf(Slovo);
    expect(word?.lemma).toBe(expected.lemma);
    expect(word?.stem).toBe(expected.stem);
    expect(JSON.parse(JSON.stringify(word?.index))).toStrictEqual(expected.index);
  },
);

test.each([
  [
    'кошка',
    {
      features: { gender: 'f', animacy: 'a' },
      declension: 'sub',
      type: 3,
      stress: 'a',
      mobileVowel: true,
    },
    {
      lemma: 'кошка',
      stem: 'кошк',
      index: {
        features: { gender: 'f', animacy: 'a' },
        declension: 'sub',
        type: 3,
        stress: 'a',
        mobileVowel: true,
      },
    },
  ],
  [
    'ведро',
    {
      features: { gender: 'n', animacy: 'ina' },
      declension: 'sub',
      type: 1,
      stress: 'd',
      mobileVowel: true,
      ioAlternation: true,
    },
    {
      lemma: 'ведро',
      stem: 'ведр',
      index: {
        features: { gender: 'n', animacy: 'ina' },
        declension: 'sub',
        type: 1,
        stress: 'd',
        mobileVowel: true,
        ioAlternation: true,
      },
    },
  ],
] as [string, ZaliznyakIndex, Slovo][])(
  'new Slovo(%s, %s) -> %s',
  (lemma, index, expected) => {
    const word = new Slovo(lemma, index);
    expect(word).toBeInstanceOf(Slovo);
    expect(word?.lemma).toBe(expected.lemma);
    expect(word?.stem).toBe(expected.stem);
    expect(JSON.parse(JSON.stringify(word?.index))).toStrictEqual(expected.index);
  },
);
