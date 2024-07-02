enum KnowledgeLevel {
  heardAbout = "Have heard about it",
  readAbout = "Have read about it",
  someExperience = "Have a bit of experience",
  experienced = "Have lots of experience",
}
/**
 * Add entries in any order, they will be sorted by knowledge level and then alphabetically by subject.
 */
export const knowledgeData: Array<{
  subject: string;
  knowledgeLevel: KnowledgeLevel;
}> = [
  {
    subject: "HTML",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "CSS",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Javascript",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Node.js",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Bun",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "styled-components",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Pigment CSS",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "NPM, Yarn, PNPM",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Panda CSS",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Tailwind CSS",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "SCSS (sass, less)",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Svelte",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
  {
    subject: "React",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Typescript",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Angular",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "jQuery",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Gatsby",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Remix",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Solid",
    knowledgeLevel: KnowledgeLevel.heardAbout,
  },
  {
    subject: "react-hook-form",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Redux",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Zod",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Formik",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Zustand",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
  {
    subject: "Express",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
  {
    subject: "Ember",
    knowledgeLevel: KnowledgeLevel.heardAbout,
  },
  {
    subject: "Vitest",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Playwright",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "React Query (Tanstack)",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "yup",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Docker",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
  {
    subject: "Carbon Design System",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Material UI (MUI)",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Radix UI",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
  {
    subject: "React Aria",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
  {
    subject: "Figma",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Adobe XD",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Electron",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "React Native",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
  {
    subject: "RxJS",
    knowledgeLevel: KnowledgeLevel.heardAbout,
  },
  {
    subject: "HTMX",
    knowledgeLevel: KnowledgeLevel.heardAbout,
  },
  {
    subject: "Redux Toolkit",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Redux Toolkit Query",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Docusaurus",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Open Props",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "React Server Components (RSC)",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "PHP",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Tanstack Router",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
  {
    subject: "React Router",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Python",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Tanstack Start",
    knowledgeLevel: KnowledgeLevel.heardAbout,
  },
  {
    subject: "Floating UI",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Photoshop",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Framer motion",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "React Three Fiber (3D)",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Three.js (3D)",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Linkurious Ogma",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "SVG / Canvas",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Strapi",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Wordpress",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Jira",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "ContractExpress Author",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "GSAP",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
  {
    subject: "Next.js",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "ESLint",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Prettier",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Biome",
    knowledgeLevel: KnowledgeLevel.readAbout,
  },
].sort((a, b) => a.subject.localeCompare(b.subject));
