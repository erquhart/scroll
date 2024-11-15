import type { Infer} from "convex/values";
import { v } from "convex/values";

export const datePaginationCursorsValidator = v.object({
  smallerDateCursor: v.number(),
  largerDateCursor: v.number(),
});
export type DatePaginationCursors = Infer<typeof datePaginationCursorsValidator>
