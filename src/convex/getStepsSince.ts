import { v } from "convex/values";

import { query } from "~src/convex/_generated/server";
import { tiptap } from "~src/convex/tiptap";

export default query({
  args: {
    noteId: v.string(),
    version: v.number(),
  },
  handler: async (
    ctx,
    { noteId, version },
  ): Promise<{ proseMirrorStep: string; clientId: string }[]> => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (userIdentity) {
      return tiptap.stepsSinceVersion(ctx, {
        owner: userIdentity.tokenIdentifier,
        noteId,
        version,
      });
    } else {
      return Promise.reject();
    }
  },
});
