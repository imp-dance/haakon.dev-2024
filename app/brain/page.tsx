import { styled } from "@pigment-css/react";
import { ButtonLink } from "../../components/ui/Button";
import KnowledgeTable from "../../features/brain/KnowledgeTable";

export default function BrainPage() {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--size-3)",
        }}
      >
        <div>
          <ButtonLink size="sm" variant="subtle" href="/">
            ← Portfolio
          </ButtonLink>
        </div>
        <h1 style={{ color: "var(--text-5)" }}>
          Search my brain 🧠
        </h1>
      </div>
      <p>
        This list includes some of the technologies and packages
        that I know of, which might be relevant if you are
        considering me for a project.
      </p>
      <KnowledgeTable />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-5);
  max-width: min(800px, 100%);
  margin: 0 auto;
`;
