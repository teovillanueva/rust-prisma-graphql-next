import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { getApolloClient } from "../lib/with-apollo";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useMemo(
    () => getApolloClient(undefined, pageProps.__APOLLO_STATE__),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
