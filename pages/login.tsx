import type { GetServerSideProps, NextPage } from "next";
import { LoginForm } from "../components/FormComponents";
import classes from "../styles/Login.module.scss";
import { checkAuth } from "../helpers/checkAuth";
import { Layout } from "components/LayoutComponents/Layout";

const Login: NextPage = () => {
  return (
    <Layout meta={{ title: "Вход в аккаунт Hello" }} fullHeight={true}>
      <section className={classes.signIn}>
        <div className={classes.formWrap}>
          <LoginForm />
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

export default Login;
