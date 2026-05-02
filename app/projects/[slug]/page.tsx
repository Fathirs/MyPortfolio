import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, getProjectSlugs, getHero, toProject, slugify } from "@/lib/queries";
import { projects as defaultProjects, type Project } from "@/data/projects";
import ProjectDetail from "./ProjectDetail";

// Pre-render known slugs at build time. Unknown slugs are still served
// on-demand (Next 16 default) and 404'd via notFound() if absent.
export async function generateStaticParams() {
  const [sanitySlugs, allSanityProjects] = await Promise.all([
    getProjectSlugs(),
    getProjects(),
  ]);
  // Also include name-derived slugs for Sanity docs without a slug field
  const nameDerivedSlugs = allSanityProjects.map((p) => slugify(p.name));
  const fallback         = defaultProjects.map((p) => p.slug);
  const all = Array.from(new Set([...sanitySlugs, ...nameDerivedSlugs, ...fallback]));
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project  = await resolveProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title:       `${project.name} — Project Detail`,
    description: project.description,
  };
}

async function resolveProject(slug: string): Promise<Project | null> {
  // 1. Prefer Sanity exact slug match (slug.current)
  const sanity = await getProjectBySlug(slug);
  if (sanity) return toProject(sanity);

  // 2. Sanity doc without a slug field — match via name-derived slug
  const allSanity = await getProjects();
  const nameMatch = allSanity.find((p) => slugify(p.name) === slug);
  if (nameMatch) return toProject(nameMatch);

  // 3. Fall back to local data
  return defaultProjects.find((p) => p.slug === slug) ?? null;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, hero] = await Promise.all([resolveProject(slug), getHero()]);

  if (!project) notFound();

  const linkedinUrl = hero?.linkedinUrl ?? "https://linkedin.com";

  return <ProjectDetail project={project} linkedinUrl={linkedinUrl} />;
}
