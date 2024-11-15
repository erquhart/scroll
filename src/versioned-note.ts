import type { eq } from "fp-ts";

import type { api } from "~src/convex/_generated/api"


export type VersionedNote = typeof api.getVersionedNote.default["_returnType"];
export const Eq: eq.Eq<VersionedNote> = {
  equals: (x, y) => x === y,
};
