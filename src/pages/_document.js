import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Alwin Pamintuan's portfolio site built with NextJS."
        />
        <meta
          name="keywords"
          content="software engineer,makati,HTML,CSS,JavaScript,NextJS"
        />
        <meta name="author" content="John Alwin Pamintuan" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
