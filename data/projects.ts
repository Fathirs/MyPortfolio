// ─── Edit this file to update project content & images ───────────────────────
// Images go in /public/images/  →  reference as "/images/filename.png"
// categories must match one of: "SAAS" | "Company Profile" | "Mobile App" | "Web3 App"

export type Category = "SAAS" | "Company Profile" | "Mobile App" | "Web3 App";

export type ProjectStatus = "Launched" | "On Dev" | "Design Draft";

export type TechStackItem = {
  category: string; // e.g. "DEV", "DESIGN", "ANIMATION"
  name:     string; // e.g. "Next.js", "Figma", "Jitter"
  icon?:    string; // optional path to icon (image URL)
};

export type Project = {
  num:              string;
  slug:             string; // URL identifier for detail page
  name:             string;
  description:      string;
  longDescription?: string; // detailed copy for the detail page
  tags:             string[];
  category:         Category;
  images:           string[]; // min 1, up to 15 — auto-cycles every 1.5s
  gallery?:         string[]; // larger showcase images for the detail page
  status?:          ProjectStatus;
  websiteUrl?:      string;
  techStack?:       TechStackItem[];
};

export const projects: Project[] = [
  {
    num:  "01.",
    slug: "brees-visibility",
    name: "BREES VISIBILITY — BRAND WEBSITE REDESIGN",
    description:
      "Built a mobile-first QR ordering web app with kitchen routing and real-time stock sync to cut wait times and reduce order errors across 10 outlets.",
    longDescription:
      "Designed and developed a mobile-first ordering experience with QR-based table sessions, real-time kitchen routing, and live stock synchronisation across all 10 outlets. The platform replaces paper menus with a fluid, branded UI that handles split bills, custom modifiers, and out-of-stock states without disrupting service.\n\nBuilt with a focus on operational reliability — order errors dropped, wait times shortened, and the kitchen team finally has a single source of truth across the network.",
    tags:     ["UI/UX Design", "Frontend Development", "Backend Architecture", "+ More"],
    category: "SAAS",
    status:   "Launched",
    websiteUrl: "https://brees-visibility.example.com",
    techStack: [
      { category: "DEV",       name: "Next.Js" },
      { category: "DESIGN",    name: "Figma" },
      { category: "ANIMATION", name: "Jitter" },
    ],
    images: [
      "/images/proj1-a.png",
      "/images/proj1-b.png",
      "/images/proj1-c.png",
    ],
  },
  {
    num:  "02.",
    slug: "wellcare-clinic",
    name: "WELLCARE CLINIC",
    description:
      "Delivered a secure patient portal for appointments, lab results, and billing with role-based access and automated reminders to reduce no-shows.",
    longDescription:
      "A secure patient portal that consolidates appointments, lab results, and billing under a single account, with role-based access for patients, clinicians, and admin staff. Automated reminders reduced no-shows, while the audit-friendly architecture meets the clinic's compliance requirements.",
    tags:     ["Web Development", "Backend Architecture", "Security Monitoring"],
    category: "SAAS",
    status:   "Launched",
    techStack: [
      { category: "DEV",    name: "Next.Js" },
      { category: "DESIGN", name: "Figma" },
    ],
    images: [
      "/images/proj2-a.png",
    ],
  },
  {
    num:  "03.",
    slug: "autofabs-components",
    name: "AUTOFABS COMPONENTS",
    description:
      "Launched a role-based pricing and RFQ→Quote→PO workflow integrated with accounting; shortened sales cycles and improved document accuracy.",
    longDescription:
      "End-to-end procurement flow — RFQ to Quote to PO — wired into the existing accounting stack with role-based pricing tiers. The team now closes deals faster, with fewer document errors, and finance gets clean handoffs every time.",
    tags:     ["Custom Dashboards", "Data Analytics", "Strategy Consulting"],
    category: "SAAS",
    status:   "Launched",
    techStack: [
      { category: "DEV",    name: "Next.Js" },
      { category: "DESIGN", name: "Figma" },
    ],
    images: [
      "/images/proj3-a.png",
      "/images/proj3-b.png",
      "/images/proj3-c.png",
    ],
  },
];

export const categories: Category[] = ["SAAS", "Company Profile", "Mobile App", "Web3 App"];
