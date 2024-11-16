import { Tiptap } from "@erquhart/convex-tiptap";
import { v } from "convex/values";

import { components } from "~src/convex/_generated/api";
import type { GenericCtx} from "~src/convex/_generated/server";
import { mutation } from "~src/convex/_generated/server";
import { query } from "~src/convex/_generated/server";
import { datePaginationCursorsValidator } from "~src/date-pagination-cursors";
import { schema } from "~src/tiptap-schema-extensions";

export const tiptap = new Tiptap(components.tiptap, schema);

const getUserIdentity = async (ctx: GenericCtx) => {
  const userIdentity = await ctx.auth.getUserIdentity();
  if (!userIdentity) {
    throw "Unauthenticated";
  }
  return userIdentity;
};

export const createNote = mutation(async (ctx) => {
  const userIdentity = await getUserIdentity(ctx);
  await tiptap.createNote(ctx, userIdentity.tokenIdentifier);
});

export const getNotes = query({
  args: {
    datePaginationCursors: v.union(v.null(), datePaginationCursorsValidator),
  },
  handler: async (ctx, { datePaginationCursors }) => {
    const userIdentity = await getUserIdentity(ctx);
    return await tiptap.getNotes(ctx, userIdentity.tokenIdentifier, {
      startTimestamp: datePaginationCursors?.smallerDateCursor,
      endTimestamp: datePaginationCursors?.largerDateCursor,
    });
  },
});

export const getStepsSinceVersion = query({
  args: {
    noteId: v.string(),
    version: v.number(),
  },
  handler: async (ctx, args) => {
    const userIdentity = await getUserIdentity(ctx);
    return tiptap.stepsSinceVersion(ctx, {
      ...args,
      owner: userIdentity.tokenIdentifier,
    });
  },
});

export const getNote = query({
  args: {
    noteId: v.string(),
  },
  handler: async (ctx, { noteId }) => {
    const userIdentity = await getUserIdentity(ctx);
    return tiptap.getNote(ctx, userIdentity.tokenIdentifier, noteId);
  },
});

export const applySteps = mutation({
  args: {
    noteId: v.string(),
    clientId: v.string(),
    clientPersistedVersion: v.number(),
    steps: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userIdentity = await getUserIdentity(ctx);
    await tiptap.applySteps(ctx, {
      ...args,
      owner: userIdentity.tokenIdentifier,
    });
  },
});
