import { useCallback } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";
import { ChangeTariff } from "../components/TariffComponents/ChangeTariff";
import useTranslation from "next-translate/useTranslation";
import classes from "../styles/Tariff.module.scss";
import { useRouter } from "next/router";

const Premium: NextPage = () => {
  const { push } = useRouter();
  const { t } = useTranslation("tariff");
  const handleBack = useCallback(() => {
    push("/account");
  }, [push]);
  return (
    <Layout meta={{ title: t("pageTitle") }}>
      <div className={classes.backArrow} onClick={handleBack}>
        <Image
          src="/images/icons/arrow_left.svg"
          width={28}
          height={28}
          alt="Back to previous step"
        />
      </div>
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
