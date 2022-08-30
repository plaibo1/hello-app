import Head from "next/head";
import React, { FC, ReactNode } from "react";

import Header from "../Header";
import Footer from "../Footer";

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
      {!fullHeight && <Header />}
      <main>{children}</main>
      {!fullHeight && <Footer />}
    </>
  );
};
