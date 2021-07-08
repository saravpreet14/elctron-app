import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../lib/theme';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log("FCP",metric);
      break
    case 'LCP':
      // handle LCP results
      console.log("LCP",metric);
      break
    case 'CLS':
      // handle CLS results
      console.log("CLS",metric);
      break
    case 'FID':
      // handle FID results
      console.log("FID",metric);
      break
    case 'TTFB':
      // handle TTFB results
      console.log("TTFB",metric);
      break
    default:
      break
  }
}

export default function(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Rick and Morty</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}
