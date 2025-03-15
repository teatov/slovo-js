import type { ZaliznyakIndex } from '../src';

const casesStandard: [string, ZaliznyakIndex][] = [
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
    "жо, 4d'①",
    {
      features: { gender: 'f', animacy: 'a' },
      declension: 'sub',
      type: 4,
      stress: "d'",
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
  [
    "м 1f'",
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 1,
      stress: "f'",
    },
  ],
  [
    'м 1f"',
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 1,
      stress: 'f"',
    },
  ],
  [
    "м 1*f'①ё",
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 1,
      stress: "f'",
      mobileVowel: true,
      deviation: '1',
      ioAlternation: true,
    },
  ],
];

const casesWiki:[string, ZaliznyakIndex][] = [
  [
    'm a 1a',
    {
      features: { gender: 'm', animacy: 'a' },
      declension: 'sub',
      type: 1,
      stress: 'a',
    },
  ],
  [
    'f ina 7a',
    {
      features: { gender: 'f', animacy: 'ina' },
      declension: 'sub',
      type: 7,
      stress: 'a',
    },
  ],
  [
    'n a 4f\'',
    {
      features: { gender: 'n', animacy: 'a' },
      declension: 'sub',
      type: 4,
      stress: 'f\'',
    },
  ],
  [
    'm ina 3c(3)',
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 3,
      stress: 'c',
      deviation: '3',
    },
  ],
  [
    'm ina 3c(1)(2)',
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 3,
      stress: 'c',
      deviation: '12',
    },
  ],
  [
    'mina3c',
    {
      features: { gender: 'm', animacy: 'ina' },
      declension: 'sub',
      type: 3,
      stress: 'c',
    },
  ],
]

export { casesStandard, casesWiki };
