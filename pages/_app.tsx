import "../styles/globals.scss";
import "intl-pluralrules";
import type { AppProps } from "next/app";
import { Provider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider initialProps={pageProps.initialState}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
