import Head from "next/head";
import React, { FC, ReactNode, useContext, useEffect } from "react";

import Header from "../Header";
import Footer from "../Footer";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Context } from "context";
import { accessLinks } from "constants/access";

interface IProps {
  children: ReactNode;
  meta?: {
    title?: string;
    description?: string;
  };
  fullHeight?: boolean;
}

const initialMeta = {
  title: "Hello",
  description: "meta description",
};

export const Layout: FC<IProps> = ({
  children,
  meta = initialMeta,
  fullHeight = false,
}) => {
  const { t } = useTranslation("common");
  const { pathname, push } = useRouter();
  const { state, cancelTariff } = useContext<any>(Context);
  useEffect(() => {
    let profileStatus = "withoutLogin";
    const page = pathname.split("?")[0];
    console.log("STATE", state);
    console.log("PAGE", page);

    if (state.user.auth) {
      if (
        (state.user.data && state.user.data.premium) ||
        state.user.data.trial
      ) {
        profileStatus = "withPremium";
      } else {
        profileStatus = "withoutPremium";
      }
    }
    const statusObject = accessLinks[profileStatus];
    if (
      !statusObject.access.includes(page) &&
      !Array.isArray(statusObject.redirect)
    ) {
      push(statusObject.redirect);
    }
  }, [pathname, push, state, state.user.auth, state.user.data]);
  return (
    <>
      <Head>
        <title>{t(meta.title || "Hello")}</title>
        <meta
          name="description"
          content={t(meta.description || "meta description")}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="layoutWrap">
        {!fullHeight && <Header />}
        <main>{children}</main>
      </div>
      {!fullHeight && <Footer />}
    </>
  );
};
