import { About, Contact, Hero, Layout, Work } from "@modules/index";
import type { NextPage } from "next";

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
