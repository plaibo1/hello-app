import { ScreenLoader } from "components/ScreenLoader/ScreenLoader";
import { Context } from "context";
import { checkAuth } from "helpers/checkAuth";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Personal: NextPage = () => {
  const { state } = useContext<any>(Context)
  const { push } = useRouter();

  useEffect(() => {
    if (state.user.auth) {
      push('/premium')
    } else {
      push('/');
    }
  }, []);

  return <ScreenLoader />
};

export default Personal;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
  locale
}) => {
  return checkAuth(req, res, resolvedUrl, locale);
};
