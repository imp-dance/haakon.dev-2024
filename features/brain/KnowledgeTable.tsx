"use client";
import { styled } from "@pigment-css/react";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { knowledgeData } from "./knowledge";

export enum KnowledgeLevel {
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

const fuse = new Fuse(knowledgeData, {
  keys: ["subject"],
  threshold: 0.3,
});

export default function KnowledgeTable() {
  const [search, setSearch] = useState("");
  const processedData = useMemo(
    () =>
      (search
        ? [...fuse.search(search)]
        : knowledgeData.map((v) => ({
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
        placeholder="🔎 Search for a subject"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
      />
      <Table
        className="anim-fadedown"
        fixedHeaderContent={() => (
          <tr>
            <th>Subject</th>
            <th
              style={{
                width: 240,
                minWidth: 240,
                maxWidth: 240,
              }}
            >
              Knowledge level
            </th>
          </tr>
        )}
        style={{ height: 500, borderRadius: 0 }}
        data={processedData}
        itemContent={(
          _index,
          row: (typeof processedData)[number]
        ) => (
          <>
            <td>{row.item.subject}</td>
            <td
              style={{
                width: 240,
                minWidth: 240,
                maxWidth: 240,
              }}
            >
              <RenderKnowledgeLevel
                level={row.item.knowledgeLevel}
              />
            </td>
          </>
        )}
      />
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

const Table = styled(TableVirtuoso)`
  width: 100%;
  border-radius: 0px;

  & table {
    width: 100%;
    border-radius: 0px;
    --nice-inner-radius: 0px;
  }

  & td,
  & th {
    cursor: auto;
    text-align: left;
    diplay: -webkit-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: var(--font-size-3);
    & span {
      diplay: -webkit-box;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  & tr td:last-child {
    width: 260px;
  }

  & .match td {
    background: var(--surface-3);
  }
`;

const Input = styled.input`
  padding: var(--size-2) var(--size-3);
  font-size: var(--size-3);
`;
