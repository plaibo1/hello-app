import "../styles/globals.scss";
import "intl-pluralrules";
import type { AppProps } from "next/app";
import { Provider } from "../context";
import { usePreviousRoute } from "hooks/usePreviousRoute";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const prevPath = usePreviousRoute();

  return (
    <Provider initialProps={pageProps.initialState}>
      <Component {...pageProps} prevPath={prevPath} />
    </Provider>
  );
}

export default MyApp;
