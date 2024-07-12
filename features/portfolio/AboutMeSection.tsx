import { styled } from "@pigment-css/react";
import Link from "next/link";
import { Disclose } from "../../components/Disclose";
import { VideoScrollContainer } from "../../components/layout/VideoScrollContainer";
import { Button } from "../../components/ui/Button";
import { getAge } from "../../utils/getAge";
import { FadeSection } from "./FadeSection";
import { FloatImg } from "./FloatImg";
import { Mark } from "./Mark";
import { TypeWithScroll } from "./TypeWithScroll";

const age = getAge();

export function AboutMeSection() {
  return (
    <VideoScrollContainer videoSrc="/videos/hakon-clip-cropped.mp4">
      <Container>
        <h2>About me</h2>
        <p>
          I am {age} year old Norwegian, currently I live in my
          hometown of{" "}
          <Link
            href="https://www.google.com/maps/place/Suldal/@59.6022254,6.2884125,8.59z/data=!4m6!3m5!1s0x463950a9455a35fb:0xfbfef00b63da47fe!8m2!3d59.5715437!4d6.816438!16zL20vMDE4Nmhr?entry=ttu"
            target="_blank"
          >
            Suldal
          </Link>{" "}
          with my girlfriend and our two cats. For about{" "}
          {age - 13} years I have been doing web development, and
          professionally for the last {age - 18} of them.
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
          showText="My journey"
          hideText="Show less"
          renderButton={
            <Button
              style={{ width: "max-content" }}
              variant="secondary"
            />
          }
        >
          <div
            className="anim-fadedown"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--size-6)",
            }}
          >
            <div style={{ height: "var(--size-5)" }} />
            <FadeSection>
              <h2>My journey</h2>
              <p>
                I started building websites way back in 2010,
                when I was just 13 years old.
              </p>
              <div>
                <FloatImg
                  src="/images/hakon-kid.jpg"
                  alt="Picture of me as a kid"
                />
                <blockquote
                  style={{
                    marginBlock: "var(--size-2)",
                    minWidth: 250,
                  }}
                >
                  <p>
                    <strong>Fun fact</strong>
                    <br /> I actually started out in the webs.com
                    (freewebs) community!
                  </p>
                </blockquote>
              </div>{" "}
              <p>
                Over the course of my formal education, I built
                many personal projects - as well as a few
                websites for local businesses. I typically ended
                up as &quot;the computer guy&quot; role wherever
                I went to school.
              </p>
              <p>
                In my early years, I experimented with all kinds
                of technologies and skills. Other than web dev I
                also dabbled in Photoshop, batch coding, visual
                basic, computer science, etc. I also developed a
                keen interest in music.
              </p>
            </FadeSection>
            <FadeSection>
              <TypeWithScroll
                as="h3"
                style={{ marginTop: "var(--size-5)" }}
                beforeText="#+ $$$$$ /08 %% _^_ 0101010"
              >
                My first job in the industry
              </TypeWithScroll>
              <p>
                <FloatImg
                  src="/images/hakon-ligl.jpg"
                  alt="Picture of me at LIGL AS"
                />
                In 2016, after 2 years in electronic education,
                and one year in IT, I started working as the only
                IT consultant in a start-up legal/law-tech
                company (
                <Link href="https://ligl.no/" target="_blank">
                  LIGL AS
                </Link>
                ). This amazing opportunity allowed me to keep
                working on my web development and design skills.
                I worked as the only IT consultant in the company
                (with all the cons and pros that come with that),
                and was responsible for developing and
                maintaining the company&apos;s web applications.
                <Mark text="Got my first cat! 🐈" />
              </p>
              <p>
                Other than the websites, I also worked on
                automating the process of writing legal documents
                through ContractExpress Author, debugging and
                maintaining the document packages.
                <Mark text="Shaved my remaining hair! 👨🏻‍🦲" />
              </p>
            </FadeSection>
            <FadeSection>
              <TypeWithScroll
                as="h3"
                style={{ marginTop: "var(--size-5)" }}
                fromText="01 01010 ----> .^. <-------- &&&&&"
              >
                My brief stint in big consulting firms
              </TypeWithScroll>
              <p>
                {" "}
                After working at LIGL for 4 years, I started
                working as a front-end consultant at{" "}
                <Link href="https://frog.co/">Frog</Link>{" "}
                (previously Idean, part of Capgemini).
              </p>
              <p>
                <FloatImg
                  src="/images/hakon-idean.jpg"
                  alt="Picture of me at Idean"
                />
                At Idean, I was able to finally work in bigger
                teams of developers, on a couple of projects at
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
                next endeavor would be a similar project. At
                Idean was where I first started learning about
                design systems, as well as work methodologies
                like Scrum and Agile.
                <Mark text="Moved back to Suldal! 🏡" />
              </p>
            </FadeSection>
            <FadeSection>
              <TypeWithScroll
                as="h3"
                style={{ marginTop: "var(--size-5)" }}
                fromText="01010101010 1010101010"
              >
                Independent consulting
              </TypeWithScroll>
              <p>
                <FloatImg
                  src="/images/hakon-outside-rr.jpg"
                  alt="Picture of me back in Suldal"
                />
                In 2021, I started my own company - Ryfylke React
                AS. I had a contract set up with Telenor from day
                1, working on yet another data-correlation and
                log analysis project. Since then I&apos;ve been
                having a great time working full-time on this
                project.
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
              <p>
                I have been at times more or less the only person
                responsible for the frontend at this project, and
                at times I&apos;ve had the opportunity to work
                with amazing senior developers that have taught
                me a lot. The project has been a great learning
                experience, both in regards to technical and
                personal growth.
              </p>
            </FadeSection>
            <FadeSection>
              <TypeWithScroll
                as="h3"
                style={{ marginTop: "var(--size-5)" }}
                fromText="0101 0110 1 01010 10101010"
              >
                Open source & other endeavours
              </TypeWithScroll>
              <p>
                Besides the Telenor project, I have also been
                working on my company&apos;s digital presence,
                the open source initiative;{" "}
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
            </FadeSection>
            <FadeSection>
              <TypeWithScroll
                as="h3"
                style={{
                  marginTop: "var(--size-5)",
                  color: "var(--text-pink-2)",
                }}
                fromText="<<<<-<-<-"
                duration={1}
              >
                🎵 &nbsp; Psst...
              </TypeWithScroll>
              <p>
                I have also been playing drums and producing
                music for a while. You can check out my music on
                Spotify page,{" "}
                <a href="https://open.spotify.com/artist/5nieID8LGLw0nMgwbIIsVq?si=04LddrP1SVCASscQELf1ig">
                  Sl1ck
                </a>
                .
              </p>
            </FadeSection>
            <div style={{ height: "var(--size-9)" }} />
          </div>
        </Disclose>
      </Container>
    </VideoScrollContainer>
  );
}

const Container = styled.div`
  padding: var(--size-9);
  padding-top: var(--size-11);

  @media screen and (max-width: 800px) {
    padding: var(--size-9) var(--size-6);
  }
  display: flex;
  flex-direction: column;
  gap: var(--size-6);
  max-width: 90%;
  margin: auto auto;

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
  & p,
  & blockquote {
    font-size: var(--font-size-fluid-1);
    color: var(--text-2);
    text-shadow: 0 1px 0 hsl(var(--background-hsl));
    line-height: var(--font-lineheight-3);
  }
`;
