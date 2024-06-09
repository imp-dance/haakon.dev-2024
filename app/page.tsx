import { AboutMeSection } from "../components/AboutMeSection";
import { DisableScroll } from "../components/DisableScroll";
import { Header } from "../components/Header";
import { ShowoffSection } from "../components/ShowoffSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <AboutMeSection />
      <ShowoffSection />
      <DisableScroll />
    </main>
  );
}
