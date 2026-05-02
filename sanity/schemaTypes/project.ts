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
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL identifier for the project detail page (auto-generated from name).",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
            .slice(0, 96),
      },
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
      title: "Description (short)",
      type: "text",
      rows: 3,
      description: "One-paragraph summary used on cards.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "text",
      rows: 8,
      description: "Detailed description shown on the project detail page. Falls back to short description if empty.",
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
      title: "Project Images (cards)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Min 1, up to 15. Auto-cycles every 1.5s on cards.",
      validation: (Rule) => Rule.required().min(1).max(15),
    }),
    defineField({
      name: "gallery",
      title: "Gallery (detail page)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Large showcase images for the detail page. Falls back to card images if empty.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Design Draft", value: "Design Draft" },
          { title: "On Dev",       value: "On Dev" },
          { title: "Launched",     value: "Launched" },
        ],
        layout: "radio",
      },
      initialValue: "Design Draft",
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      description: "Link shown on the 'Visit The Website' button. Hidden if empty.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "techStack",
      title: "Tools & Techstacks",
      type: "array",
      description: "List shown in the 'Tools & Techstacks' card on the detail page.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              description: "e.g. DEV, DESIGN, ANIMATION",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Tool Name",
              type: "string",
              description: "e.g. Next.js, Figma, Jitter",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              description: "Optional small icon/logo for the tool.",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "category", media: "icon" },
          },
        },
      ],
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
