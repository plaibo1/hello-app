import Container from "components/LayoutComponents/Container";
import { UnsubscribeAgree } from "components/UnsubscribeComponents";
import { Context, StateSchema } from "context";
import type { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../components/LayoutComponents/Layout";
import { checkAuth } from "../helpers/checkAuth";

type UnsubscribePropsType = {
  initialState: StateSchema
}

const Unsubscribe: NextPage<UnsubscribePropsType> = (props) => {
  const { t } = useTranslation("unsubscribe");
  const { push } = useRouter();

  useEffect(() => {
    if (!props.initialState.user.auth) {
      push("/login")
    }
  }, [])

  return (
    <Layout meta={{ title: t("pageTitle") }}>
      <Container>
        <UnsubscribeAgree />
      </Container>
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

export default Unsubscribe;
