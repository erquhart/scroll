import { string } from "fp-ts";
import type { Eq } from "fp-ts/Eq";
import type { Ord } from "fp-ts/lib/Ord";

// TYPECLASS INSTANCES

export const getEq = (): Eq<string> => ({
  equals: (x, y) => x === y,
});

export const getOrd = (): Ord<string> => ({
  equals: getEq().equals,
  compare: string.Ord.compare,
});
