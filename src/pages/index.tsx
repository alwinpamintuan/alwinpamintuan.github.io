import type { NextPage } from "next";
import { Layout } from "@modules/layout";
import { Placeholder } from "@components/placeholder";
import { About } from "@modules/about";

const Home: NextPage = () => {
  return (
    <Layout>
      {/* <Placeholder /> */}
      <About />
    </Layout>
  );
};

export default Home;
