import Head from "next/head";
import React, { FC, ReactNode, useContext, useEffect, useState } from "react";

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
  const [resultStatus, setResultStatus] = useState<Record<string, any> | null>(null);

  const page = pathname.split("?")[0];
  const isHaveAccess = !(
    !resultStatus?.access?.includes(page) &&
    !Array.isArray(resultStatus?.redirect) &&
    resultStatus?.redirect
  )

  useEffect(() => {
    let profileStatus = "withoutLogin";
    
    if (state.user.auth) {
      if (
        (state.user.data && state.user.data.premium) ||
        state.user.data.trial
      ) {
        if (
          state.user.data.trial &&
          !state.user.premium?.autoPayment &&
          state.user.premium?.unactivate === 0
        ) {
          profileStatus = "withoutPremium";
        } else {
          profileStatus = "withPremium";
        }
      } else {
        profileStatus = "withoutPremium";
      }
    }
    setResultStatus(accessLinks[profileStatus]);
  }, [state, state.user.auth, state.user.data]);
  
  useEffect(() => {
    if (!isHaveAccess) {
      push(resultStatus.redirect);
    }
  }, [resultStatus, push, pathname, page, isHaveAccess]);

  return (
    <>
      <Head>
        <title>{meta.title || "Hello"}</title>
        <meta
          name="description"
          content={meta.description || "meta description"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isHaveAccess ? (
        <>
          <div className="layoutWrap">
            {!fullHeight && <Header />}
            <main>{children}</main>
          </div>
          {!fullHeight && <Footer />}
        </>
      ) : null}
    </>
  );
};
