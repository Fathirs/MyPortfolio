import { defineField, defineType } from "sanity";

export const experienceSchema = defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  fields: [
    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Jakarta, Indonesia",
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "e.g. Jan 2022 - Present",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower = shown first (most recent job)",
    }),
  ],
  preview: {
    select: {
      title:    "role",
      subtitle: "company",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name:  "orderAsc",
      by:    [{ field: "order", direction: "asc" }],
    },
  ],
});
