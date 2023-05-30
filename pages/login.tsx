import type { GetServerSideProps, NextPage } from "next";
import { LoginForm } from "../components/FormComponents";
import classes from "../styles/Login.module.scss";
import { checkAuth } from "../helpers/checkAuth";
import { Layout } from "components/LayoutComponents/Layout";
import useTranslation from "next-translate/useTranslation";

const Login: NextPage<{ prevPath: string }> = ({ prevPath }) => {
  const { t } = useTranslation("login");
  return (
    <Layout meta={{ title: t("metaTitle") }} fullHeight={true}>
      <section className={classes.signIn}>
        <div className={classes.formWrap}>
          <LoginForm prevPath={prevPath}/>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
  locale
}) => {
  return checkAuth(req, res, resolvedUrl, locale);
};

export default Login;
