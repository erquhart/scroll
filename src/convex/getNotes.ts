import { query } from "~src/convex/_generated/server";
import { tiptap } from "~src/convex/tiptap";
import type { DatePaginationCursors } from "~src/date-pagination-cursors";

export default query(
  async (
    ctx,
    {
      datePaginationCursors,
    }: { datePaginationCursors: DatePaginationCursors | null },
  ): Promise<string[]> =>
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
);
