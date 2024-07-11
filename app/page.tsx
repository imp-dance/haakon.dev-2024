import { styled } from "@pigment-css/react";
import { GoToTopLink } from "../components/GoToTopLink";
import { ButtonLink } from "../components/ui/Button";
import { AboutMeSection } from "../features/portfolio/AboutMeSection";
import { ContactDialog } from "../features/portfolio/ContactDialog";
import { Header } from "../features/portfolio/Header";
import { PortfolioSection } from "../features/portfolio/PortfolioSection";

export default function Home() {
  return (
    <Container>
      <Header />
      <PortfolioSection />
      <AboutMeSection />
      {/* Phones will act weirdly for the last scroll snap item */}
      {/* Therefore adding this empty last item with a set height */}
      <footer
        style={{
          padding: "var(--size-5)",
          display: "flex",
          gap: "var(--size-5)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <ButtonLink href="/articles" variant="ghost">
          Read my articles &nbsp; 📝
        </ButtonLink>
        <ButtonLink href="/brain" variant="ghost">
          Search my brain &nbsp; 🔎
        </ButtonLink>
        <div>
          <ContactDialog
            variant="ghost"
            buttonText="Send me an email &nbsp; 📧"
          />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <GoToTopLink />
        </div>
      </footer>
    </Container>
  );
}

const Container = styled.main`
  & .foot {
    max-height: auto;
    min-height: auto;
    height: 4rem;
    background: hsl(var(--background-hsl));
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--size-3);
  }

  @media screen and (min-width: 768px) {
    & .foot {
      display: none;
    }
  }
`;
