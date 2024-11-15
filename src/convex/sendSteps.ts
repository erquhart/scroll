import { v } from "convex/values";

import { mutation } from "~src/convex/_generated/server";
import { tiptap } from "~src/convex/tiptap";

export default mutation({
  args: {
    noteId: v.string(),
    clientId: v.string(),
    clientPersistedVersion: v.number(),
    steps: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw "Not authenticated";
    }
    await tiptap.applySteps(ctx, {
      ...args,
      owner: userIdentity.tokenIdentifier,
    });
  },
});
