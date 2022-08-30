import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { ChangeTariff } from "../components/TariffComponents/ChangeTariff";

const Premium: NextPage = () => {
  return (
    <Layout>
      <ChangeTariff />
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
