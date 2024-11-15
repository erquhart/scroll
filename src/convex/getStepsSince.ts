import type { Id } from "~src/convex/_generated/dataModel";
import { query } from "~src/convex/_generated/server";
import { tiptap } from "~src/convex/tiptap";

export default query(
  async (
    ctx,
    { noteId, version }: { noteId: Id<"notes">; version: number },
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
);
