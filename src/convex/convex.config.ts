import tiptap from "@erquhart/convex-tiptap/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(tiptap);

export default app;
