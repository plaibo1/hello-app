import "../styles/globals.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { Context, Provider } from "../context";
import { useEffect, useContext, useState, FC } from "react";
import { CheckAuth } from "../Utils/Auth";

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps);
  return (
    <Provider initialProps={pageProps.initialState}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
