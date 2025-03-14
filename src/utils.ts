export type Concat<T extends string[]> = T extends [
  infer F extends string,
  ...infer R extends string[],
]
  ? `${F}${Concat<R>}`
  : '';

export type Split<S extends string> = S extends ''
  ? []
  : S extends `${infer C}${infer R}`
    ? [C, ...Split<R>]
    : never;
