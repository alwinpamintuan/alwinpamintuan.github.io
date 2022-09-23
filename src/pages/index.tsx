import type { NextPage } from "next";
import { About, Layout } from "@modules/index";

const Home: NextPage = () => {
  return (
    <Layout>
      <About />
    </Layout>
  );
};

export default Home;
