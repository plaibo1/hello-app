import type { NextPage } from "next";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { Jumbotron } from "../components/PremiumComponents/Jumbotron";
import { Benefits } from "../components/PremiumComponents/Benefits";
import { ChangeTariff } from "../components/TariffComponents/ChangeTariff";

const Premium: NextPage = () => {
  return (
    <Layout>
      <ChangeTariff />
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res, resolvedUrl }: any) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Premium;
