import type { NextPage } from "next";
import { Layout, About, Experience, Projects, Contact } from "@modules/index";

const Home: NextPage = () => {
  return (
    <Layout>
      <About />
      {/*
      <Experience />
      <Projects />
      <Contact /> */}
    </Layout>
  );
};

export default Home;
