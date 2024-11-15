import { Tiptap } from "@convex-dev/tiptap";

import { components } from "~src/convex/_generated/api";
import { schema } from "~src/tiptap-schema-extensions";

export const tiptap = new Tiptap(components.tiptap, schema);