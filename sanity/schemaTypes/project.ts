import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "num",
      title: "Number",
      type: "string",
      description: 'e.g. 01. 02. 03.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "SAAS",            value: "SAAS" },
          { title: "Company Profile", value: "Company Profile" },
          { title: "Mobile App",      value: "Mobile App" },
          { title: "Web3 App",        value: "Web3 App" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "images",
      title: "Project Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Min 1, up to 3. Auto-cycles every 1.5s.",
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = appears first",
    }),
  ],
  preview: {
    select: {
      title:    "name",
      subtitle: "category",
      media:    "images.0",
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
