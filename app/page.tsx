import { styled } from "@pigment-css/react";
import { AboutMeSection } from "../components/AboutMeSection";
import { DisableScroll } from "../components/DisableScroll";
import { Header } from "../components/Header";
import { PortfolioSection } from "../components/PortfolioSection";

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
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  & > * {
    scroll-snap-align: start;
    max-height: 100dvh;
    min-height: 100dvh;
    overflow-y: auto;
  }

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
