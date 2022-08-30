import type { GetServerSideProps, NextPage } from "next";
import { LoginForm } from "../components/FormComponents";
import classes from "../styles/Login.module.scss";
import { checkAuth } from "../helpers/checkAuth";

const Login: NextPage = () => {
  return (
    <section className={classes.signIn}>
      <div className={classes.formWrap}>
        <LoginForm />
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
}) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Login;
