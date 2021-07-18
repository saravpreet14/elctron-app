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
import axios from 'axios';
import printReadings from '../lib/performance';

const readingsDatabse = "https://ricky-and-morty-project-default-rtdb.asia-southeast1.firebasedatabase.app/ElectronApp";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (['FCP', 'LCP', 'CLS', 'FID', 'TTFB'].includes(metric.name)) {
    console.log(metric.name, metric.value);
    // axios.post(`${readingsDatabse}/${metric.name}.json`, metric.value).catch(() => null);
    fetch(`${readingsDatabse}/${metric.name}.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: `${metric.value.toFixed(6)}`
    })
    printReadings(readingsDatabse + '.json');
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
