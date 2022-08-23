import type { NextPage } from "next";
import { About, Layout } from "@modules/index";
import { Placeholder } from "@components/index";

const Home: NextPage = () => {
  return (
    <Layout>
      {/* <Placeholder /> */}
      <About />
    </Layout>
  );
};

export default Home;
