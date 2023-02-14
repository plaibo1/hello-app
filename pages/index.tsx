import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { Functions } from "../components/HomeComponents/Functions";
import { Benefits } from "../components/HomeComponents/Benefits";
import { Connect } from "../components/HomeComponents/Connect";
import { Jumbotron } from "../components/HomeComponents/Jumbotron";
import { HowItWork } from "../components/HomeComponents/HowItWork";
import { WhatIsIt } from "../components/HomeComponents/WhatIsIt";
import useTranslation from "next-translate/useTranslation";

const Home: NextPage<any> = () => {
  const { t } = useTranslation("home");
  return (
    <Layout meta={{ title: t("pageTitle") }}>
      <Jumbotron />
      <HowItWork />
      <WhatIsIt />
      <Functions />
      <Benefits />
      <Connect />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
  locale
}) => {
  return checkAuth(req, res, resolvedUrl, locale);
};

export default Home;
