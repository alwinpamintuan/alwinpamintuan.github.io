import type { NextPage } from "next";
import { Layout, About, Experience, Projects, Contact } from "@modules/index";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <About />
        {/*
      <Experience />
      <Projects />
      <Contact /> */}
      </Layout>
      <svg>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="6.29"
            numOctaves="6"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
    </>
  );
};

export default Home;
