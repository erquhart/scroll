import type { eq } from "fp-ts";

import type { api } from "~src/convex/_generated/api";

export type VersionedNote = typeof api.tiptap.getNote["_returnType"];
export const Eq: eq.Eq<VersionedNote> = {
  equals: (x, y) => x === y,
};
