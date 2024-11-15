import { mutation } from "~src/convex/_generated/server";
import { tiptap } from "~src/convex/tiptap";

export default mutation(async (ctx): Promise<void> => {
  const userIdentity = await ctx.auth.getUserIdentity();

  if (userIdentity) {
    await tiptap.createNote(ctx, userIdentity.tokenIdentifier);
  } else {
    throw "You must be logged in to create a note!";
  }
});
