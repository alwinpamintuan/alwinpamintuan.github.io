import type { NextPage } from "next";
import { Layout, Hero, About, Work, Contact } from "@modules/index";

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Work />
      <Contact />
    </Layout>
  );
};

export default Home;
