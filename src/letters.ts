import type { Split } from './utils';

const letters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' as const;

export type Letter = Split<typeof letters>[number];

export const vowels = 'аеёиоуыэеёюя'.split('') as Letter[];
export const consonants = vowels.filter((letter) => !vowels.includes(letter));
