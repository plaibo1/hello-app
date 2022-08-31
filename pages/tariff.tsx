import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { ChangeTariff } from "../components/TariffComponents/ChangeTariff";
import useTranslation from "next-translate/useTranslation";

const Premium: NextPage = () => {
  const { t } = useTranslation("common");
  return (
    <Layout meta={{ title: t("Восстановление аккаунта") }}>
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
