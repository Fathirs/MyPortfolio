// ─── Edit this file to update project content & images ───────────────────────
// Images go in /public/images/  →  reference as "/images/filename.png"
// categories must match one of: "SAAS" | "Company Profile" | "Mobile App" | "Web3 App"

export type Category = "SAAS" | "Company Profile" | "Mobile App" | "Web3 App";

export type Project = {
  num: string;
  name: string;
  description: string;
  tags: string[];
  category: Category;
  images: string[]; // min 1, up to 3 — auto-cycles every 1.5s
};

export const projects: Project[] = [
  {
    num: "01.",
    name: "BREES VISIBILITY — BRAND WEBSITE REDESIGN",
    description:
      "Built a mobile-first QR ordering web app with kitchen routing and real-time stock sync to cut wait times and reduce order errors across 10 outlets.",
    tags: ["UI/UX Design", "Frontend Development", "Backend Architecture", "+ More"],
    category: "SAAS",
    images: [
      "/images/proj1-a.png",
      "/images/proj1-b.png",
      "/images/proj1-c.png",
    ],
  },
  {
    num: "02.",
    name: "WELLCARE CLINIC",
    description:
      "Delivered a secure patient portal for appointments, lab results, and billing with role-based access and automated reminders to reduce no-shows.",
    tags: ["Web Development", "Backend Architecture", "Security Monitoring"],
    category: "SAAS",
    images: [
      "/images/proj2-a.png",
    ],
  },
  {
    num: "03.",
    name: "AUTOFABS COMPONENTS",
    description:
      "Launched a role-based pricing and RFQ→Quote→PO workflow integrated with accounting; shortened sales cycles and improved document accuracy.",
    tags: ["Custom Dashboards", "Data Analytics", "Strategy Consulting"],
    category: "SAAS",
    images: [
      "/images/proj3-a.png",
      "/images/proj3-b.png",
      "/images/proj3-c.png",
    ],
  },
];

export const categories: Category[] = ["SAAS", "Company Profile", "Mobile App", "Web3 App"];
