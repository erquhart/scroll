import type { Document, Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(
  async (
    { db },
    docId: Id<"docs">,
    version: number
  ): Promise<{ step: string; clientId: string }[]> => {
    const steps: Document<"steps">[] = await db
      .query("steps")
      .withIndex("by_doc_id_and_position", (q) =>
        q.eq("docId", docId).gt("position", version)
      )
      .collect();

    return await steps.reduce<
      Promise<
        {
          step: Document<"steps">["step"];
          clientId: Document<"steps">["clientId"];
        }[]
      >
    >(async (resultPromise, step) => {
      return resultPromise.then((result) => [
        ...result,
        {
          step: step.step,
          clientId: step.clientId,
        },
      ]);
    }, Promise.resolve([]));
  }
);
