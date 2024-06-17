"use client";
import { styled } from "@pigment-css/react";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";

enum KnowledgeLevel {
  heardAbout = "Have heard about it",
  readAbout = "Have read about it",
  someExperience = "Have a bit of experience",
  experienced = "Have lots of experience",
}

const orderByKnowledgeLevel = [
  KnowledgeLevel.heardAbout,
  KnowledgeLevel.readAbout,
  KnowledgeLevel.someExperience,
  KnowledgeLevel.experienced,
];

const data = [
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
    subject: "styled-components (CSS-in-JS)",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Pigment CSS",
    knowledgeLevel: KnowledgeLevel.someExperience,
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
    subject: "Redux Toolkit (RTK)",
    knowledgeLevel: KnowledgeLevel.experienced,
  },
  {
    subject: "Docusaurus",
    knowledgeLevel: KnowledgeLevel.someExperience,
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
    subject: "ContractExpress Author",
    knowledgeLevel: KnowledgeLevel.someExperience,
  },
].sort((a, b) => a.subject.localeCompare(b.subject));

const fuse = new Fuse(data, {
  keys: ["subject"],
});

export default function KnowledgeTable() {
  const [search, setSearch] = useState("");
  const filteredData = useMemo(
    () =>
      (search
        ? [...fuse.search(search)]
        : data.map((v) => ({
            item: v,
          }))
      ).sort(
        (a, b) =>
          orderByKnowledgeLevel.indexOf(b.item.knowledgeLevel) -
          orderByKnowledgeLevel.indexOf(a.item.knowledgeLevel)
      ),
    [search]
  );
  return (
    <>
      <Input
        type="search"
        placeholder="Search for a subject 🔎"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Knowledge level</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => {
            const matches =
              search.toLowerCase().trim() ===
              row.item.subject.toLowerCase();
            return (
              <tr
                key={row.item.subject}
                className={matches ? "match" : undefined}
              >
                <td>
                  {matches ? (
                    <strong>{row.item.subject}</strong>
                  ) : (
                    <>{row.item.subject}</>
                  )}
                </td>
                <td>
                  <RenderKnowledgeLevel
                    level={row.item.knowledgeLevel}
                  />
                </td>
              </tr>
            );
          })}
          {filteredData.length === 0 && (
            <tr>
              <td>{search}</td>
              <td>🤪 Clueless?</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

const RenderKnowledgeLevel = (props: {
  level: KnowledgeLevel;
}) => {
  switch (props.level) {
    case KnowledgeLevel.heardAbout:
      return <span>👂🏻 Have heard about it</span>;
    case KnowledgeLevel.readAbout:
      return <span>👨🏻‍🏫 Have read about it</span>;
    case KnowledgeLevel.someExperience:
      return <span>👍 Have a bit of experience</span>;
    case KnowledgeLevel.experienced:
      return <span>🔥 Have lots of experience!</span>;
    default:
      return null;
  }
};

const Table = styled.table`
  width: 100%;

  & td,
  & th {
    text-align: left;
  }

  & tr td:last-child {
    width: 260px;
  }

  & .match td {
    background: var(--surface-3);
  }
`;

const Input = styled.input`
  padding: var(--size-3);
  font-size: var(--size-4);
`;
