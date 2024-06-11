import { styled } from "@pigment-css/react";
import Image from "next/image";
import Link from "next/link";
import { getAge } from "../utils/getAge";
import { Button } from "./Button";
import { Disclose } from "./Disclose";
import { VideoScrollContainer } from "./VideoScrollContainer";

export function AboutMeSection() {
  return (
    <VideoScrollContainer videoSrc="/videos/hakon-clip.webm">
      <div>
        <h2>tl;dr</h2>
        <p>
          I am {getAge()} year old Norwegian, currently I live in
          my hometown of{" "}
          <Link
            href="https://www.google.com/maps/place/Suldal/@59.6022254,6.2884125,8.59z/data=!4m6!3m5!1s0x463950a9455a35fb:0xfbfef00b63da47fe!8m2!3d59.5715437!4d6.816438!16zL20vMDE4Nmhr?entry=ttu"
            target="_blank"
          >
            Suldal
          </Link>{" "}
          with my girlfriend and our two cats. For about{" "}
          {getAge() - 13} years I have been doing web
          development, and professionally for the last{" "}
          {getAge() - 18} of them.
        </p>
        <p>
          When working from home, in teams, along designers,
          using collaborative tools and task management services
          - that is when I am most comfortable. Fine-tuning
          accessible and creative user experiences using React
          and Typescript.
        </p>
        <p>
          I am an expert in all of the front-end fundamentals
          such as <code>HTML</code>, <code>CSS</code> and{" "}
          <code>Javascript</code>, as well as <code>React</code>{" "}
          and <code>Typescript</code>.
        </p>
        <Disclose
          variant="ghost"
          showText="Read more"
          hideText="Show less"
          renderButton={
            <Button
              style={{ width: "max-content" }}
              variant="subtle"
            />
          }
        >
          <>
            <div style={{ height: "var(--size-5)" }} />
            <h2>My journey</h2>
            <p>
              I started building websites way back in 2010, when
              I was just 13 years old.
            </p>
            <p>
              <Image
                src="/hakon-kid.jpg"
                alt="Picture of me as a kid"
                width={350}
                height={350}
                style={{
                  float: "left",
                  margin: "0 var(--size-5) var(--size-5) 0",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
              <blockquote
                style={{ marginBlock: "var(--size-2)" }}
              >
                <strong>Fun fact</strong> I actually started out
                in the (no longer existing) webs.com / freewebs
                community.
              </blockquote>{" "}
              Over the course of my formal education, I built
              many personal projects - as well as a few websites
              for local businesses.
            </p>
            <h3>My first job in the industry</h3>
            <p>
              In 2016, after 2 years in electronic education, and
              one year in IT, I started working as the only IT
              consultant in a start-up legal/law-tech company (
              <Link href="https://ligl.no/" target="_blank">
                LIGL AS
              </Link>
              ).
              <Mark text="Got my first cat! 🐈" />
            </p>
            <p>
              At LIGL, I worked on automating the process of
              writing legal documents through ContractExpress
              Author - as well as creating a web UI for external
              customers to use.
              <Mark text="Shaved my remaining hair! 👨🏻‍🦲" />
            </p>
            <h3>My brief stint in big consulting firms</h3>
            <p>
              After working at LIGL for 4 years, I started
              working as a front-end consultant at{" "}
              <Link href="https://frog.co/">Frog</Link>{" "}
              (previously Idean, part of Capgemini). At Idean, I
              was able to work on a couple of projects at
              Equinor, one of them related to their design
              system, EDS, as well as a project at NDLA (the
              norwegian digital learning area) - where I
              developed a educational game for kids. I also
              worked on a internal project/initiative called{" "}
              <strong>City for City</strong>.{" "}
              <Mark text="Met my girlfriend! 👩🏻‍🦰" />
            </p>
            <p>
              My last project at Idean was a proof of concept
              relating to graph visualization and data
              correlation, called Haystack. Funnily enough, my
              next endeavor would be a similar project.
            </p>

            <h3>Independent consulting</h3>
            <p>
              In 2021, I started my own company - Ryfylke React
              AS. I had a contract set up with Telenor from day
              1, working on yet another data-correlation and log
              analysis project. Since then I&apos;ve been having
              a great time working full-time on this project.
              <Mark text="Got our second cat! 🐈‍⬛" />
            </p>
            <p>
              At Telenor, I have mostly been working on
              developing new features, fixing bugs, refactoring
              and maintaining the codebase. In addition to my
              work on the front-end, I have also been very
              engaged in increasing the user experience and
              accessibility of the application - pushing for
              reevaluating core design decisions, and making
              changes where necessary - both on the UI and code
              level.
            </p>
            <h3>Open source & other endeavours</h3>
            <p>
              Besides the Telenor project, I have also been
              working on my company&apos;s digital presence, the
              open source initiative;{" "}
              <Link href="https://koding.no/" target="_blank">
                Koding.no
              </Link>
              , other open source projects like{" "}
              <Link href="https://arc.net/l/quote/thnkjtdq">
                RTK Query Loader
              </Link>
              , as well as a company I co-founded with a couple
              of friends and colleagues -{" "}
              <Link
                href="https://buildr-labs-web.vercel.app/"
                target="_blank"
              >
                Buildr Labs
              </Link>
              .
            </p>
          </>
        </Disclose>
        <div className="progress" />
      </div>
    </VideoScrollContainer>
  );
}

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: hsl(var(--background-hsl) / 90%);
  backdrop-filter: blur(0px);
  scroll-behavior: smooth;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-timeline: --aboutMeSectionTimeline y;
  scroll-timeline: --aboutMeSectionTimeline vertical;
  height: 100dvh;
  display: flex;

  > div {
    padding: var(--size-9);
    display: flex;
    flex-direction: column;
    gap: var(--size-6);
    max-width: 90%;
    margin: auto auto;
  }
  & code {
    color: var(--text-1);
  }

  & h2 {
    font-size: var(--font-size-fluid-3);
    color: var(--text-1);
    background: var(--text-highlight-2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  & p {
    font-size: var(--font-size-fluid-1);
    color: var(--text-2);
    text-shadow: 0 1px 0 hsl(var(--background-hsl));
    line-height: var(--font-lineheight-2);
  }

  & > .progress {
    animation-name: scrollAnimAboutMeSection;
    animation-duration: 1ms;
    animation-timeline: --aboutMeSectionTimeline;
    transform-origin: top center;
    transform: scaleY(0);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--pink-2);
    @keyframes scrollAnimAboutMeSection {
      to {
        transform: scaleX(1);
      }
    }
  }
`;

const Container = styled.div`
  min-height: 100dvh;
  background: var(--gray-12);
  position: relative;
  overflow: hidden;
  & > video {
    position: absolute;
    z-index: 1;
    top: 10%;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

function Mark(props: { text: string }) {
  return <StyledMark>{props.text}</StyledMark>;
}

const StyledMark = styled.div`
  color: var(--text-1);
  background: var(--surface-3);
  width: max-content;
  transform: rotate(4deg);
  padding: var(--size-1);
  border-radius: var(--radius-2);
  float: right;
  text-shadow: none;
  font-size: var(--font-size-1);
  user-select: none;
`;
