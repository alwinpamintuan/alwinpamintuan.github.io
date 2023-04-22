import "@styles/globals.css";
import "@styles/normalize.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{"Alwin Pamintuan"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="lgMHkM85dEnIzUDnCQNCpy4qFBQj3qSe44j-VzV2fPU"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
