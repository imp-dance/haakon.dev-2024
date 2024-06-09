import { styled } from "@pigment-css/react";
import { getAge } from "../utils/getAge";
import { Button, ButtonLink } from "./Button";
import styles from "./Header.module.css";
import { ChevronDown } from "./icons/ChevronDown";
import { MeSVG } from "./svg/MeSVG";

export function Header() {
  return (
    <Container>
      <div>
        <h1>
          Hi, my name is <span>Håkon Underbakke</span>
        </h1>
        <h2>
          I&apos;m a Norwegian frontend developer currently doing
          contract work for my own company,{" "}
          <strong>Ryfylke React AS</strong>.
        </h2>
        <p>
          I have been doing front-end focused web development
          professionally for about {getAge() - 18} years. These
          days, I mostly work with <code>React</code> and{" "}
          <code>Typescript</code>.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--size-5)",
            flexWrap: "wrap",
          }}
        >
          <ButtonLink
            href="/articles"
            variant="secondary"
            style={{ flexGrow: 1 }}
          >
            Articles by me
          </ButtonLink>
          <Button variant="primary" style={{ flexGrow: 1 }}>
            Contact me
          </Button>
        </div>
      </div>
      <MeSVG
        style={{
          position: "absolute",
          right: "-4rem",
          bottom: "-3.5rem",
        }}
      />
      <ChevronDown className={styles.chevron} />
    </Container>
  );
}

const Container = styled.header`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: var(--size-9);
  gap: var(--size-9);
  position: relative;
  overflow: hidden !important;
  background: var(--gradient-8);
  & > div {
    margin-top: auto;
    max-width: 580px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: var(--size-5);

    & h1 {
      font-size: var(--font-size-fluid-3);
      letter-spacing: (--font-letterspacing-2);
      font-weight: var(--font-weight-7);
      & span {
        background: var(--gradient-5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    & h2,
    & p {
      background: var(--gradient-9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: var(--font-size-fluid-1);
      letter-spacing: (--font-letterspacing-3);
      font-weight: var(--font-weight-4);

      & code {
        color: var(--gray-1);
        -webkit-background-clip: none;
        -webkit-text-fill-color: var(--gray-1);
        font-size: var(--font-size-fluid-0);
        transform: translateY(-2px);
        display: inline-block;
      }
    }
  }
`;
