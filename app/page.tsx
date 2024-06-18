import { styled } from "@pigment-css/react";
import { DisableScroll } from "../components/DisableScroll";
import { AboutMeSection } from "../features/portfolio/AboutMeSection";
import { Header } from "../features/portfolio/Header";
import { PortfolioSection } from "../features/portfolio/PortfolioSection";

export default function Home() {
  return (
    <Container>
      <DisableScroll />
      <Header />
      <AboutMeSection />
      <PortfolioSection />
      {/* Phones will act weirdly for the last scroll snap item */}
      {/* Therefore adding this empty last item with a set height */}
      <footer></footer>
    </Container>
  );
}

const Container = styled.main`
  height: 100vh;
  overflow-y: scroll;

  & footer {
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
    & footer {
      display: none;
    }
  }
`;
