import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool }    from "@sanity/vision";
import { schemaTypes }   from "./sanity/schemaTypes";

export default defineConfig({
  name:    "portfolio",
  title:   "Portfolio CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("project")     .title("Projects"),
            S.documentTypeListItem("testimonial") .title("Testimonials"),
            S.documentTypeListItem("experience")  .title("Work Experience"),
            S.divider(),
            // Singletons
            S.listItem()
              .title("About Section")
              .child(S.document().schemaType("about").documentId("about")),
            S.listItem()
              .title("Hero Section")
              .child(S.document().schemaType("hero").documentId("hero")),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
