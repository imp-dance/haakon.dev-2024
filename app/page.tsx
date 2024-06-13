import { styled } from "@pigment-css/react";
import { AboutMeSection } from "../components/AboutMeSection";
import { DisableScroll } from "../components/DisableScroll";
import { Header } from "../components/Header";
import { PortfolioSection } from "../components/PortfolioSection";

export default function Home() {
  return (
    <Container>
      <Header />
      <AboutMeSection />
      <PortfolioSection />
      <DisableScroll />
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
`;
