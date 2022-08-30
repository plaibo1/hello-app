import type { NextPage } from "next";
import Container from "../components/LayoutComponents/Container";
import { LoginForm } from "../components/FormComponents";
import classes from "../styles/Login.module.scss";
import { Row, Col } from "react-flexbox-grid";
import { checkAuth } from "../helpers/checkAuth";

const Login: NextPage = (props: any) => {
  return (
    <section className={classes.signIn}>
      <div className={classes.formWrap}>
        <LoginForm />
      </div>
    </section>
  );
};

export const getServerSideProps = async ({ req, res, resolvedUrl }: any) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Login;
