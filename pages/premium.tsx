import type { GetServerSideProps, NextPage } from "next";
import { useContext, useRef } from "react";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { Jumbotron } from "../components/PremiumComponents/Jumbotron";
import { Benefits } from "../components/PremiumComponents/Benefits";
import { ChooseTariff } from "../components/PremiumComponents/ChooseTariff";
import useTranslation from "next-translate/useTranslation";
import { Context } from "context";

const Premium: NextPage<any> = () => {
  // const { state } = useContext<any>(Context);
  // const isAuth = state.user.auth;

  const { t } = useTranslation("premium");
  const chooseTariffRef = useRef<HTMLElement>(null);
  const handleButtonClick = () => {
    if (chooseTariffRef.current) {
      chooseTariffRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  //  meta={{ title: ((!isAuth || !props.initialState.user.auth) ? t("noAuthPageTitle") : t("pageTitle") ) }}

  return (
    <Layout meta={{ title: (t("noAuthPageTitle")) }}>
      <Jumbotron onButtonClick={handleButtonClick} />
      <Benefits />
      <ChooseTariff containerRef={chooseTariffRef} />
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

export default Premium;
