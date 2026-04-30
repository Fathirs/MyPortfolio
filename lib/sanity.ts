import { createClient } from "next-sanity";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

// ── Env validation — fail fast with a clear message ───────────────────────────
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("Missing env var: NEXT_PUBLIC_SANITY_PROJECT_ID");
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error("Missing env var: NEXT_PUBLIC_SANITY_DATASET");
}

export const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN in production for speed; direct API in dev for fresh data
  useCdn: process.env.NODE_ENV !== "development",
});

// ── Image URL builder ─────────────────────────────────────────────────────────
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
