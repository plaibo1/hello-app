import type { NextPage } from "next";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { Functions } from "../components/HomeComponents/Functions";
import { Benefits } from "../components/HomeComponents/Benefits";
import { Connect } from "../components/HomeComponents/Connect";
import { Jumbotron } from "../components/HomeComponents/Jumbotron";
import { HowItWork } from "../components/HomeComponents/HowItWork";
import { WhatIsIt } from "../components/HomeComponents/WhatIsIt";

const Home: NextPage = () => {
  return (
    <Layout>
      <Jumbotron />
      <HowItWork />
      <WhatIsIt />
      <Functions />
      <Benefits />
      <Connect />
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res, resolvedUrl }: any) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Home;
