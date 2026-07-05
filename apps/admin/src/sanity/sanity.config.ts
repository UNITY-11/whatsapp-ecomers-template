import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "calira-couture",
  title: "Calira Couture CMS",
  projectId: process.env["NEXT_PUBLIC_SANITY_PROJECT_ID"] || "placeholder",
  dataset: process.env["NEXT_PUBLIC_SANITY_DATASET"] || "production",
  basePath: "/",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
