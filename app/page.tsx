import HeroSection         from "@/components/sections/HeroSection";
import AboutSection        from "@/components/sections/AboutSection";
import ExperienceSection   from "@/components/sections/ExperienceSection";
import ServicesSection     from "@/components/sections/ServicesSection";
import ProjectsSection     from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection          from "@/components/sections/CTASection";
import Navbar              from "@/components/ui/Navbar";

import {
  getHero,
  getAbout,
  getExperiences,
  getProjects,
  getTestimonials,
} from "@/lib/queries";

export default async function HomePage() {
  // Fetch all CMS data in parallel — falls back gracefully if Sanity is empty
  const [hero, about, experiences, projects, testimonials] = await Promise.all([
    getHero(),
    getAbout(),
    getExperiences(),
    getProjects(),
    getTestimonials(),
  ]);

  return (
    <main>
      <HeroSection hero={hero} />

      {/* Sticky navbar — lives here so it sticks within <main> */}
      <Navbar />

      <div id="about">        <AboutSection        about={about}         /></div>
      <div id="experience">  <ExperienceSection   experiences={experiences} /></div>
      <div id="solution">    <ServicesSection /></div>
      <div id="projects">    <ProjectsSection     projects={projects}   /></div>
      <div id="testimonials"><TestimonialsSection testimonials={testimonials} /></div>

      <CTASection hero={hero} />
    </main>
  );
}
