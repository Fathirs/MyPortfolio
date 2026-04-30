import { getProjects, getHero, toProject } from "@/lib/queries";
import { projects as defaultProjects } from "@/data/projects";
import ProjectsGallery from "./ProjectsGallery";

export default async function ProjectsPage() {
  const [sanityProjects, hero] = await Promise.all([getProjects(), getHero()]);

  const projects    = sanityProjects?.length > 0 ? sanityProjects.map(toProject) : defaultProjects;
  const linkedinUrl = hero?.linkedinUrl ?? "https://linkedin.com";

  return <ProjectsGallery projects={projects} linkedinUrl={linkedinUrl} />;
}
