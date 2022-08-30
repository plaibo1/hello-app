import type { GetServerSideProps, NextPage } from "next";
import { useRef } from "react";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { Jumbotron } from "../components/PremiumComponents/Jumbotron";
import { Benefits } from "../components/PremiumComponents/Benefits";
import { ChooseTariff } from "../components/PremiumComponents/ChooseTariff";

const Premium: NextPage = () => {
  const chooseTariffRef = useRef<HTMLElement>(null);
  const handleButtonClick = () => {
    if (chooseTariffRef.current) {
      chooseTariffRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };
  return (
    <Layout>
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
}) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Premium;
