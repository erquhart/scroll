import tiptap from "@convex-dev/tiptap/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(tiptap);

export default app;
