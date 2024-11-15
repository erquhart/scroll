import type { Id } from "~src/convex/_generated/dataModel";
import { mutation } from "~src/convex/_generated/server";
import { tiptap } from "~src/convex/tiptap";

export default mutation(
  async (
    ctx,
    {
      noteId,
      clientId,
      clientPersistedVersion,
      steps,
    }: {
      noteId: Id<"notes">;
      clientId: string;
      clientPersistedVersion: number;
      steps: string[];
    },
  ): Promise<void> => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw "Not authenticated";
    }
    await tiptap.applySteps(ctx, {
      owner: userIdentity.tokenIdentifier,
      noteId: noteId.toString(),
      clientId,
      clientPersistedVersion,
      steps,
    });
  },
);
