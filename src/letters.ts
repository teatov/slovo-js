import type { Split } from './utils';

const letters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' as const;

export type Letter = Split<typeof letters>[number];

export const LETTERS = letters.split('') as Letter[];
export const VOWELS = 'аеёиоуыэеёюя'.split('') as Letter[];
export const CONSONANTS = LETTERS.filter((letter) => !VOWELS.includes(letter));

export const FRICATIVES = 'жшщч'.split('') as Letter[];
