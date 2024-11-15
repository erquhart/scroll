import { v } from "convex/values";

import { query } from "~src/convex/_generated/server";
import { tiptap } from "~src/convex/tiptap";

export default query({
  args: {
    noteId: v.string(),
  },
  handler: async (ctx, { noteId }) => {
    const userIdentity = await ctx.auth.getUserIdentity();

    if (userIdentity) {
      return tiptap.getNote(ctx, userIdentity.tokenIdentifier, noteId);
    } else {
      throw "Unauthenticated";
    }
  },
});
