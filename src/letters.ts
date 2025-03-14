import type { Split } from './utils';

const LETTERS = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' as const;

export type Letter = Split<typeof LETTERS>[number];

export const VOWELS = 'аеёиоуыэеёюя'.split('') as Letter[];
export const CONSONANTS = VOWELS.filter((letter) => !VOWELS.includes(letter));
