import type { NextPage } from "next";
import Container from "../components/LayoutComponents/Container";
import { RecoveryForm } from "../components/FormComponents";
import classes from "../styles/Recovery.module.scss";
import { Row, Col } from "react-flexbox-grid";
import { checkAuth } from "../helpers/checkAuth";

const Recovery: NextPage = () => {
  return (
    <section className={classes.recovery}>
      <div className={classes.formWrap}>
        <RecoveryForm />
      </div>
    </section>
  );
};

export const getServerSideProps = async ({ req, res, resolvedUrl }: any) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Recovery;
