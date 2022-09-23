import type { NextPage } from "next";
import {
  Layout,
  About,
  Education,
  Experience,
  Affiliations,
  Projects,
  Contact,
} from "@modules/index";

const Home: NextPage = () => {
  return (
    <Layout>
      <About />
      {/* <Education />
      <Experience />
      <Affiliations />
      <Projects />
      <Contact /> */}
    </Layout>
  );
};

export default Home;
