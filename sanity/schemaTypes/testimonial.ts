import { defineField, defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "Author Role & Company",
      type: "string",
      description: 'e.g. CTO, GOOGLE — shown in UPPERCASE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorPhoto",
      title: "Author Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "projectImage",
      title: "Project Image (Desktop card only)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower = appears first in the stack",
    }),
  ],
  preview: {
    select: {
      title:    "authorName",
      subtitle: "authorRole",
      media:    "authorPhoto",
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
