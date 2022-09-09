import type { GetServerSideProps, NextPage } from "next";
import Container from "../components/LayoutComponents/Container";
import { RecoveryForm } from "../components/FormComponents";
import classes from "../styles/Recovery.module.scss";
import { Row, Col } from "react-flexbox-grid";
import { checkAuth } from "../helpers/checkAuth";
import { Layout } from "components/LayoutComponents/Layout";
import useTranslation from "next-translate/useTranslation";

const Recovery: NextPage = () => {
  const { t } = useTranslation("recovery");
  return (
    <Layout meta={{ title: t("pageTitle") }} fullHeight={true}>
      <section className={classes.recovery}>
        <div className={classes.formWrap}>
          <RecoveryForm />
        </div>
      </section>
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

export default Recovery;
