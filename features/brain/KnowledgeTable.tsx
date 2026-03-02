"use client";
import { styled } from "@pigment-css/react";
import { Fragment, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { useFuzzySearch } from "../../hooks/useFuzzySearch";
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

export default function KnowledgeTable() {
  const [search, setSearch] = useState("");
  const searchedList = useFuzzySearch(knowledgeData, search);
  const data = searchedList.toSorted(
    (a, b) =>
      orderByKnowledgeLevel.indexOf(b.knowledgeLevel) -
      orderByKnowledgeLevel.indexOf(a.knowledgeLevel),
  );

  return (
    <>
      <Input
        type="search"
        placeholder="🔎 Search for a subject"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
        style={{
          padding: "var(--size-3)",
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
      />
      <Table
        className="anim-fadedown"
        fixedHeaderContent={() => (
          <tr>
            <th
              style={{
                fontSize: "0.875rem",
                color: "var(--text-5)",
              }}
            >
              Subject
            </th>
            <th
              style={{
                width: 120,
                minWidth: 120,
                maxWidth: 120,
                fontSize: "0.875rem",
                color: "var(--text-5)",
              }}
            >
              Knowledge level
            </th>
          </tr>
        )}
        style={{ height: 500, borderRadius: 4 }}
        data={data}
        itemContent={(_index, row: (typeof data)[number]) => (
          <Fragment key={row.subject}>
            <td
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {row.subject}
            </td>
            <td
              style={{
                width: 120,
                minWidth: 120,
                maxWidth: 120,
              }}
            >
              <RenderKnowledgeLevel level={row.knowledgeLevel} />
            </td>
          </Fragment>
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
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          👂🏻
          <span
            style={{
              color: "var(--text-5)",
              fontSize: "0.875rem",
            }}
          >
            Have heard about it
          </span>
        </div>
      );
    case KnowledgeLevel.readAbout:
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          👨🏻‍🏫
          <span
            style={{
              color: "var(--text-5)",
              fontSize: "0.875rem",
            }}
          >
            Have read about it
          </span>
        </div>
      );
    case KnowledgeLevel.someExperience:
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          👍
          <span
            style={{
              color: "var(--text-5)",
              fontSize: "0.875rem",
            }}
          >
            A bit of experience
          </span>
        </div>
      );
    case KnowledgeLevel.experienced:
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          🔥
          <span
            style={{
              color: "var(--text-5)",
              fontSize: "0.875rem",
            }}
          >
            Lots of experience!
          </span>
        </div>
      );
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
