import { v } from "convex/values"

import { query } from "~src/convex/_generated/server";
import { tiptap } from "~src/convex/tiptap";
import { datePaginationCursorsValidator } from "~src/date-pagination-cursors";

export default query({
  args: {
    datePaginationCursors: v.union(v.null(), datePaginationCursorsValidator),
  },
  handler: async (ctx, { datePaginationCursors }) =>
    ctx.auth.getUserIdentity().then(async (userIdentity) => {
      if (userIdentity) {
        return await tiptap.getNotes(ctx, userIdentity.tokenIdentifier, {
          startTimestamp: datePaginationCursors?.smallerDateCursor,
          endTimestamp: datePaginationCursors?.largerDateCursor,
        });
      } else {
        throw "Not authenticated";
      }
    }),
});
