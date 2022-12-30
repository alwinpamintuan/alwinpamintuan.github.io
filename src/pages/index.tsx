import type { NextPage } from "next";
import {
  Layout,
  Hero,
  About,
  Experience,
  Projects,
  Contact,
} from "@modules/index";

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </Layout>
  );
};

export default Home;
