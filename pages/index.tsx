import { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { isDesktop } from 'react-device-detect';
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { Functions } from "../components/HomeComponents/Functions";
import { Benefits } from "../components/HomeComponents/Benefits";
import { Connect } from "../components/HomeComponents/Connect";
import { Jumbotron } from "../components/HomeComponents/Jumbotron";
import { HowItWork } from "../components/HomeComponents/HowItWork";
import { WhatIsIt } from "../components/HomeComponents/WhatIsIt";
import useTranslation from "next-translate/useTranslation";


const Home: NextPage<{prevPath: string }> = ({ prevPath }) => {
  const { t } = useTranslation("home");

  useEffect(() => {
    if (prevPath.includes("business") ||  prevPath.includes("personal")) {
      if (!isDesktop) {
        window.location.href = `hello://hellomobile.app${prevPath}`;
      }
    }
  }, [])

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
