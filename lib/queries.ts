import { client } from "./sanity";
import { type Project, type Category } from "@/data/projects";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SanityProject = {
  _id:         string;
  num:         string;
  name:        string;
  category:    string;
  description: string;
  tags:        string[];
  images:      string[];
  order:       number;
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

export function toProject(p: SanityProject): Project {
  return {
    num:         p.num,
    name:        p.name,
    category:    p.category as Category,
    description: p.description,
    tags:        p.tags  ?? [],
    images:      p.images ?? [],
  };
}

// ── Revalidation ──────────────────────────────────────────────────────────────
const revalidate = process.env.NODE_ENV === "development" ? 0 : 60;

// ── Queries (all wrapped in try/catch — return empty fallback on failure) ──────

export async function getProjects(): Promise<SanityProject[]> {
  try {
    return await client.fetch(
      `*[_type == "project"] | order(order asc) {
        _id, num, name, category, description, tags,
        "images": images[].asset->url,
        order
      }`,
      {},
      { next: { revalidate } }
    );
  } catch (err) {
    console.error("[getProjects] Sanity fetch failed:", err);
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
