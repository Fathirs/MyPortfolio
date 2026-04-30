import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "boldIntro",
      title: "Bold Intro Sentence",
      type: "string",
      description: "First sentence shown in bold — the hook",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraph1Rest",
      title: "Paragraph 1 (rest, after bold)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Me" }),
  },
});
