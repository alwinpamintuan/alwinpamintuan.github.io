import React, { Suspense } from "react";
import { Placeholder } from "@components/index";
import { Hero, Layout } from "@modules/index";
import type { NextPage } from "next";

const About = React.lazy(() =>
  import("../modules/about/About").then(({ About }) => ({
    default: About,
  }))
);

const Work = React.lazy(() =>
  import("../modules/work/Work").then(({ Work }) => ({
    default: Work,
  }))
);

const Contact = React.lazy(() =>
  import("../modules/contact/Contact").then(({ Contact }) => ({
    default: Contact,
  }))
);

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={<Placeholder />}>
        <About />
        <Work />
        <Contact />
      </Suspense>
    </Layout>
  );
};

export default Home;
