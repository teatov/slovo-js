import type { Inflection } from '../src/inflect';
import type { Concat } from '../src/utils';

const cases: [
  string,
  string,
  [Concat<[Inflection['case'], '-', Inflection['number']]>, string][],
][] = [
  [
    'артист',
    'мо 1a',
    [
      ['nom-sg', 'артист'],
      ['nom-pl', 'артисты'],
      ['gen-sg', 'артиста'],
      ['gen-pl', 'артистов'],
      ['dat-sg', 'артисту'],
      ['dat-pl', 'артистам'],
      ['acc-sg', 'артиста'],
      ['acc-pl', 'артистов'],
      ['ins-sg', 'артистом'],
      ['ins-pl', 'артистами'],
      ['prp-sg', 'артисте'],
      ['prp-pl', 'артистах'],
    ],
  ],
  [
    'парта',
    'ж 1a',
    [
      ['nom-sg', 'парта'],
      ['nom-pl', 'парты'],
      ['gen-sg', 'парты'],
      ['gen-pl', 'парт'],
      ['dat-sg', 'парте'],
      ['dat-pl', 'партам'],
      ['acc-sg', 'парту'],
      ['acc-pl', 'парты'],
      ['ins-sg', 'партой'],
      ['ins-pl', 'партами'],
      ['prp-sg', 'парте'],
      ['prp-pl', 'партах'],
    ],
  ],
  [
    'горе',
    'с 2a',
    [
      ['nom-sg', 'горе'],
      ['nom-pl', 'горя'],
      ['gen-sg', 'горя'],
      ['gen-pl', 'горь'],
      ['dat-sg', 'горю'],
      ['dat-pl', 'горям'],
      ['acc-sg', 'горе'],
      ['acc-pl', 'горя'],
      ['ins-sg', 'горем'],
      ['ins-pl', 'горями'],
      ['prp-sg', 'горе'],
      ['prp-pl', 'горях'],
    ],
  ],
];

export default cases;
