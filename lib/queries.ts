import { client } from "./sanity";
import { type Project, type Category, type ProjectStatus, type TechStackItem } from "@/data/projects";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SanityTechStackItem = {
  category: string;
  name:     string;
  icon:     string | null;
};

export type SanityProject = {
  _id:              string;
  num:              string;
  slug:             string;
  name:             string;
  category:         string;
  description:      string;
  longDescription?: string | null;
  tags:             string[];
  images:           string[];
  gallery?:         string[] | null;
  status?:          ProjectStatus | null;
  websiteUrl?:      string | null;
  techStack?:       SanityTechStackItem[] | null;
  order:            number;
};

export type SanityTestimonial = {
  _id:          string;
  quote:        string;
  authorName:   string;
  authorRole:   string;
  authorPhoto:  string | null;
  projectImage: string | null;
  order:        number;
};

export type SanityExperience = {
  _id:         string;
  role:        string;
  company:     string;
  location:    string;
  period:      string;
  description: string;
  order:       number;
};

export type SanityAbout = {
  boldIntro:      string;
  paragraph1Rest: string;
  paragraph2:     string;
  paragraph3:     string;
};

export type SanityHero = {
  name:            string;
  tagline:         string;
  profilePhotoUrl: string | null;
  contactEmail:    string | null;
  linkedinUrl:     string | null;
};

// ── Adapter ───────────────────────────────────────────────────────────────────
// Single source of truth for mapping Sanity → app Project type.
// Import this wherever you need to convert Sanity project data.

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function toProject(p: SanityProject): Project {
  return {
    num:             p.num,
    slug:            p.slug ?? slugify(p.name),
    name:            p.name,
    category:        p.category as Category,
    description:     p.description,
    longDescription: p.longDescription ?? undefined,
    tags:            p.tags  ?? [],
    images:          p.images ?? [],
    gallery:         p.gallery ?? undefined,
    status:          p.status ?? undefined,
    websiteUrl:      p.websiteUrl ?? undefined,
    techStack:       p.techStack
      ? p.techStack.map((t) => ({
          category: t.category,
          name:     t.name,
          icon:     t.icon ?? undefined,
        }))
      : undefined,
  };
}

// ── Revalidation ──────────────────────────────────────────────────────────────
const revalidate = process.env.NODE_ENV === "development" ? 0 : 60;

// ── Queries (all wrapped in try/catch — return empty fallback on failure) ──────

// Shared GROQ projection — keep `getProjects` and `getProjectBySlug` in sync.
const PROJECT_PROJECTION = `
  _id, num, name, category, description, longDescription, tags,
  "slug": slug.current,
  "images":  images[].asset->url,
  "gallery": gallery[].asset->url,
  status, websiteUrl,
  "techStack": techStack[]{
    category, name,
    "icon": icon.asset->url
  },
  order
`;

export async function getProjects(): Promise<SanityProject[]> {
  try {
    return await client.fetch(
      `*[_type == "project"] | order(order asc) { ${PROJECT_PROJECTION} }`,
      {},
      { next: { revalidate } }
    );
  } catch (err) {
    console.error("[getProjects] Sanity fetch failed:", err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  try {
    return await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_PROJECTION} }`,
      { slug },
      { next: { revalidate } }
    );
  } catch (err) {
    console.error("[getProjectBySlug] Sanity fetch failed:", err);
    return null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  try {
    return await client.fetch(
      `*[_type == "project" && defined(slug.current)].slug.current`,
      {},
      { next: { revalidate } }
    );
  } catch (err) {
    console.error("[getProjectSlugs] Sanity fetch failed:", err);
    return [];
  }
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  try {
    return await client.fetch(
      `*[_type == "testimonial"] | order(order asc) {
        _id, quote, authorName, authorRole,
        "authorPhoto":  authorPhoto.asset->url,
        "projectImage": projectImage.asset->url,
        order
      }`,
      {},
      { next: { revalidate } }
    );
  } catch (err) {
    console.error("[getTestimonials] Sanity fetch failed:", err);
    return [];
  }
}

export async function getExperiences(): Promise<SanityExperience[]> {
  try {
    return await client.fetch(
      `*[_type == "experience"] | order(order asc) {
        _id, role, company, location, period, description, order
      }`,
      {},
      { next: { revalidate } }
    );
  } catch (err) {
    console.error("[getExperiences] Sanity fetch failed:", err);
    return [];
  }
}

export async function getAbout(): Promise<SanityAbout | null> {
  try {
    return await client.fetch(
      `*[_type == "about"][0] {
        boldIntro, paragraph1Rest, paragraph2, paragraph3
      }`,
      {},
      { next: { revalidate } }
    );
  } catch (err) {
    console.error("[getAbout] Sanity fetch failed:", err);
    return null;
  }
}

export async function getHero(): Promise<SanityHero | null> {
  try {
    return await client.fetch(
      `*[_type == "hero"][0] {
        name, tagline,
        "profilePhotoUrl": profilePhoto.asset->url,
        contactEmail, linkedinUrl
      }`,
      {},
      { next: { revalidate } }
    );
  } catch (err) {
    console.error("[getHero] Sanity fetch failed:", err);
    return null;
  }
}
